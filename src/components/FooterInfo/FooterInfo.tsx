import { FC } from "react";
import style from "./FooterInfo.module.css";

const FooterInfo: FC = () => {
  return (
    <div className={style.wrapComponent}>
      <h2 className={style.title}>Контакти</h2>
      <p>0800543788</p>
      <p>8:00-20:00 Пн-Нд</p>
      <p>Telegram</p>
    </div>
  );
};

export default FooterInfo;
