import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import ThemeToogle from "./ThemeToogle";
const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Something went wrong with logout", error.message);
    }
  };
  return (
    <nav className="bg-white shadow-md dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link
            to="/"
            className="text-2xl font-bold text-gray-800 dark:text-white"
          >
            Markdown Notes
          </Link>
          <div className="flex items-center space-x-4">
            <ThemeToogle />
            {currentUser ? (
              <>
                <span className="text-gray-700 dark:text-gray-300 hidden text-sm sm:block">
                  {currentUser.email}
                </span>
                <button
                  onClick={handleLogOut}
                  className="bg-blue-500 hover:bg-blue-600 rounded block font-bold px-3 py-2 cursor-pointer text-white transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white transition-colors duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
