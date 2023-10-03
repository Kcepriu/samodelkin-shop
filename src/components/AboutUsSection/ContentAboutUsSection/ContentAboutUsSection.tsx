import { IContentArticle } from "@/types/articles.type";
import { FC } from "react";
import ReactMarkdown from "react-markdown";
import style from "./ContentAboutUsSection.module.css";
interface IProps {
  params: IContentArticle;
  afterTitle: boolean;
}

const ContentAboutUsSection: FC<IProps> = ({ params, afterTitle }) => {
  return (
    <div className={style.wrapContent} data-after-title={afterTitle}>
      <ReactMarkdown>{params.content}</ReactMarkdown>
    </div>
  );
};

export default ContentAboutUsSection;
