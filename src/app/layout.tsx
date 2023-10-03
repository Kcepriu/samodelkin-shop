import { FC, ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import FooterPage from "@/components/FooterPage/FooterPage";
import HeaderPage from "@/components/HeaderPage/HeaderPage";
import style from "@/styles/RootLayout.module.css";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Samodelkin Shop",
  description: "Інтернет магазин продажу іграшок ручної роботи",
};
interface IProps {
  children: ReactNode;
}

const RootLayout: FC<IProps> = ({ children }) => {
  return (
    <html lang="ua">
      <body className={inter.className}>
        <div className={style.wrapBody}>
          <header>
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
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
