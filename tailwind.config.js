/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "bg-red-500",
    "animated-pulse",
    "bg-transparent",
    "hidden",
    "text-5xl",
    "text-center",
    "text-black",
    "bg-white",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
