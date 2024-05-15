import { FC, ReactNode } from "react";
import type { Metadata } from "next";
import { Inter, Roboto, Roboto_Serif, Itim } from "next/font/google";
import Providers from "@/components/Providers/Providers";
import FooterPage from "@/components/FooterPage/FooterPage";
import HeaderPage from "@/components/HeaderPage/HeaderPage";
import { DefaultValueSeo } from "@/constants/seo.const";
import style from "./layoutRoot.module.css";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-roboto_serif",
});

const itim = Itim({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-itim",
});

export const metadata: Metadata = DefaultValueSeo;

interface IProps {
  children: ReactNode;
}

const RootLayout: FC<IProps> = ({ children }) => {
  return (
    <html
      lang="ua"
      className={`${inter.variable} ${roboto.variable} ${robotoSerif.variable} ${itim.variable}`}
    >
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          <div className={style.wrapBody}>
            <header className={style.header}>
              <div className={style.container}>
                <div className={style.wrapHeader}>
                  <HeaderPage />
                </div>
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
