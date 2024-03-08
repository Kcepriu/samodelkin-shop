import { FC } from "react";
import Description from "../Description/Description";
import { TypeDescription } from "@/types/generalTypes/articles.type";
import { TArticleGeneral } from "@/types/articles.types";
import style from "./GeneralInfoPage.module.css";

interface IProps {
  titlePage: string;
  content: TArticleGeneral[];
  isPage?: boolean;
}
const GeneralInfoPage: FC<IProps> = async ({
  titlePage,
  content,
  isPage,
}): Promise<JSX.Element> => {
  return (
    <>
      {!!titlePage && !!isPage && (
        <h1 className={style.titleSection}>{titlePage}</h1>
      )}

      {!!titlePage && !isPage && (
        <h2 className={style.titleSection}>{titlePage}</h2>
      )}

      <Description content={content} />
    </>
  );
};

export default GeneralInfoPage;
