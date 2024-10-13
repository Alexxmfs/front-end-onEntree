"use client";
import React, { useEffect, useState } from "react";
import avatar from "../../public/img/bonecoIMG.png";
import iconHome from "../../public/img/iconHome.png";
import iconTicket from "../../public/img/iconTicket.png";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast, Toaster } from "react-hot-toast";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import Local from "../types/Local";
import Evento from "../types/Evento";
import "./Home.css";

export default function Home() {
  const [locais, setLocais] = useState<Local[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const router = useRouter();
  const [selectedLocal, setSelectedLocal] = useState<number | null>(null);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [selectedEvento, setSelectedEvento] = useState<number | null>(null);
  const [eventoToBeDeleted, setEventoToBeDeleted] = useState<Evento | null>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);

  const toggleDropdown = (id: number) => {
    setSelectedEvento(selectedEvento === id ? null : id);
  };

  const toggleDropdownLocal = (id: number) => {
    setSelectedLocal(selectedLocal === id ? null : id);
  };

  useEffect(() => {
    fetchLocais();
    fetchEventos();
  }, []);

  const showSuccessToast = (message: string) => {
    toast.success(
      <div style={{ display: "flex", alignItems: "center", marginRight: "75px" }}>
        <div>
          <span style={{ fontSize: "18px", fontWeight: "600" }}>Sucesso</span>
          <div style={{ fontSize: "14px", color: "#ecf0f1", paddingTop: "4px" }}>
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

  useEffect(() => {
    if (success && !showAlert) {
      if (success === "true") {
        showSuccessToast("Um novo local foi adicionado");
      } else if (success === "edited") {
        showSuccessToast("Uma nova edição foi salva");
      }
      setShowAlert(true);

      const updatedSearchParams = new URLSearchParams(searchParams);
      updatedSearchParams.delete("success");
      router.replace(`?${updatedSearchParams.toString()}`);
    }
  }, [success, showAlert, router, searchParams]);

  const fetchLocais = () => {
    axios
      .get("http://localhost:5000/locais")
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
        setLocais(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar locais:", error);
      });
  };

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

  const handleEdit = (id: number) => {
    const isLocal = locais.some(local => local.id_local === id);

    if (isLocal) {
      router.push(`/editar-local?id=${id}`);
    } else { 
      router.push(`/editar-evento?id=${id}`);
    }
  };

  const deleteLocal = (id_local: number) => {
    axios
      .delete(`http://localhost:5000/deletar-locais/${id_local}`)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Local deletado com sucesso!");
          fetchLocais();
        } else {
          toast.error("Erro ao deletar o local.");
        }
      })
      .catch((error) => {
        console.error("Erro ao deletar local:", error);
        toast.error("Erro ao deletar o local.");
      });
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
      } catch (error) {
        console.error("Erro ao deletar evento:", error);
        toast.error("Erro ao deletar o evento.");
      } finally {  // Ensure modal closes and state is reset
        setIsConfirmationModalOpen(false);
        setEventoToBeDeleted(null);
      }
    }
  };

  const handleDeleteConfirmation = (evento: Evento) => {
    setEventoToBeDeleted(evento);
    setIsConfirmationModalOpen(true);
  };
  
  return (
    <div className="p-6 rounded-xl text-white pt-20">
      <Toaster />
      <div className="flex items-center mb-6 pl-40">
        <Image src={avatar} alt="Avatar" className="w-1/12" />
        <div>
          <h1 className="text-4xl pb-2">Olá, Mariana</h1>
          <p className="text-lg text-gray-300">
            Confira todos os seus eventos e locais em um só lugar!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-6 pl-40 pr-40  flex flex-col md:flex-row items-center">
        <div className="bg-[#2F3B28] p-4 pb-8 rounded-2xl shadow-lg ">
          <div className="flex items-center justify-between pl-3">
            <div className="flex items-center">
              <Image src={iconHome} alt="Home" className="w-6" />
              <h2 className="pl-3 text-3xl">Locais</h2>
            </div>
            <div className="btn-conferir-local">
              <a href="locais" className="bg-[#CAD6EC] hover:bg-green-700 text-[#10141D] py-2 px-4 rounded ml-auto font-semibold text-lg">
                Conferir locais
              </a>
            </div>
          </div>
          <p className="descricao text-gray-200 text-lg pl-2">
            Confira todos os locais cadastrados!
          </p>
        </div>
        <div className="bg-[#461527] p-4 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between pl-3">
            <div className="flex items-center">
              <Image src={iconTicket} alt="Home" className="w-6" />
              <h2 className="pl-3 text-3xl">Eventos</h2>
            </div>
            <a href="eventos" className="bg-[#CAD6EC] hover:bg-[#9c4f64] text-[#10141D] py-2 px-4 rounded ml-auto font-semibold text-lg btn-conferir-local">
              Conferir eventos
            </a>
          </div>
          <p className="descricao text-gray-200 mb-4 text-lg pl-2">
            Confira todos os locais cadastrados!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-6 pl-40 pr-40  flex flex-col md:flex-row items-center">
        <div className="bg-[#10141D] p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between pb-4">
            <h3 className="pt-5 text-2xl pb-2">Ultimos locais adicionados</h3>
            <a href="locais" className="text-[#6D99FB] text-lg font-normal pr-1 underline">
              Ver todos
            </a>
          </div>
          <div className="w-full bg-[#10141D] rounded-xl">
            <table className="w-full table-auto">
              <tbody>
                {Array.isArray(locais) && locais.length > 0 ? (
                  locais.slice(-3).map((local, index) => (
                    <tr
                      key={local.id_local}
                      className={`${
                        index % 2 === 0 ? "bg-[#333B49]" : "bg-[#10141D]"
                      } text-gray-300`}
                    >
                      <td className="p-3">{local.nome}</td>
                      <td className="p-3">{local.endereco}</td>
                      <td className="p-3">{local.nome_entrada}</td>
                      <td className="p-5 text-right relative">
                        <FontAwesomeIcon
                          className="cursor-pointer text-gray-400 icon-options"
                          icon={faEllipsisV}
                          onClick={() => toggleDropdownLocal(local.id_local)}
                        />
                        {selectedLocal === local.id_local && (
                          <div className="absolute right-0 mt-2 w-32 bg-[#191E28] rounded-lg shadow-lg z-10">
                            <ul className="py-1">
                              <li
                                className="text-left px-4 py-3 text-gray-300 text-lg font-normal hover:bg-[#2f3746] rounded-t-lg cursor-pointer"
                                onClick={() => handleEdit(local.id_local)}
                              >
                                Edit
                              </li>
                              <li
                                className="text-left px-4 py-3 text-gray-300 text-lg font-normal hover:bg-[#2f3746] rounded-b-lg cursor-pointer"
                                onClick={() => deleteLocal(local.id_local)}
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
                    <td colSpan={6} className="p-4 text-center text-gray-400">
                      Nenhum local encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#10141D] p-6 rounded-2xl shadow-lg overflow-x-auto"> {/* Added overflow-x-auto */}
          <div className="flex items-center justify-between pb-4">
            <h3 className="pt-5 text-2xl pb-2">Ultimos eventos adicionados</h3>
            <a href="eventos" className="text-[#6D99FB] text-lg font-normal pr-1 underline">
              Ver todos
            </a>
          </div>
          <div className="w-full bg-[#10141D] rounded-xl"> {/* Ensures table takes full width */}
            <table className="w-full table-auto"> {/* Added w-full */}
              <tbody >  {/* Added tbody */}
                {Array.isArray(eventos) && eventos.length > 0 ? (
                  eventos.map((evento, index) => (
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
                                onClick={() => handleEdit(evento.id_evento)} // Correctly pass evento.id_evento
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
}