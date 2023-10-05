import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/screens/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        xs: "320px",
        // => @media (min-width: 320px) { ... }

        sm: "480px",
        // => @media (min-width: 480px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1440px",
        // => @media (min-width: 1280px) { ... }
      },
      margin: {
        describe_big: "80px",
        describe_big_after_title: "32px",
        describe: "32px",
        describe_after_title: "32px",
      },
    },
  },
  plugins: [],
};
export default config;
