import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { FRONTEND_ROUTES } from "@/constants/app-keys.const";
import ButtonOpenCart from "../ButtonOpenCart/ButtonOpenCart";

import iconHeart from "@/assets/icons/heart.svg";
import iconPerson from "@/assets/icons/person.svg";

import styles from "./HeaderPage.module.css";

const HeaderPage: FC = () => {
  return (
    <div className={styles.wrapHeader}>
      <Link href="/" className={styles.logo}>
        Logo
      </Link>

      <div className={styles.wrapNavigate}>
        <Link href={`${FRONTEND_ROUTES.CHECKOUT}`}>Оформлення замовлення</Link>

        <Link href={`${FRONTEND_ROUTES.CONTACTS}`}>Contacts</Link>

        <ul className={styles.wrapButton}>
          <li>
            <Link className={styles.link} href={`${FRONTEND_ROUTES.FAVORITES}`}>
              {/* <svg className={styles.icon}>
                <use href={iconHeart} fill="red" />
              </svg> */}
              {/* <IconSvg className={styles.icon} name="icon_heart"></IconSvg> */}
              <Image
                className={styles.icon}
                src={iconHeart}
                alt="icon"
                width={24}
                height={24}
                priority
              />
            </Link>
          </li>
          <li>
            <Link className={styles.link} href={`${FRONTEND_ROUTES.ACCOUNT}`}>
              <Image
                className={styles.icon}
                src={iconPerson}
                alt="icon"
                width={24}
                height={24}
                priority
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
