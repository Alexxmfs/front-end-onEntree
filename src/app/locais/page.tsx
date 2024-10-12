"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faEllipsisV,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast"; // Importe o Toaster
import { useSearchParams } from "next/navigation"; // Importe useSearchParams
import "./locais.css";

interface Local {
  id_local: number;
  nome: string;
  endereco: string;
  cidade: string;
  estado: string;
  nome_entrada: string;
}

const Locais = () => {
  const [locais, setLocais] = useState<Local[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); // Estado para o termo de pesquisa
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10; // Número de locais por página
  const [showAlert, setShowAlert] = useState<boolean>(false); // Estado para controlar o alerta

  const searchParams = useSearchParams(); // Para pegar os parâmetros da URL
  const success = searchParams.get("success"); // Verifica se o parâmetro "success" está presente
  const [selectedLocal, setSelectedLocal] = useState<number | null>(null); // To track which dropdown is open


  const toggleDropdown = (id: number) => {
    setSelectedLocal(selectedLocal === id ? null : id);
  };

  useEffect(() => {
    if (success && !showAlert) {
      showSuccessToast(); // Exibe o toast se "success=true" estiver presente na query string
      setShowAlert(true); // Garante que o toast não seja exibido várias vezes
    }
  }, [success, showAlert]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/locais")
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
        setLocais(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar locais:", error);
      });
  }, []);

  // Função para exibir o toast de sucesso
  const showSuccessToast = () => {
    toast.success(
      <div
        style={{ display: "flex", alignItems: "center", marginRight: "75px" }}
      >
        <div>
          <span style={{ fontSize: "18px", fontWeight: "600" }}>Sucesso</span>
          <div
            style={{ fontSize: "14px", color: "#ecf0f1", paddingTop: "4px" }}
          >
            Um novo local foi adicionado
          </div>
        </div>
      </div>,
      {
        duration: 3000,
        position: "bottom-left",
        style: {
          backgroundColor: "#2F3B28",
          color: "#ecf0f1",
          borderLeft: "5px solid #99C766",
          padding: "12px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          width: "800px",
        },
        icon: (
          <div
            style={{
              backgroundColor: "#99C766",
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#2F3B28", fontSize: "15px" }}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
          </div>
        ),
      }
    );
  };

  // Função para pesquisar locais
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Chama a rota de pesquisa quando o termo de pesquisa é alterado
    if (value) {
      axios
        .get(`http://localhost:5000/pesquisar-locais?nome=${value}`)
        .then((response) => {
          const data = Array.isArray(response.data) ? response.data : [];
          setLocais(data);
        })
        .catch((error) => {
          console.error("Erro ao pesquisar locais:", error);
        });
    } else {
      // Se o campo de pesquisa estiver vazio, re-carrega todos os locais
      axios
        .get("http://localhost:5000/locais")
        .then((response) => {
          const data = Array.isArray(response.data) ? response.data : [];
          setLocais(data);
        })
        .catch((error) => {
          console.error("Erro ao buscar locais:", error);
        });
    }
  };

  // Calcular o total de páginas
  const totalPages = Math.ceil(locais.length / itemsPerPage);

  // Função para mudar de página
  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Filtrar os locais a serem exibidos na página atual
  const displayedLocais = locais.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-[#191E28] min-h-screen p-6 text-white">
      <Toaster />
      <div className="max-w-7xl mx-auto">
        <h4 className="text-gray-400 pb-12 pt-8 text-xl">
          Home / <span className="text-[#6d99fb]">Locais</span>
        </h4>
        <div className="mb-4">
          <h2 className="text-4xl pb-3">Locais</h2>
          <p className="text-gray-400 text-lg">
            Confira a lista de todos os locais cadastrados
          </p>
        </div>

        <div className="bg-[#10141D] p-4 rounded-xl pt-8">
          <div className="flex items-center mb-4 pb-5">
            <div className="flex items-center bg-gray-700 rounded-lg px-3 py-2 w-1/3 relative">
              <FontAwesomeIcon
                className="text-gray-400 mr-2 cor-icon-search"
                icon={faSearch}
              />
              <input
                type="text"
                placeholder="Pesquise por nome do local"
                className="bg-transparent focus:outline-none text-gray-300 w-full"
                value={searchTerm} // O valor do input é o termo de pesquisa
                onChange={handleSearch} // Chama a função de pesquisa ao mudar o input
              />
            </div>
            <a
              href="/criar-local"
              className="ml-auto bg-[#EBF0F9] text-[#10141d] hover:bg-[#D0D8E1] hover:text-[#252d3f] hover:shadow-lg transition duration-300 ease-in-out px-4 py-2 rounded-lg flex items-center text-xl font-semibold"
            >
              Adicionar local
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-[#10141D] text-[#CAD6EC]">
                  <th className="p-3 text-left">Nome do Local</th>
                  <th className="p-3 text-left">Endereço</th>
                  <th className="p-3 text-left">Cidade e Estado</th>
                  <th className="p-3 text-left">Portões cadastrados</th>
                  <th className="p-3 text-left">Atualização</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
              {Array.isArray(displayedLocais) &&
              displayedLocais.length > 0 ? (
                displayedLocais.map((local, index) => (
                  <tr
                    key={local.id_local}
                    className={`${
                      index % 2 === 0 ? "bg-[#333B49]" : "bg-[#10141D]"
                    } text-gray-300`}
                  >
                    <td className="p-3">{local.nome}</td>
                    <td className="p-3">{local.endereco}</td>
                    <td className="p-3">{`${local.cidade}; ${local.estado}`}</td>
                    <td className="p-3">{local.nome_entrada}</td>
                    <td className="p-3">05/10/23</td>
                    <td className="p-5 text-right relative">
                      <FontAwesomeIcon
                        className="cursor-pointer text-gray-400 icon-options"
                        icon={faEllipsisV}
                        onClick={() => toggleDropdown(local.id_local)}
                      />
                      {selectedLocal === local.id_local && (
                        <div className="absolute right-0 mt-2 w-32 bg-[#191E28] rounded-lg shadow-lg z-10">
                          <ul className="py-1">
                            <li className="text-left px-4 py-3 text-gray-300 text-lg font-normal hover:bg-[#2f3746] rounded-t-lg cursor-pointer">
                              Edit
                            </li>
                            <li className="text-left px-4 py-3 text-gray-300 text-lg font-normal hover:bg-[#2f3746] rounded-b-lg cursor-pointer">
                              Apagar
                            </li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-400">
                    Nenhum local encontrado.
                  </td>
                </tr>
              )}
            </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`px-4 py-2 mx-1 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-gray-700 text-gray-300"
                    : "text-gray-300"
                }`}
                onClick={() => changePage(index + 1)} // Chama a função para mudar de página
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locais;
