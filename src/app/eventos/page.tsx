"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faEllipsisV,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useSearchParams, useRouter } from "next/navigation";
import "./eventos.css";
import Evento from "../../types/Evento";

const Eventos = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const [selectedEvento, setSelectedEvento] = useState<number | null>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);
  const [eventoToBeDeleted, setEventoToBeDeleted] = useState<Evento | null>(
    null
  );
  const router = useRouter();

  const toggleDropdown = (id: number) => {
    setSelectedEvento(selectedEvento === id ? null : id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (success && !showAlert) {
      if (success === "true") {
        showSuccessToast("Um novo evento foi adicionado");
      } else if (success === "edited") {
        showSuccessToast("uma nova edição foi salva");
      }
      setShowAlert(true);

      const updatedSearchParams = new URLSearchParams(searchParams);
      updatedSearchParams.delete("success");
      router.replace(`?${updatedSearchParams.toString()}`);
    }
  }, [success, showAlert, router, searchParams]);

  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = () => {
    axios
      .get("http://localhost:5000/eventos")
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
        setEventos(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar eventos:", error);
      });
  };

  const showSuccessToast = (message: string) => {
    toast.success(
      <div
        style={{ display: "flex", alignItems: "center", marginRight: "75px" }}
      >
        <div>
          <span style={{ fontSize: "18px", fontWeight: "600" }}>Sucesso</span>
          <div
            style={{ fontSize: "14px", color: "#ecf0f1", paddingTop: "4px" }}
          >
            {message}
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

  const handleDeleteConfirmation = (evento: Evento) => {
    setEventoToBeDeleted(evento);
    setIsConfirmationModalOpen(true);
  };

  const deleteEvento = async () => {
    if (eventoToBeDeleted) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/deletar-eventos/${eventoToBeDeleted.id_evento}`
        );
        if (response.status === 200) {
          toast.success("Evento deletado com sucesso!");
          fetchEventos();
        } else {
          toast.error("Erro ao deletar o evento.");
        }
        setIsConfirmationModalOpen(false);
        setEventoToBeDeleted(null);
      } catch (error) {
        console.error("Erro ao deletar evento:", error);
        toast.error("Erro ao deletar o evento.");
        setIsConfirmationModalOpen(false);
        setEventoToBeDeleted(null);
      }
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      axios
        .get(`http://localhost:5000/pesquisar-eventos?nome=${value}`)
        .then((response) => {
          const data = Array.isArray(response.data) ? response.data : [];
          setEventos(data);
        })
        .catch((error) => {
          console.error("Erro ao pesquisar eventos:", error);
        });
    } else {
      fetchEventos();
    }
  };

  const totalPages = Math.ceil(eventos.length / itemsPerPage);

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEdit = (id_evento: number) => {
    router.push(`/editar-evento?id=${id_evento}`);
  };

  const displayedEventos = eventos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-[#191E28] min-h-screen p-6 text-white">
      <Toaster />
      <div className="max-w-7xl mx-auto">
        <h4 className="text-gray-400 pb-12 pt-8 text-xl">
          Home / <span className="text-[#6d99fb]">Eventos</span>
        </h4>
        <div className="mb-4">
          <h2 className="text-4xl pb-3">Eventos</h2>
          <p className="text-gray-400 text-lg">
            Confira a lista de todos os eventos cadastrados
          </p>
        </div>

        <div className="bg-[#10141D] p-4 rounded-xl pt-8">
          <div className="flex items-center mb-4 pb-5">
            <div className="flex items-center bg-gray-700 rounded-lg px-3 py-2 w-1/3 relative">
              <FontAwesomeIcon
                className="text-gray-400 mr-2 cor-icon-search w-4"
                icon={faSearch}
              />
              <input
                type="text"
                placeholder="Pesquise por nome do evento"
                className="bg-transparent focus:outline-none text-gray-300 w-full"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <a
              href="/criar-evento"
              className="ml-auto bg-[#EBF0F9] text-[#10141d] hover:bg-[#D0D8E1] hover:text-[#252d3f] hover:shadow-lg transition duration-300 ease-in-out px-4 py-2 rounded-lg flex items-center text-xl font-semibold"
            >
              Adicionar evento
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-[#10141D] text-[#CAD6EC]">
                  <th className="p-3 text-left">Evento</th>
                  <th className="p-3 text-left">Tipo</th>
                  <th className="p-3 text-left">Local associado</th>
                  <th className="p-3 text-left">Endereço</th>
                  <th className="p-3 text-left">Portões cadastrados</th>
                  <th className="p-3 text-left">Data</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(displayedEventos) &&
                displayedEventos.length > 0 ? (
                  displayedEventos.map((evento, index) => (
                    <tr
                      key={evento.id_evento}
                      className={`${
                        index % 2 === 0 ? "bg-[#333B49]" : "bg-[#10141D]"
                      } text-gray-300`}
                    >
                      <td className="p-3">{evento.nome}</td>
                      <td className="p-3">
                      <div
                          className={`rounded-lg px-2 py-2 font-bold  ${
                            evento.tipo === "Futebol"
                              ? "bg-[#CAD6EC] text-[#10141D] tamanho-futebol"
                              : evento.tipo === "Show"
                              ? "bg-[#61461F] text-[#FFFFFF] tamanho-show" 
                              : evento.tipo === "Feira"
                              ? "bg-[#e5b73e] text-[#10141D] tamanho-feira" 
                              : "bg-gray-700" 
                          }`}
                        >
                          {evento.tipo}
                        </div>
                      </td>
                      <td className="p-3">{evento.local?.nome}</td>
                      <td className="p-3">{evento.local?.endereco}</td>
                      <td className="p-3">{evento.local?.portões}</td>
                      <td className="p-3">
                        {evento.data_evento && formatDate(evento.data_evento)}
                      </td>
                      <td className="p-5 text-right relative">
                        <FontAwesomeIcon
                          className="cursor-pointer text-gray-400 icon-options"
                          icon={faEllipsisV}
                          onClick={() => toggleDropdown(evento.id_evento)}
                        />
                        {selectedEvento === evento.id_evento && (
                          <div className="absolute right-0 mt-2 w-32 bg-[#191E28] rounded-lg shadow-lg z-10">
                            <ul className="py-1">
                              <li
                                className="text-left px-4 py-3 text-gray-300 text-lg font-normal hover:bg-[#2f3746] rounded-t-lg cursor-pointer"
                                onClick={() => handleEdit(evento.id_evento)} 
                              >
                                Edit
                              </li>
                              <li
                                className="text-left px-4 py-3 text-gray-300 text-lg font-normal hover:bg-[#2f3746] rounded-b-lg cursor-pointer"
                                onClick={() => handleDeleteConfirmation(evento)} 
                              >
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
                    <td colSpan={7} className="p-4 text-center text-gray-400">
                      Nenhum evento encontrado.
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
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {isConfirmationModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" 
            onClick={() => setIsConfirmationModalOpen(false)}
          >
            <div
              className="bg-gray-800 rounded-lg p-6 shadow-lg z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-300">
                  Apagar evento
                </h2>
                <button
                  className="text-gray-400"
                  onClick={() => setIsConfirmationModalOpen(false)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
              <p className="text-gray-300 mb-4">
                Você tem certeza que deseja apagar o evento{" "}
                <span className="font-semibold text-white">
                  &quot;{eventoToBeDeleted?.nome}&quot;
                </span>
                ?
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-[#333B49] hover:bg-gray-700 text-white py-2 px-4 rounded-lg border border-[#EBF0F9]"
                  onClick={() => setIsConfirmationModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  className="bg-[#6D99FB] hover:bg-[#467dfc] text-[#333B49] font-semibold py-2 px-4 rounded-lg"
                  onClick={deleteEvento}
                >
                  Apagar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Eventos;
