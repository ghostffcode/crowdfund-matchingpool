import { type Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['var(--font-dm-mono)'],
        'serif': ['var(--font-pt-serif)'],
        'pp-mori': ['var(--font-pp-mori)']
      },
      colors: {
        ...colors,
        primary: {
          ...colors.indigo,
          200: "#FFFFFF",
          600: "#000000",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
