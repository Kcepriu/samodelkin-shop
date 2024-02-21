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
      width: {
        half_width: "calc(50% - 6px)",
      },

      height: {
        full_screen: "calc(100vh - 50px)",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        text_white: "#F0F0F0",
        black: "#161718",
        light_gray: "#C1C1C1",
        gray_our: "#9A9EA2",
        light_blue: "#D8E6FB",
        dark_blue: "#243650",
        blue_action: "#4488ED",
        blue_action_button: "#1673FF",
        blue_100: "#EDF5FF",
        blue_title: "#1B00AE",
        green_main: "#398F3D",
        button_active_page: "#DDDDDD",
        button_background_favorite: "#ffffffb3",
        modal_overlay: "#1B1919",
      },
      screens: {
        xs: "320px",
        // => @media (min-width: 320px) { ... }

        sm: "414px",
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
      fontFamily: {
        roboto: [`var(--font-roboto)`],
        inter: [`var(--font-inter)`],
        robotoSerif: [`var(--font-roboto_serif)`],
        itim: [`var(--font-itim)`],
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        size_12: "12px",
        size_13: "13px",
        size_14: "14px",
        size_16: "16px",
        size_17: "17px",
        size_18: "18px",
        size_20: "20px",
        size_22: "22px",
        size_24: "24px",
        size_32: "32px",
        size_40: "40px",
        size_150: "150px",
        size_200: "200px",
        size_250: "250px",
      },
      fontWeight: {
        weight_300: "300",
        weight_400: "400",
        weight_500: "500",
        weight_600: "600",
        weight_700: "700",
        weight_800: "800",
      },
      lineHeight: {
        line_height_10: "1",
        line_height_12: "1.2",
        line_height_15: "1.15",
        line_height_16: "1.16",
        line_height_17: "1.17",
        line_height_20: "1.2",
        line_height_21: "1.21",
        line_height_22: "1.22",
        line_height_24: "1.24",
        line_height_25: "1.25",
        line_height_28: "1.28",
        line_height_29: "1.29",
        line_height_30: "1.3",
        line_height_31: "1.31",
        line_height_40: "1.4",
        line_height_50: "1.5",
        line_height_60: "1.6",
        line_height_71: "1.71",
        line_height_75: "1.75",
      },
    },
  },
  plugins: [],
};
export default config;
