import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./criarLocal.css";

const CriarLocal = () => {
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
        <form className="space-y-6">
          <h4 className="text-lg text-gray-300 pb-2 pt-4">
            Informações básicas
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-1">Nome do local*</label>
              <input
                type="text"
                placeholder="Informe o nome do local"
                className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Apelido</label>
              <input
                type="text"
                placeholder="Informe um apelido (caso exista)"
                className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            {/* Tipo e CNPJ */}
            <div>
              <label className="block text-gray-300 mb-1">
                Selecione um tipo*
              </label>
              <div className="relative">
                <select className="w-full p-2 bg-gray-700 text-white rounded appearance-none focus:outline-none focus:ring focus:ring-blue-500">
                  <option>Selecione um tipo</option>
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
                className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Estado*</label>
              <div className="relative">
                <select className="w-full p-2 bg-gray-700 text-white rounded appearance-none focus:outline-none focus:ring focus:ring-blue-500">
                  <option>Selecione um estado</option>
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
                className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Endereço*</label>
              <input
                type="text"
                placeholder="Informe o endereço"
                className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Complemento</label>
              <input
                type="text"
                placeholder="Informe o complemento"
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
                className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Telefone</label>
              <input
                type="text"
                placeholder="Informe um telefone"
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
