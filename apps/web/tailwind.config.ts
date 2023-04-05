import { type Config } from "tailwindcss";

const colors = require("tailwindcss/colors");

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      
      colors: {
  ...colors,
  primary: colors.indigo
      },
    },
  },
  plugins: [],
} satisfies Config;
