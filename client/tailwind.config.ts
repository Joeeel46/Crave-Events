import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // make sure it covers all your components
  ],
  theme: {
    extend: {
      colors: {
        brandPink: "#ec4899",
        brandPurple: "#8b5cf6",
      },
    },
  },
  plugins: [],
};

export default config;
