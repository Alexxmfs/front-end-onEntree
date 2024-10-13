  "use client";
  import React, { useState, useEffect } from "react";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import axios from "axios";
  import {
    faChevronDown
  } from "@fortawesome/free-solid-svg-icons";
  import "./criarEvento.css";
  import { useRouter } from "next/navigation"; 

  interface Local {
    id_local: number;
    nome: string;
  }

  const CriarEvento = () => {
    const router = useRouter(); 

    const [nome, setNome] = useState("");
    const [dataEvento, setDataEvento] = useState("");
    const [horarioEvento, setHorarioEvento] = useState("");
    const [tipo, setTipo] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [locais, setLocais] = useState<Local[]>([]); 
    const [selectedLocalId, setSelectedLocalId] = useState<number | null>(null); 

    useEffect(() => {
      fetchLocais(); 
    }, []);

    const fetchLocais = async () => {
      try {
        const response = await axios.get("http://localhost:5000/locais");
        setLocais(response.data);
      } catch (error) {
        console.error("Erro ao buscar locais:", error);
      }
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
      e.preventDefault();

      try {
        await axios.post("http://localhost:5000/criar-eventos", {
          nome,
          data_evento: dataEvento,
          horario_evento: horarioEvento,
          tipo,
          email,
          telefone,
          id_local: selectedLocalId, 
        });

        setNome("");
        setDataEvento("");
        setHorarioEvento("");
        setTipo("");
        setEmail("");
        setTelefone("");
        setSelectedLocalId(null); 

        router.push("/eventos?success=true");
      } catch (error) {
        console.error(error);
        alert("Erro ao criar evento e dados associados");
      }
    };

    return (
      <div className="bg-[#191E28] min-h-screen p-8">
        <div className="max-w-3xl mx-auto">
          <h4 className="text-gray-400 pb-8 pt-5 text-lg">
            Home / <span className="text-[#6d99fb]">Eventos</span>
          </h4>
          <h2 className="text-3xl pb-2 text-white mb-2">Adicionar novo evento</h2>
          <p className="text-gray-400 mb-6">*Campos obrigatórios</p>
        </div>

        <div className="max-w-3xl mx-auto bg-[#10141d] p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h4 className="text-lg text-gray-300 pb-2 pt-4">
              Informações básicas
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-1">Nome do evento*</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Informe o nome do evento"
                  className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">
                  Selecione um tipo*
                </label>
                <div className="relative">
                  <select
                    className="w-full p-2 bg-gray-700 text-white rounded appearance-none focus:outline-none focus:ring focus:ring-blue-500"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    required
                  >
                    <option value="">Selecione um tipo</option>
                    <option value="Show">Show</option>
                    <option value="Futebol">Futebol</option>
                  </select>
                  <FontAwesomeIcon
                    className="absolute right-2 top-3 text-gray-400 text-lg w-4"
                    icon={faChevronDown}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Data do evento*</label>
                <input
                  type="date"
                  value={dataEvento}
                  onChange={(e) => setDataEvento(e.target.value)}
                  className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Horário do evento*</label>
                <input
                  type="time"
                  value={horarioEvento}
                  onChange={(e) => setHorarioEvento(e.target.value)}
                  className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="h-px bg-[#333B49] my-4" />

            <h4 className="text-lg text-gray-300 pb-2 pt-4">Localização</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-1">
                  Selecione um local*
                </label>
                <div className="relative">
                  <select
                    className="w-full p-2 bg-gray-700 text-white rounded appearance-none focus:outline-none focus:ring focus:ring-blue-500"
                    value={selectedLocalId ? selectedLocalId.toString() : ""}
                    onChange={(e) => setSelectedLocalId(parseInt(e.target.value))} 
                    required
                  >
                    <option value="">Selecione um local</option>
                    {locais.map((local) => (
                      <option key={local.id_local} value={local.id_local}>
                        {local.nome}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon
                    className="absolute right-2 top-3 text-gray-400 text-lg w-4"
                    icon={faChevronDown}
                  />
                </div>
              </div>
            </div>

            <div className="h-px bg-[#333B49] my-4" />

            <h4 className="text-lg text-gray-300 pb-2 pt-4">Contato</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-1">E-mail*</label>
                <input
                  type="email"
                  placeholder="Informe o e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Telefone*</label>
                <input
                  type="text"
                  placeholder="Informe o telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-3">
              <a href="/eventos"
                type="button"
                className="px-8 py-2 bg-[#10141d] border border-[#EBF0F9] text-[#EBF0F9] text-lg rounded hover:bg-[#1c1f24] focus:outline-none"
              >
                Cancelar
              </a>
              <button
                type="submit"
                className="px-8 py-2 bg-[#EBF0F9] text-[#333B49] rounded hover:bg-[#d1e1f3] focus:outline-none font-semibold text-lg"
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default CriarEvento;