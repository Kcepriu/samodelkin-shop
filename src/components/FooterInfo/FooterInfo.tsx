import { FC } from "react";
import Link from "next/link";
import { PiPhoneCall, PiTelegramLogo } from "react-icons/pi";
import httpServices from "@/services/http";
import style from "./FooterInfo.module.css";

const FooterInfo: FC = async () => {
  const responseMainPage = await httpServices.getMainPage();
  const telephoneNumber = responseMainPage?.data.attributes.phoneNumber || "";
  const telegramName = responseMainPage?.data.attributes.telegram || "";
  const workingHours = responseMainPage?.data.attributes.workingHours || "";

  return (
    <div id="contacts" className={style.wrapComponent}>
      <h2 className={style.title}>Контакти</h2>
      <p>{workingHours}</p>

      <Link href={`tel:${telephoneNumber}`} className={style.link}>
        <PiPhoneCall size={24} />
        {telephoneNumber}
      </Link>

      <Link href={telegramName} target="_blank" className={style.link}>
        <PiTelegramLogo size={24} /> Telegram
      </Link>
    </div>
  );
};

export default FooterInfo;
