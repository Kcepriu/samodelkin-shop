import { ITitleArticle } from "@/types/articles.type";
import { FC } from "react";

interface IProps {
  params: ITitleArticle;
}

const TitleAboutUsSection: FC<IProps> = ({ params }) => {
  return <h2>{params.title}</h2>;
};

export default TitleAboutUsSection;
