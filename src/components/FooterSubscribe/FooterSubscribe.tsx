import { FC } from "react";
import style from "./FooterSubscribe.module.css";

const FooterSubscribe: FC = () => {
  return (
    <form name="subscrabe" className={style.form}>
      <label htmlFor="email">
        Оформіть підписку, щоб отримати знижку 10% на першу покупку
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
