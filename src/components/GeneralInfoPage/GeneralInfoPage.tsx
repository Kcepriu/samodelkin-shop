import { FC } from "react";
import httpServices from "@/services/http";
import Description from "../Description/Description";
import { TypeDescription } from "@/types/generalTypes/articles.type";
import { TArticleGeneral } from "@/types/articles.types";
import style from "./GeneralInfoPage.module.css";

interface IProps {
  titlePage: string;
  content: TArticleGeneral[];
  type: TypeDescription;
  isPage?: boolean;
}
const GeneralInfoPage: FC<IProps> = async ({
  titlePage,
  content,
  type,
  isPage,
}): Promise<JSX.Element> => {
  const responseAboutUs = await httpServices.getAboutUs();

  if (!responseAboutUs) return <></>;

  return (
    <>
      {!!titlePage && !!isPage && (
        <h1 className={style.titleSection}>{titlePage}</h1>
      )}

      {!!titlePage && !isPage && (
        <h2 className={style.titleSection}>{titlePage}</h2>
      )}

      <Description content={content} type={type} />
    </>
  );
};

export default GeneralInfoPage;
