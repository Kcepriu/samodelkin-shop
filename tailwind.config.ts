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
      colors: {
        main_background: "#D9D9D9",
        review_background: "#E4E4E4",
        button_background: "#B3B2B3",
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
      fontSize: {
        title_section: "32px",
        title_filter: "20px",
        text_filter: "18px",
        text_description: "16px",
        text_description_home: "18px",
        type_add_info: "20px",
        text_footer: "16px",
        title_footer: "16px",
        button_footer: "20px",
        review_content: "18px",
        review_text: "14px",
        review_title: "18px",
        button_add_review: "20px",
      },
      fontWeight: {
        title_section: "400",
        title_filter: "600",
        text_filter: "400",
        text_description: "400",
        text_description_home: "400",
        type_add_info: "300",
        text_footer: "300",
        title_footer: "600",
        button_footer: "400",
        review_content: "300",
        review_text: "300",
        review_title: "500",
        button_add_review: "300",
      },
      lineHeight: {
        title_section: "1.16",
        title_filter: "1.2",
        text_filter: "1.22",
        text_description: "1.31",
        text_description_home: "1.28",
        type_add_info: "1.2",
        text_footer: "1.5",
        title_footer: "1.5",
        button_footer: "1.6",
        review_content: "1.28",
        review_text: "1.29",
        review_title: "1.28",
        button_add_review: "1.15",
      },
    },
  },
  plugins: [],
};
export default config;
