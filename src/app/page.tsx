import avatar from "../../public/img/bonecoIMG.png";
import iconHome from "../../public/img/iconHome.png";
import iconTicket from "../../public/img/iconTicket.png";
import Image from "next/image";
import "./Home.css";

export default function Home() {
  return (
    <div className="p-6 rounded-xl text-white pt-20">
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
        {" "}
        {/* Add flexbox classes */}
        <div className="bg-[#2F3B28] p-4 pb-8 rounded-2xl shadow-lg ">
          <div className="flex items-center justify-between pl-3">
            <div className="flex items-center">
              <Image src={iconHome} alt="Home" className="w-6" />
              <h2 className="pl-3 text-3xl">Locais</h2>
            </div>
            <div className="btn-conferir-local">
              <button className="bg-[#CAD6EC] hover:bg-green-700 text-[#10141D] py-2 px-4 rounded ml-auto font-semibold text-lg">
                Conferir locais
              </button>
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
            <button className="bg-[#CAD6EC] hover:bg-green-700 text-[#10141D] py-2 px-4 rounded ml-auto font-semibold text-lg btn-conferir-local">
              Conferir locais
            </button>
          </div>
          <p className="descricao text-gray-200 mb-4 text-lg pl-2">
            Confira todos os locais cadastrados!
          </p>
        </div>
      </div>
    </div>
  );
}
