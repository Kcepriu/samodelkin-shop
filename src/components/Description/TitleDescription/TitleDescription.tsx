import { FC } from "react";
import { ITitleArticle } from "@/types/articles.type";
import style from "./TitleDescription.module.css";

interface IProps {
  params: ITitleArticle;
}

const TitleDescription: FC<IProps> = ({ params }) => {
  return <h2 className={style.title}>{params.title}</h2>;
};

export default TitleDescription;
