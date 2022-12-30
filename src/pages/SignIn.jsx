import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../firebase/Config";

const SignIn = ({setActive}) => {
  const [ShowPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      setActive('home')
      toast.success("Login Successful");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[500px] mx-auto shadow-lg rounded-md p-4">
        <h2 className="font-semibold font-Unbounded py-3 text-lg text-color-gray-400">
          Welcome User!
        </h2>
        <form className="flex flex-col gap-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-transparent px-2 py-4 border border-color-gray-300 rounded-md placeholder:text-color-gray-300 "
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative ">
            <input
              type={ShowPassword ? "text" : "password"}
              placeholder="password"
              className="w-full bg-transparent px-2 py-4 border border-color-gray-300 rounded-md placeholder:text-color-gray-300"
              onChange={(e) => setPassword(e.target.value)}
            />
            {ShowPassword ? (
              <EyeIcon
                className="w-4 absolute top-5 right-2 cursor-pointer"
                onClick={() => setShowPassword(!ShowPassword)}
              />
            ) : (
              <EyeSlashIcon
                className="w-4 absolute top-5 right-2 cursor-pointer"
                onClick={() => setShowPassword(!ShowPassword)}
              />
            )}
          </div>
          <button
            className="bg-color-gray-300 text-color-gray-100 py-2 rounded-md font-semibold tracking-wider hover:bg-color-gray-400 duration-300 ease-in"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-color-gray-400">
          Don't have an account? &nbsp;
          <Link
            to="/register"
            className="text-base font-medium hover:tracking-wider duration-300 ease-in hover:border-b hover:border-b-color-gray-400"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
