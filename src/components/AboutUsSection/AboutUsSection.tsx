import { FC } from "react";
import httpServices from "@/services/http";
import Description from "../Description/Description";
import { TypeDescription } from "@/types/generalTypes/articles.type";
import style from "./AboutUsSection.module.css";

const AboutUsSection: FC = async (): Promise<JSX.Element> => {
  const responseAboutUs = await httpServices.getAboutUs();

  if (!responseAboutUs) return <></>;

  const aboutUs = responseAboutUs.data.attributes.content;

  return (
    <>
      <h2 className={style.titleSection}>Про нас</h2>
      <div className={style.wrapSection}>
        <Description content={aboutUs} type={TypeDescription.AboutUs} />
      </div>
    </>
  );
};

export default AboutUsSection;
