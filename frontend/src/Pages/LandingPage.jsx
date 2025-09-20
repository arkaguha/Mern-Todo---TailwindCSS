import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <section
      className="flex flex-col items-center justify-center m-10 mx-auto bg-amber-300 
    border-2 border-red-500 w-[80%]  rounded-2xl lg:w-[30%] "
    >
      <h3 className="text-5xl p-12">Welcome</h3>
      <div className="flex flex-row w-[50%] justify-around m-6 gap-2">
        <button
          className="bg-gray-800 w-[50%]  mb-9 mt-6 hover:bg-slate-700 text-white px-4 py-2 rounded "
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className=" w-[50%]  mb-9 mt-6 hover:bg-slate-700 text-black hover:text-white outline-1 px-4 py-2 rounded "
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </section>
  );
}
