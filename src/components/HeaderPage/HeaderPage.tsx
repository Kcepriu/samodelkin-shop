import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { FRONTEND_ROUTES } from "@/constants/app-keys.const";
import IconWithCount from "../IconWithCount/IconWithCount";
import ButtonOpenCart from "../ButtonOpenCart/ButtonOpenCart";
import ButtonGoToFavorite from "../ButtonGoToFavorite/ButtonGoToFavorite";
import { GoPerson } from "react-icons/go";

import style from "./HeaderPage.module.css";

const HeaderPage: FC = () => {
  return (
    <div className={style.wrapHeader}>
      <Link href="/" className={style.logo}>
        Logo
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
            <Link className={style.link} href={`${FRONTEND_ROUTES.ACCOUNT}`}>
              <IconWithCount
                Icon={GoPerson}
                sizeIcon={32}
                className={style.icon}
              />
            </Link>
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
