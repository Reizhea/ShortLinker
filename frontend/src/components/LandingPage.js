import React, { useState, useEffect } from "react";
import PopUp from "./PopUp";

export default function LandingPage() {
  const [shortenedLink, setShortenedLink] = useState(null);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleShorten = async () => {
    const urlInputField = document.querySelector("input[name='originalUrl']");
    const customCodeInputField = document.querySelector(
      "input[name='customCode']",
    );
    const originalUrl = urlInputField.value.trim();
    const customCode = customCodeInputField.value.trim();

    if (!originalUrl) {
      setError("Please enter a valid URL.");
      return;
    }

    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ originalUrl, customCode }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to shorten the URL.");
      }

      const data = await response.json();
      setShortenedLink(data.shortUrl);
      setIsPopUpOpen(true);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 bg-cover bg-center bg-beige-100 dark:bg-gray-900">
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 bg-gray-300 dark:bg-gray-700 text-black dark:text-white p-2 rounded-full shadow-md hover:shadow-lg"
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? <span>🌙</span> : <span>☀️</span>}
      </button>

      {/* Decorative Lines */}
      <div className="flex items-center justify-start gap-4 mb-6 w-full max-w-md sm:max-w-lg">
        <div className="bg-gray-800 dark:bg-gray-200 rounded-full h-4 w-4"></div>
        <div className="border-t-2 border-gray-800 dark:border-gray-200 w-20 sm:w-32 md:w-40"></div>
      </div>

      {/* Heading */}
      <h1 className="text-center text-5xl sm:text-6xl md:text-6xl lg:text-8xl font-extrabold text-gray-900 dark:text-gray-100 tracking-wider leading-tight px-4">
        Shorten your URLs <br /> simple and easy
      </h1>

      <div className="flex items-center justify-end gap-4 mt-6 w-full max-w-md sm:max-w-lg">
        <div className="border-t-2 border-gray-800 dark:border-gray-200 w-20 sm:w-32 md:w-40"></div>
        <div className="bg-gray-800 dark:bg-gray-200 rounded-full h-4 w-4"></div>
      </div>

      <p className="text-xl sm:text-2xl text-gray-900 dark:text-gray-200 font-medium mt-6 inline-flex items-center">
        Just paste your link{" "}
        <span className="ml-2 text-gray-900 dark:text-gray-200">↓</span>
      </p>

      {/* Input Fields */}
      <div className="mt-10 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md sm:max-w-lg justify-center">
        <input
          name="originalUrl"
          type="text"
          placeholder="Paste link here..."
          className="p-4 border-4 border-black rounded-lg w-full sm:w-80 h-14 sm:h-16 focus:outline-none placeholder-gray-500 text-gray-900 dark:text-gray-200 dark:bg-gray-800"
        />
        <div className="flex gap-2 w-full sm:w-auto">
          <input
            name="customCode"
            type="text"
            placeholder="Code (optional)"
            className="p-2 border-4 border-black rounded-lg w-40 focus:outline-none placeholder-gray-500 text-gray-900 dark:text-gray-200 dark:bg-gray-800 text-sm"
          />
          <button
            onClick={handleShorten}
            className="bg-pink-300 dark:bg-pink-600 text-black dark:text-white w-full sm:w-40 h-14 sm:h-16 border-4 border-black rounded-lg font-semibold hover:bg-pink-400 dark:hover:bg-pink-700 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            Shorten
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* PopUp */}
      {isPopUpOpen && (
        <PopUp link={shortenedLink} onClose={() => setIsPopUpOpen(false)} />
      )}
      {/* Footer Note */}
      <div className="absolute bottom-4 right-4 text-right text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 px-2">
        The server may take a moment to initialize on the first request.
      </div>
    </div>
  );
}
