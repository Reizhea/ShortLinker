/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    colors: {
      brown: {
        600: "#4d0500", // SaddleBrown
      },
      beige: {
        100: "#f5f5dc", // Light beige
      },
    },
  },
};
export const plugins = [];
export const darkMode = "class"; // Enable dark mode
