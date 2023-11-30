import { useNavigate } from "react-router-dom";
import { signUpSchema } from "..";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";

function SignUp() {

  const { register, handleSubmit,  formState: { errors } } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const navigate = useNavigate();

  async function submit (data) {
    await new Promise ((resolve) => {
            Axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`,{
            username: data.username,
            email: data.email,
            password: data.password
        }).then((response) => {
            const expirationTime = new Date().getTime() + 3600000;
            const userData = {
                username: data.username,
                email: data.email,
                password: data.password,
                expirationTime: expirationTime
            }
            localStorage.setItem('user',JSON.stringify(userData));
            navigate('/')
        })
        setTimeout(resolve, 1000);
    });
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center overflow-hidden">
      <form
        autoComplete="off"
        onSubmit={handleSubmit(submit)}
        className="h-1/2 w-11/12 flex flex-col justify-evenly border border-gray-300 rounded-2xl p-4 lg:h-2/3 lg:w-1/3"
      >
        <div className="w-full h-20 flex flex-col justify-between items-center">
          <h1 className="text-2xl text-black text-center">SIGN UP</h1>
        </div>
        <div>
          <input
            id="username"
            className="border border-slate-300 h-14 w-full rounded-xl px-4 text-lg placeholder:text-slate-700"
            placeholder="Username"
            {...register("username")}
          ></input>
          {errors.username && <p className="pl-4 text-red-500 text-sm">{errors.username.message}</p>}
        </div>
        <div>
          <input
            id="email"
            className="border border-slate-300 h-14 w-full rounded-xl px-4 text-lg placeholder:text-slate-700"
            placeholder="Email"
            {...register("email")}
          ></input>
          {errors.email && <p className="pl-4 text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <input
            id="password"
            className="border border-slate-300 h-14 w-full rounded-xl px-4 text-lg placeholder:text-slate-700"
            placeholder="Password"
            {...register("password")}
          ></input>
          {errors.password && <p className="pl-4 text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <div>
          <button
            type="submit"
            className="h-10 bg-[#57cc99] text-white text-center w-full rounded-md disabled:opacity-50 disabled:pointer-events-none"
          >
            SIGN UP
          </button>
        </div>
        <div className="text-right text-black underline text-sm hover:cursor-pointer hover:text-blue-300">
          <p
            onClick={() => {
              navigate("/login");
            }}
          >
            Already have an account? Login
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
