import { FC, ReactNode } from "react";
import type { Metadata } from "next";
import { Inter, Roboto, Roboto_Serif } from "next/font/google";
import Providers from "@/components/Providers/Providers";
import FooterPage from "@/components/FooterPage/FooterPage";
import HeaderPage from "@/components/HeaderPage/HeaderPage";
import style from "./layoutRoot.module.css";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-roboto",
});

const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-roboto_serif",
});

export const metadata: Metadata = {
  title: "Samodelkin Shop",
  description: "Інтернет магазин продажу іграшок ручної роботи",
};
interface IProps {
  children: ReactNode;
}

const RootLayout: FC<IProps> = ({ children }) => {
  return (
    <html
      lang="ua"
      className={`${inter.variable} ${roboto.variable} ${robotoSerif.variable}`}
    >
      <body className={inter.className}>
        <Providers>
          <div className={style.wrapBody}>
            <header className={style.header}>
              <div className={style.container}>
                <HeaderPage />
              </div>
            </header>

            <main className={style.wrapMain}>
              <div className={style.container}>{children}</div>
            </main>

            <footer className={style.wrapFooter}>
              <div className={style.container}>
                <FooterPage />
              </div>
            </footer>

            <div id="modal-root"></div>
            <div id="modal-button-root"></div>
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
