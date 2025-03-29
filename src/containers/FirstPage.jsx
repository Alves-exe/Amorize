import { GoHeartFill } from "react-icons/go";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function FirstPage() {
  const navigate = useNavigate();

  return (
    <div>
      <section>
        {/* Header */}
        <div className="flex items-center justify-between p-5">
          <h1 className="flex items-center text-2xl font-bold text-black gap-3">
            <GoHeartFill size={35} className="text-rose-500" />
            Amorize
          </h1>
          <div className="flex gap-5">
            <button
              onClick={() => navigate("/login")}
              className="text-lg text-gray-500 font-semibold hover:text-gray-400"
            >
              Entrar
            </button>
            <button
              onClick={() => navigate("/register")}
              className="text-lg text-gray-500 font-semibold hover:text-gray-400"
            >
              Registrar
            </button>
          </div>
        </div>
        <hr className="opacity-25" />
      </section>

      {/* Main Content */}
      <div className="relative mt-16 flex items-center justify-between px-12">
        <div className="max-w-lg">
          <h1 className="text-6xl font-semibold font-[Epilogue]">
            Planeje seu casamento com facilidade
          </h1>
          <p className="text-gray-500 font-semibold">
            Amorize ajuda você a organizar despesas, convidados e criar convites
            automáticos para o seu grande dia.
          </p>

          <button
            onClick={() => navigate("/register")}
            className="inline-flex mt-7 bg-rose-500 hover:bg-rose-600 rounded-lg p-2 font-semibold text-white"
          >
            Comece agora
            <ArrowRight className="ml-5 w-4 h-7" />
          </button>

          <button
            onClick={() => navigate("/login")}
            className="ml-5 p-2 rounded-lg text-xl font-semibold hover:bg-slate-100 bg-slate-200 outline"
          >
            Entrar
          </button>
        </div>
        <div className="relative mr-12">
          <h2 className="text-[#c59056] text-3xl ml-6 font-semibold">
            Seu casamento
          </h2>
          <h1 className="text-9xl font-semibold font-[Alice] tracking-tighter ">
            Amorize
          </h1>
          <h1 className="text-[#c59056] font-extralight top-0 translate-y-[-30%] font-[Brittany] text-9xl">
            Mais Fácil
          </h1>
        </div>
        {/* 
        <div className="flex justify-end mt-16 ">
          <img
            src="./public/FirstPage.jpg"
            alt="Wed"
            className="w-[400px] h-[400px] object-cover rounded-lg"
          />
        </div> */}
      </div>
    </div>
  );
}

export default FirstPage;
