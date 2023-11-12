import { FC } from "react";
import Link from "next/link";
import ImageLogo from "@/assets/logo.png";
import Image from "next/image";
import ButtonOpenCart from "../ButtonOpenCart/ButtonOpenCart";
import ButtonGoToFavorite from "../ButtonGoToFavorite/ButtonGoToFavorite";
import ButtonGoToAccount from "../ButtonGoToAccount/ButtonGoToAccount";

import style from "./HeaderPage.module.css";

const HeaderPage: FC = () => {
  return (
    <div className={style.wrapHeader}>
      <Link href="/" className={style.logo}>
        <Image src={ImageLogo} alt="Logo Shop" width={78} height={78} />
      </Link>

      <div className={style.wrapNavigate}>
        <Link className={style.link} href="#contacts">
          Контакти
        </Link>

        <ul className={style.wrapButton}>
          <li>
            <ButtonGoToFavorite />
          </li>
          <li>
            <ButtonGoToAccount />
          </li>
          <li>
            <ButtonOpenCart />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderPage;
