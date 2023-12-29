import { FC } from "react";
import Link from "next/link";
import ImageLogo from "@/assets/logo.png";
import Image from "next/image";
import { PiPhoneCall } from "react-icons/pi";
import ButtonOpenCart from "../ButtonOpenCart/ButtonOpenCart";
import ButtonGoToFavorite from "../ButtonGoToFavorite/ButtonGoToFavorite";
import ButtonGoToAccount from "../ButtonGoToAccount/ButtonGoToAccount";
import httpServices from "@/services/http";

import style from "./HeaderPage.module.css";

const HeaderPage: FC = async () => {
  const responseMainPage = await httpServices.getMainPage();
  const telephoneNumber = responseMainPage?.data.attributes.phoneNumber || "";

  return (
    <div className={style.wrapHeader}>
      <Link href="/" className={style.logo}>
        <Image src={ImageLogo} alt="Logo Shop" width={78} height={78} />
      </Link>

      <div className={style.wrapNavigate}>
        {/* <Link className={style.link} href="#contacts">
          Контакти
        </Link> */}

        <Link href={`tel:${telephoneNumber}`} className={style.phoneNumber}>
          <PiPhoneCall size={24} />
          {telephoneNumber}
        </Link>

        <ul className={style.wrapButton}>
          <li>
            <ButtonGoToFavorite />
          </li>
          <li>
            <ButtonGoToAccount />
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
