"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10; // Número de locais por página

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
              />
            </div>
            <a href="/criar-local" className="ml-auto bg-[#EBF0F9] text-[#10141d] hover:bg-[#D0D8E1] hover:text-[#252d3f] hover:shadow-lg transition duration-300 ease-in-out px-4 py-2 rounded-lg flex items-center text-xl font-semibold">
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
                {Array.isArray(displayedLocais) && displayedLocais.length > 0 ? (
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
                      <td className="p-5 text-right">
                        <FontAwesomeIcon
                          className="cursor-pointer text-gray-400 icon-options"
                          icon={faEllipsisV}
                        />
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
                  currentPage === index + 1 ? "bg-gray-700 text-gray-300" : "text-gray-300"
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
