import { IContentArticle } from "@/types/articles.types";
import { FC } from "react";
import ReactMarkdown from "react-markdown";
import { TypeDescription } from "@/types/generalTypes/articles.type";
import style from "./ContentDescription.module.css";
interface IProps {
  params: IContentArticle;
}

const ContentDescription: FC<IProps> = ({ params }) => {
  return (
    <div className={style.wrapContent}>
      <ReactMarkdown>{params.content}</ReactMarkdown>
    </div>
  );
};

export default ContentDescription;
