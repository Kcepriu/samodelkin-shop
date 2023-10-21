import { FC } from "react";
import Image from "next/image";
import iconTelegram from "@/assets/icons/telegram.svg";
import style from "./FooterInfo.module.css";

const FooterInfo: FC = () => {
  const telephoneNumber = "0800543788";
  const telegramName = "https://t.me/SerhiiKostiuchenko";
  return (
    <div id="contacts" className={style.wrapComponent}>
      <h2 className={style.title}>Контакти</h2>
      <a href={`tel:${telephoneNumber}`} className={style.link}>
        {telephoneNumber}
      </a>
      <p>8:00-20:00 Пн-Нд</p>
      <a href={telegramName} target="_blank" className={style.link}>
        <Image
          src={iconTelegram}
          alt="Picture of the author"
          width={24}
          height={24}
        />{" "}
        Telegram
      </a>
    </div>
  );
};

export default FooterInfo;
