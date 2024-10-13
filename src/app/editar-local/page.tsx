"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faPlus,
  faXmark,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import "./criarLocal.css";

const EditarLocal = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");

  const [idLocal, setIdLocal] = useState<number | null>(null);
  const [nome, setNome] = useState("");
  const [apelido, setApelido] = useState("");
  const [tipo, setTipo] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");
  const [complemento, setComplemento] = useState("");
  const [endereco, setEndereco] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nome_entrada, setEntrada] = useState("");
  const [nome_catraca, setCatraca] = useState("");
  const [entradas, setEntradas] = useState<string[]>([]);
  const [catracas, setCatracas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const addEntrada = () => {
    if (nome_entrada) {
      setEntradas([...entradas, nome_entrada]);
      setEntrada("");
    }
  };

  const addCatraca = () => {
    if (nome_catraca) {
      setCatracas([...catracas, nome_catraca]);
      setCatraca("");
    }
  };

  const removeEntrada = (index: number) => {
    const novasEntradas = [...entradas];
    novasEntradas.splice(index, 1);
    setEntradas(novasEntradas);
  };

  const removeCatraca = (index: number) => {
    const novasCatracas = [...catracas];
    novasCatracas.splice(index, 1);
    setCatracas(novasCatracas);
  };

  useEffect(() => {
    if (id) {
      const idNum = parseInt(id, 10);
      setIdLocal(idNum);
      fetchLocalData(idNum);
    }
  }, [id]);

  const fetchLocalData = async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:5000/locais/${id}`);
      const localData = response.data;

      setNome(localData.nome);
      setApelido(localData.apelido);
      setTipo(localData.tipo);
      setCnpj(localData.cnpj);
      setCidade(localData.cidade);
      setEstado(localData.estado);
      setCep(localData.cep);
      setComplemento(localData.complemento);
      setEndereco(localData.endereco);
      setEmail(localData.email);
      setTelefone(localData.telefone);
      setEntradas(
        localData.nome_entrada ? localData.nome_entrada.split(",") : []
      );
      setCatracas(
        localData.nome_catraca ? localData.nome_catraca.split(",") : []
      );

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching local data:", error);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!idLocal) {
      console.error("Local ID not found.");
      return;
    }

    if (
      !nome ||
      !tipo ||
      !cidade ||
      !estado ||
      !cep ||
      !endereco ||
      !email ||
      !telefone
    ) {
      showErrorToast("não foi possível salvar a edição");
      return;
    }

    const dados = {
      nome,
      apelido,
      tipo,
      cnpj,
      cidade,
      estado,
      cep,
      complemento,
      endereco,
      email,
      telefone,
      nome_entrada: entradas.join(","),
      nome_catraca: catracas.join(","),
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/atualizar-locais/${idLocal}`,
        dados
      );

      if (response.status === 200) {
        router.push("/locais?success=edited");
      } else {
        // Error handling
        console.error("Error updating local:", response.status);
      }
    } catch (error) {
      console.error("Error updating local:", error);
    }
  };

  const showErrorToast = (message: string) => {
    toast.error(
      <div
        style={{ display: "flex", alignItems: "center", marginRight: "75px" }}
      >
        <div>
          <span style={{ fontSize: "18px", fontWeight: "600" }}>Erro</span>
          <div
            style={{ fontSize: "14px", color: "#ecf0f1", paddingTop: "4px" }}
          >
            <span style={{ whiteSpace: "nowrap" }}>{message}</span>
          </div>
        </div>
      </div>,
      {
        duration: 3000,
        position: "bottom-left",
        style: {
          backgroundColor: "#461527",
          color: "#ecf0f1",
          borderLeft: "5px solid #F6285F",
          padding: "12px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          width: "800px",
        },
        icon: (
          <div
            style={{
              backgroundColor: "#F6285F",
              width: "40px",
              height: "20px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#2F3B28", fontSize: "15px" }}>
              <FontAwesomeIcon icon={faExclamation} />
            </span>
          </div>
        ),
      }
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#191E28] min-h-screen p-8">
      <Toaster />
      <div className="max-w-3xl mx-auto">
        <h4 className="text-gray-400 pb-8 pt-5 text-lg">
          Home / <span className="text-[#6d99fb]">Locais</span>
        </h4>
        <h2 className="text-3xl pb-2 text-white mb-2">Editar Local</h2>
        <p className="text-gray-400 mb-6">*Campos obrigatórios</p>
      </div>

      <div className="max-w-3xl mx-auto bg-[#10141d] p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h4 className="text-lg text-gray-300 pb-2 pt-4">
            Informações básicas
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-1">Nome do local*</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Informe o nome do local"
                className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Apelido</label>
              <input
                type="text"
                placeholder="Informe um apelido (caso exista)"
                value={apelido}
                onChange={(e) => setApelido(e.target.value)}
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
                >
                  <option value="">Selecione um tipo</option>
                  <option value="restaurante">Restaurante</option>
                  <option value="bar">Bar</option>
                  <option value="cafeteria">Cafeteria</option>
                  <option value="hotel">Hotel</option>
                </select>
                <FontAwesomeIcon
                  className="absolute right-2 top-3 text-gray-400 text-lg w-4"
                  icon={faChevronDown}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-1">CNPJ</label>
              <input
                type="text"
                placeholder="Informe o CNPJ"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="h-px bg-[#333B49] my-4" />

          <h4 className="text-lg text-gray-300 pb-2 pt-4">Localização</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-1">Cidade*</label>
              <input
                type="text"
                placeholder="Informe a cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">
                Selecione um estado*
              </label>
              <div className="relative">
                <select
                  className="w-full p-2 bg-gray-700 text-white rounded appearance-none focus:outline-none focus:ring focus:ring-blue-500"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                >
                  <option value="">Selecione um estado</option>
                  <option value="SP">São Paulo</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="ES">Espírito Santo</option>
                </select>
                <FontAwesomeIcon
                  className="absolute right-2 top-3 text-gray-400 text-lg w-4"
                  icon={faChevronDown}
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-300 mb-1">CEP*</label>
              <input
                type="text"
                placeholder="Informe o CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Complemento</label>
              <input
                type="text"
                placeholder="Informe um complemento (caso exista)"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
                className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Endereço*</label>
              <input
                type="text"
                placeholder="Informe o endereço"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="h-px bg-[#333B49] my-4" />

          <h4 className="text-lg text-gray-300 pb-2 pt-4">
            Informações de contato
          </h4>
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

          <div className="h-px bg-[#333B49] my-4" />

          <h4 className="text-lg text-gray-300 pb-2 pt-4">
            Entradas e Catracas
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-1">
                Nome das entradas*
              </label>
              <div className="flex items-center space-x-0">
                <input
                  type="text"
                  placeholder="Informe o nome da entrada"
                  value={nome_entrada}
                  onChange={(e) => setEntrada(e.target.value)}
                  className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="px-3 py-2 bg-[#051D41] text-white rounded hover:bg-blue-600"
                  onClick={addEntrada}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <ul className="mt-2 flex flex-wrap space-x-2">
                {entradas.map((entrada, index) => (
                  <li
                    key={index}
                    className="inline-flex justify-between items-center bg-[#9ED0E6] px-3 py-2 rounded-lg text-[#10141D]"
                    style={{ width: "auto" }}
                  >
                    <span>{entrada}</span>
                    <button
                      type="button"
                      className="ml-2 text-[#10141D] hover:text-[#909091]"
                      onClick={() => removeEntrada(index)}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <label className="block text-gray-300 mb-1">
                Nome das catracas*
              </label>
              <div className="flex items-center space-x-0">
                <input
                  type="text"
                  placeholder="Informe o nome da catraca"
                  value={nome_catraca}
                  onChange={(e) => setCatraca(e.target.value)}
                  className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="icon-plus px-3 py-2 bg-[#051D41] text-white rounded hover:bg-blue-600"
                  onClick={addCatraca}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <ul className="mt-2 flex flex-wrap space-x-2">
                {catracas.map((catraca, index) => (
                  <li
                    key={index}
                    className="inline-flex justify-between items-center bg-[#9ED0E6] px-3 py-2 rounded-lg text-[#10141D]"
                    style={{ width: "auto" }}
                  >
                    <span>{catraca}</span>
                    <button
                      type="button"
                      className="ml-2 text-[#10141D] hover:text-[#909091]"
                      onClick={() => removeCatraca(index)}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="h-px bg-[#333B49] my-4" />

          <div className="flex justify-end space-x-4 pt-3">
            <a
              href="/locais"
              type="button"
              className="px-8 py-2 bg-[#10141d] border border-[#EBF0F9] text-[#EBF0F9] text-lg rounded hover:bg-[#1c1f24] focus:outline-none"
            >
              Cancelar
            </a>
            <button
              type="submit"
              className="px-8 py-2 bg-[#EBF0F9] text-[#333B49] rounded hover:bg-[#d1e1f3] focus:outline-none font-semibold text-lg"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarLocal;
