import { FC } from "react";

import TitleDescription from "./TitleDescription/TitleDescription";
import ContentDescription from "./ContentDescription/ContentDescription";
import ContentWithImageDescription from "./ContentWithImageDescription/ContentWithImageDescription";
import ImageDescription from "./ImageDescription/ImageDescription";

import { TypeArticles } from "@/types/generalTypes/articles.type";
import { TArticleGeneral } from "@/types/articles.type";
import { TypeDescription } from "@/types/generalTypes/articles.type";
import style from "./Description.module.css";

interface IProps {
  content: TArticleGeneral[];
  type: TypeDescription;
}
const Description: FC<IProps> = ({ content, type }) => {
  let countAfterTitile = 2;

  return (
    <>
      {content.map((element, index) => {
        // * Title
        if (element.__component === TypeArticles.Title) {
          countAfterTitile = 0;

          return <TitleDescription key={index} params={element} />;
        }
        // * Content
        if (element.__component === TypeArticles.Content) {
          countAfterTitile++;
          return (
            <div
              className={style.wrapContent}
              key={index}
              data-after-title={countAfterTitile === 1}
              data-about-us={type === TypeDescription.GeneralPage}
              data-category={type === TypeDescription.Category}
              data-product={type === TypeDescription.Product}
            >
              <ContentDescription params={element} />
            </div>
          );
        }
        // * Image
        if (element.__component === TypeArticles.Image) {
          countAfterTitile++;
          return (
            <div
              className={style.wrapContent}
              key={index}
              data-after-title={countAfterTitile === 1}
              data-about-us={type === TypeDescription.GeneralPage}
              data-category={type === TypeDescription.Category}
              data-product={type === TypeDescription.Product}
            >
              <ImageDescription params={element} />
            </div>
          );
        }
        // * ContentImage
        if (element.__component === TypeArticles.ContentImage) {
          countAfterTitile++;
          return (
            <div
              className={style.wrapContent}
              key={index}
              data-after-title={countAfterTitile === 1}
              data-about-us={type === TypeDescription.GeneralPage}
              data-category={type === TypeDescription.Category}
              data-product={type === TypeDescription.Product}
            >
              <ContentWithImageDescription params={element} />
            </div>
          );
        }
      })}
    </>
  );
};

export default Description;
