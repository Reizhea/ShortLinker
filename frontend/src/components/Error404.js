import React from "react";
import { useNavigate } from "react-router-dom";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundColor: "#f7efe8",
        backgroundImage: 'url(/assets/background-pattern.jpg)',
      }}
    >

      <h1 className="text-center text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-wider mb-4">
        Your link might be wrong!
      </h1>
      <p className="text-center text-xl sm:text-2xl text-gray-700 font-medium mb-6">
        Double-check the URL or try shortening a new link.
      </p>

      <div className="w-full max-w-md">
        <img
          src="/assets/404.png" 
          alt="404 Illustration"
          className="w-full"
        />
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-8 bg-pink-300 text-black px-6 py-3 border-4 border-black rounded-lg font-semibold hover:bg-pink-400 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
      >
        Back to Home
      </button>
    </div>
  );
}
