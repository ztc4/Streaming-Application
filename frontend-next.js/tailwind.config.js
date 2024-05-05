
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        "blue":"#113990",
        "white":"#ffffff",
        "yellow":"#F9ED32",
        "dark-background":"#091227", 
        "input-background":"#B0BAC3", // %40 opacity
        "orange":"#FF5733",
      
      },
      fontFamily:{
        "poppin-light":"poppin-light",
        "poppin-thin":"poppin-thin",
        "poppin-medium":"poppin-medium",
        "poppin-regular":"poppin-regular",
        "poppin-italic":"poppin-italic",
        "poppin-semibold":"poppin-semibold",
        "poppin-bold":"poppin-bold",
        "poppin-extrabold":"poppin-extrabold"
      },
      screens:{
        'sm2': {'max': '639px'}
      }
    },
  },
  plugins: [],
};
