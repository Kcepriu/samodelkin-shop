import { FC } from "react";
import httpServices from "@/services/http";
import TitleAboutUsSection from "./TitleAboutUsSection/TitleAboutUsSection";
import ContentAboutUsSection from "./ContentAboutUsSection/ContentAboutUsSection";
import ContentWithImageAboutUsSection from "./ContentWithImageAboutUsSection/ContentWithImageAboutUsSection";
import ImageAboutUsSection from "./ImageAboutUsSection/ImageAboutUsSection";

import { TypeArticles } from "@/types/generalTypes/articles.type";
import style from "./AboutUsSection.module.css";

const AboutUsSection: FC = async (): Promise<JSX.Element> => {
  const responseAboutUs = await httpServices.getAboutUs();

  if (!responseAboutUs) return <></>;

  const aboutUs = responseAboutUs.data.attributes.content;
  let countAfterTitile = 2;

  return (
    <>
      <h2 className={style.titleSection}>Про нас</h2>
      <div className={style.wrapContent}>
        {aboutUs.map((element, index) => {
          if (element.__component === TypeArticles.Title) {
            countAfterTitile = 0;
            return <TitleAboutUsSection key={index} params={element} />;
          }
          if (element.__component === TypeArticles.Content) {
            countAfterTitile++;
            return (
              <ContentAboutUsSection
                key={index}
                params={element}
                afterTitle={countAfterTitile === 1}
              />
            );
          }
          if (element.__component === TypeArticles.Image) {
            countAfterTitile++;
            return (
              <ImageAboutUsSection
                key={index}
                params={element}
                afterTitle={countAfterTitile === 1}
              />
            );
          }
          if (element.__component === TypeArticles.ContentImage) {
            countAfterTitile++;
            return (
              <ContentWithImageAboutUsSection
                key={index}
                params={element}
                afterTitle={countAfterTitile === 1}
              />
            );
          }
        })}
      </div>
    </>
  );
};

export default AboutUsSection;
