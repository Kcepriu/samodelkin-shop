import { FC } from "react";
import style from "./FooterSubscribe.module.css";

const FooterSubscribe: FC = () => {
  return (
    <form name="subscrabe" className={style.form}>
      <label htmlFor="email">
        Хочете дізнаватися першим про акції і знижки? Підпишіться на нашу
        розсилку
      </label>
      <input
        className={style.input}
        type="email"
        name="email"
        id="email"
        placeholder="email@email.com"
        required
      />
      <button className={style.button} type="submit">
        Відправити
      </button>
    </form>
  );
};

export default FooterSubscribe;
