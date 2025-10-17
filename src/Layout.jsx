import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-900 text-white flex justify-between items-center px-6 py-4 shadow-md">
        <Link to="/" className="text-2xl font-bold hover:text-blue-400 transition">
          Firebase App
        </Link>
        <div className="flex gap-4">
          <Link to="/send" className="hover:text-blue-300 transition">Send Data</Link>
          <Link to="/read" className="hover:text-blue-300 transition">Read Data</Link>
          <Link to="/all" className="hover:text-blue-300 transition">All Data</Link>
        </div>
      </nav>

      <div className="flex-1 p-4">
        <Outlet />
      </div>

      <footer className="bg-gray-900 text-gray-300 text-center p-4 mt-auto">
        © 2025 Firebase App by <span className="font-semibold">MAD</span>
      </footer>
    </div>
  );
};

export default Layout;
