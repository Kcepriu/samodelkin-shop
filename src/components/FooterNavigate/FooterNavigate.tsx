import { FC } from "react";
import style from "./FooterNavigate.module.css";

const FooterNavigate: FC = () => {
  return (
    <div className={style.wrapComponent}>
      <div>
        <h2>Назва</h2>
        <p>Про компанію</p>
        <p>Contscts</p>
        <p>Security</p>
        <p>Catalog</p>
      </div>
      <div>
        <h2>Допомога покупцеві</h2>
        <p>Умови доставки</p>
        <p>Обмін і повернення</p>
        <p>Правила користування сайтом</p>
        <p>Гарантія</p>
      </div>
    </div>
  );
};

export default FooterNavigate;
