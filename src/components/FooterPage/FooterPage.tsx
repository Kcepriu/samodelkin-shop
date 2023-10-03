import { FC } from "react";
import FooterDevelopers from "../FooterDevelopers/FooterDevelopers";
import FooterInfo from "../FooterInfo/FooterInfo";
import FooterNavigate from "../FooterNavigate/FooterNavigate";
import FooterSubscribe from "../FooterSubscribe/FooterSubscribe";
import style from "./FooterPage.module.css";

const FooterPage: FC = () => {
  return (
    <div className={style.wrapFooter}>
      <div className={style.wrapTopRow}>
        <FooterSubscribe />
        <FooterNavigate />
        <FooterInfo />
      </div>
      <div className={style.wrapBottomRow}>
        <FooterDevelopers />
      </div>
    </div>
  );
};

export default FooterPage;
