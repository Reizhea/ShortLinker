import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Error404() {
  const navigate = useNavigate();
  const [isDarkMode] = useState(localStorage.getItem("theme") === "dark");

  // Sync dark mode class with state
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-beige-100 dark:bg-gray-900">
      <h1 className="text-center text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-gray-100 tracking-wider mb-4">
        Your link might be wrong!
      </h1>
      <p className="text-center text-xl sm:text-2xl text-gray-700 dark:text-gray-300 font-medium mb-6">
        Double-check the URL or try shortening a new link.
      </p>

      <div className="w-full max-w-md">
        <img src="/assets/404.png" alt="404 Illustration" className="w-full" />
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-8 bg-pink-300 dark:bg-pink-600 text-black dark:text-white px-6 py-3 border-4 border-black rounded-lg font-semibold hover:bg-pink-400 dark:hover:bg-pink-700 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
      >
        Back to Home
      </button>
    </div>
  );
}
