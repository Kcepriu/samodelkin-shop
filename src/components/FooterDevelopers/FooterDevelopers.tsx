import { FC } from "react";
import style from "./FooterDevelope.module.css";

const FooterDevelopers: FC = () => {
  return (
    <>
      <h2>Працювали над проєктом: </h2>
      <div className={style.wrapDevelopers}>
        <p>Працював Я</p>
        <p>Працював не Я</p>
        <p>Прекрасний дизанер</p>
      </div>
    </>
  );
};

export default FooterDevelopers;
