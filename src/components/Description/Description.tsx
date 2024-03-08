import { FC } from "react";

import TitleDescription from "./TitleDescription/TitleDescription";
import ContentDescription from "./ContentDescription/ContentDescription";
import ContentWithImageDescription from "./ContentWithImageDescription/ContentWithImageDescription";
import ImageDescription from "./ImageDescription/ImageDescription";

import {
  TypeArticles,
  TypeDescription,
} from "@/types/generalTypes/articles.type";

import { ITitleArticle, TArticleGeneral } from "@/types/articles.types";
import style from "./Description.module.css";

interface IProps {
  content: TArticleGeneral[];
  type: TypeDescription;
  isFirstTitleInSection?: boolean;
}
const Description: FC<IProps> = ({
  content,
  type,
  isFirstTitleInSection = false,
}) => {
  let numberSection = 0;
  let elementTitle: ITitleArticle | undefined = undefined;

  return (
    <>
      {content.map((element, index) => {
        // * Title
        if (element.__component === TypeArticles.Title) {
          if (isFirstTitleInSection && numberSection > 0) {
            elementTitle = element;
            return null;
          }

          numberSection++;

          return (
            <div
              key={index}
              className={style.wrapTitle}
              data-is-first-section={numberSection === 1}
            >
              <TitleDescription params={element} />
            </div>
          );
        }

        // * Content
        if (element.__component === TypeArticles.Content) {
          numberSection++;
          return (
            <div
              key={index}
              className={style.wrapContent}
              data-is-first-section={numberSection === 1}
            >
              <ContentDescription params={element} />
            </div>
          );
        }

        // * Image
        if (element.__component === TypeArticles.Image) {
          numberSection++;
          return (
            <div
              key={index}
              className={style.wrapContent}
              data-is-first-section={numberSection === 1}
            >
              <ImageDescription params={element} />
            </div>
          );
        }

        // * ContentImage
        if (element.__component === TypeArticles.ContentImage) {
          numberSection++;
          return (
            <div
              key={index}
              className={style.wrapContent}
              data-is-first-section={numberSection === 1}
            >
              <ContentWithImageDescription
                params={element}
                //elementTitle={elementTitle}
              />
            </div>
          );
        }
      })}
    </>
  );
};

export default Description;
