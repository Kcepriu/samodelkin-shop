import { FC } from "react";
import style from "./FooterNavigate.module.css";

const FooterNavigate: FC = () => {
  return (
    <div className={style.wrapComponent}>
      <div className={style.wrapInfo}>
        <h2 className={style.title}>Назва</h2>
        <p>Про компанію</p>
        <p>Contscts</p>
        <p>Security</p>
        <p>Catalog</p>
      </div>
      <div className={style.wrapInfo}>
        <h2 className={style.title}>Допомога покупцеві</h2>
        <p>Умови доставки</p>
        <p>Обмін і повернення</p>
        <p>Правила користування сайтом</p>
        <p>Гарантія</p>
      </div>
    </div>
  );
};

export default FooterNavigate;
