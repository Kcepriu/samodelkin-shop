import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { FRONTEND_ROUTES } from "@/constants/app-keys.const";

import iconHeart from "@/assets/icons/heart.svg";
import iconPerson from "@/assets/icons/person.svg";
import iconCart from "@/assets/icons/cart.svg";
// import ShieldCheckIcon from "@/assets/icons.svg";

import styles from "./HeaderPage.module.css";

const HeaderPage: FC = () => {
  // console.log(ShieldCheckIcon);

  return (
    <div className={styles.wrapHeader}>
      <Link href="/">Logo</Link>

      <div className={styles.wrapNavigate}>
        <Link href={`${FRONTEND_ROUTES.CHECKOUT}`}>Оформлення замовлення</Link>

        <Link href={`${FRONTEND_ROUTES.CONTACTS}`}>Contacts</Link>

        <ul className={styles.wrapButton}>
          <li>
            <Link className={styles.link} href={`${FRONTEND_ROUTES.FAVORITES}`}>
              {/* <svg className={styles.icon}>
                <use href={iconHeart} fill="red" />
              </svg> */}

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
            <Link className={styles.link} href={`${FRONTEND_ROUTES.CART}`}>
              <Image
                className={styles.icon}
                src={iconCart}
                alt="icon"
                width={24}
                height={24}
                priority
              />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderPage;
