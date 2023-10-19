import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { FRONTEND_ROUTES } from "@/constants/app-keys.const";
import ButtonOpenCart from "../ButtonOpenCart/ButtonOpenCart";
import ButtonGoToFavorite from "../ButtonGoToFavorite/ButtonGoToFavorite";
import { GoPerson } from "react-icons/go";

import styles from "./HeaderPage.module.css";

const HeaderPage: FC = () => {
  return (
    <div className={styles.wrapHeader}>
      <Link href="/" className={styles.logo}>
        Logo
      </Link>

      <div className={styles.wrapNavigate}>
        <Link className={styles.link} href={`${FRONTEND_ROUTES.CHECKOUT}`}>
          Оформлення замовлення
        </Link>

        <Link className={styles.link} href={`${FRONTEND_ROUTES.CONTACTS}`}>
          Contacts
        </Link>

        <ul className={styles.wrapButton}>
          <li>
            <ButtonGoToFavorite />
          </li>
          <li>
            <Link className={styles.link} href={`${FRONTEND_ROUTES.ACCOUNT}`}>
              <GoPerson className={styles.icon} size={24} />
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
