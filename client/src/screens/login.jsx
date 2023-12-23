import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../service/userService";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  const handleLogin = async () => {
    await axios
      .post("http://localhost:4000/auth/login", { email, password })
      .then((res) => {
        console.log(res)
        localStorage.setItem("token", res.data.token);
        Navigate("/dashboard/bottle");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid Credentials")
      });
  };

  return (
    <div className="w-screen h-screen  bg-login bg-cover flex items-center justify-center ">
      <div className="w-1/2 h-2/3 bg-black bg-opacity-50 rounded-lg shadow-lg">
        <div className="h-full flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-slate-200">Login</h1>
          <div className="w-full h-1/2 flex flex-col items-center justify-center gap-y-4">
            <input
              className="w-2/3 h-10 my-2 px-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-2/3 h-10 my-2 px-2 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-blue-500"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="w-2/3 h-10 my-2 px-2 grid place-content-center rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-700 focus:outline-none focus:bg-blue-700 hover:cursor-pointer"
              onClick={handleLogin}
            >
              Login
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
