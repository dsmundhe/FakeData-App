import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white text-center p-6">
      <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
        🚀 Firebase Data Manager
      </h1>
      <p className="text-lg text-gray-100 max-w-md mb-10">
        Send, Read, and Manage your data in real-time with Firebase — built using React + Vite.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/send"
          className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-xl shadow-lg hover:scale-105 hover:bg-gray-100 transition-all duration-300"
        >
          ➤ Send Data
        </Link>
        <Link
          to="/read"
          className="bg-white text-purple-600 font-semibold py-3 px-8 rounded-xl shadow-lg hover:scale-105 hover:bg-gray-100 transition-all duration-300"
        >
          🔍 Read Live Data
        </Link>
        <Link
          to="/all"
          className="bg-white text-green-600 font-semibold py-3 px-8 rounded-xl shadow-lg hover:scale-105 hover:bg-gray-100 transition-all duration-300"
        >
          📊 All Data
        </Link>
      </div>
    </div>
  );
};

export default Home;
