import { FC } from "react";
import Link from "next/link";
import { FRONTEND_ROUTES } from "@/constants/app-keys.const";
import style from "./FooterNavigate.module.css";

const FooterNavigate: FC = () => {
  return (
    <div className={style.wrapComponent}>
      <div className={style.wrapInfo}>
        <h2 className={style.title}>Назва</h2>
        <Link className={style.link} href={FRONTEND_ROUTES.ABOUT_US}>
          Про компанію
        </Link>
        <Link className={style.link} href={FRONTEND_ROUTES.PRODUCTS}>
          Каталог товарів
        </Link>
      </div>
      <div className={style.wrapInfo}>
        <h2 className={style.title}>Допомога покупцеві</h2>
        <Link className={style.link} href={FRONTEND_ROUTES.DELIVERY}>
          Умови доставки
        </Link>
        <Link className={style.link} href={FRONTEND_ROUTES.CHANGE}>
          Обмін і повернення
        </Link>
      </div>
    </div>
  );
};

export default FooterNavigate;
