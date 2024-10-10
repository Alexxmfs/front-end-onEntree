"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./criarLocal.css";

const CriarLocal = () => {
  const [nome, setNome] = useState("");
  const [apelido, setApelido] = useState("");
  const [tipo, setTipo] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [localizacao, setLocalizacao] = useState({
    cidade: "",
    estado: "",
    cep: "",
    endereco: "",
    complemento: "",
  });
  const [contato, setContato] = useState({ email: "", telefone: "" });
  const [entrada, setEntrada] = useState({ nome_entrada: "" });
  const [catraca, setCatraca] = useState({ nome_catraca: "" });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      // Criar Local
      const { data } = await axios.post("http://localhost:5000/criar-locais", {
        nome,
        apelido,
        tipo,
        cnpj,
      });
      const localId = data.id; // Assumindo que o ID do local é retornado

      // Criar Localização
      await axios.post("http://localhost:5000/criar-localizacoes", {
        ...localizacao,
        id_local: localId,
      });

      // Criar Contato
      await axios.post("http://localhost:5000/criar-contatos", {
        ...contato,
        id_local: localId,
      });

      // Criar Entrada
      await axios.post("http://localhost:5000/criar-entradas", {
        ...entrada,
        id_local: localId,
      });

      // Criar Catraca
      await axios.post("http://localhost:5000/criar-catracas", {
        ...catraca,
        id_local: localId,
      });

      // Limpar os campos após a criação
      setNome("");
      setApelido("");
      setTipo("");
      setCnpj("");
      setLocalizacao({ cidade: "", estado: "", cep: "", endereco: "", complemento: "" });
      setContato({ email: "", telefone: "" });
      setEntrada({ nome_entrada: "" });
      setCatraca({ nome_catraca: "" });

      alert("Local e dados associados criados com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar local e dados associados");
    }
  };

  return (
    <div className="bg-[#191E28] min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <h4 className="text-gray-400 pb-8 pt-5 text-lg">
          Home / <span className="text-[#6d99fb]">Locais</span>
        </h4>
        <h2 className="text-3xl pb-2 text-white mb-2">Adicionar novo local</h2>
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

            {/* Tipo e CNPJ */}
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

          {/* Linha de separação */}
          <div className="h-px bg-[#333B49] my-4" />

          {/* Localização */}
          <h4 className="text-lg text-gray-300 pb-2 pt-4">Localização</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-1">Cidade*</label>
              <input
                type="text"
                placeholder="Informe a cidade"
                value={localizacao.cidade}
                onChange={(e) => setLocalizacao({ ...localizacao, cidade: e.target.value })}
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
                  value={localizacao.estado}
                  onChange={(e) =>
                    setLocalizacao({ ...localizacao, estado: e.target.value })
                  }
                  required
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
                value={localizacao.cep}
                onChange={(e) => setLocalizacao({ ...localizacao, cep: e.target.value })}
                className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Endereço*</label>
              <input
                type="text"
                placeholder="Informe o endereço"
                value={localizacao.endereco}
                onChange={(e) => setLocalizacao({ ...localizacao, endereco: e.target.value })}
                className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Complemento</label>
              <input
                type="text"
                placeholder="Informe o complemento"
                value={localizacao.complemento}
                onChange={(e) => setLocalizacao({ ...localizacao, complemento: e.target.value })}
                className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Linha de separação */}
          <div className="h-px bg-[#333B49] my-4" />

          {/* Contato */}
          <h4 className="text-lg text-gray-300 pb-2 pt-4">Contato</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-1">E-mail*</label>
              <input
                type="email"
                placeholder="Informe um e-mail"
                value={contato.email}
                onChange={(e) => setContato({ ...contato, email: e.target.value })}
                className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Telefone</label>
              <input
                type="text"
                placeholder="Informe um telefone"
                value={contato.telefone}
                onChange={(e) => setContato({ ...contato, telefone: e.target.value })}
                className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Linha de separação */}
          <div className="h-px bg-[#333B49] my-4" />

          {/* Cadastro de entradas e catracas */}
          <h4 className="text-lg text-gray-300 pb-2 pt-4">
            Cadastro de entradas e catracas
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-1">
                Cadastre as entradas
              </label>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Insira as entradas"
                  value={entrada.nome_entrada}
                  onChange={(e) => setEntrada({ ...entrada, nome_entrada: e.target.value })}
                  className="w-full p-2 bg-gray-700 text-white rounded-l focus:outline-none focus:ring focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="bg-[#051D41] p-2 rounded-r text-white focus:outline-none"
                >
                  <FontAwesomeIcon icon={faPlus} className="w-4" />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-gray-300 mb-1">
                Cadastre as catracas
              </label>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Insira as catracas"
                  value={catraca.nome_catraca}
                  onChange={(e) => setCatraca({ ...catraca, nome_catraca: e.target.value })}
                  className="w-full p-2 bg-gray-700 text-white rounded-l focus:outline-none focus:ring focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="bg-[#051D41] p-2 rounded-r text-white focus:outline-none"
                >
                  <FontAwesomeIcon icon={faPlus} className="w-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="h-px bg-[#333B49] my-4" />

          {/* Botões */}
          <div className="flex justify-end space-x-4 pt-3">
            <button
              type="button"
              className="px-8 py-2 bg-[#10141d] border border-[#EBF0F9] text-[#EBF0F9] text-lg rounded hover:bg-[#1c1f24] focus:outline-none"
            >
              Cancelar
            </button>
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

export default CriarLocal;
