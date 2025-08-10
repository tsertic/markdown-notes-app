import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error(error.message);
      setError("Something went wrong with login,check email and password");
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error(error.message);
      setError("Error occurer with google login in.");
    }
  };

  return (
    <div className="mx-auto max-w-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-8">
        {error && <p className="text-red-500 text-xs italic mb-4 ">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id={email}
              className="shadow appearance-none rounded border w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 leading-tight focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              placeholder="*********"
              className="shadow appearance-none rounded border w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 leading-tight focus:outline-none"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 font-bold text-white py-2 px-4 rounded focus:outline-none cursor-pointer"
            >
              {" "}
              login{" "}
            </button>
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="bg-red-500 hover:bg-red-700 font-bold text-white py-2 px-4 rounded focus:outline-none cursor-pointer"
            >
              Sign in with google{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
