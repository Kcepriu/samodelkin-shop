import { IContentImageArticle } from "@/types/articles.type";
import { FC } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import style from "./ContentWithImageAboutUsSection.module.css";

interface IProps {
  params: IContentImageArticle;
  afterTitle: boolean;
}

const ContentWithImageAboutUsSection: FC<IProps> = ({ params, afterTitle }) => {
  return (
    <div
      className={style.wrapContent}
      data-reverse={params.reverseDirection}
      data-after-title={afterTitle}
    >
      <div
        className={style.wrapText}
        style={{ width: `${100 - params.percentImage}%` }}
      >
        <ReactMarkdown>{params.content}</ReactMarkdown>
      </div>
      <div
        className={style.wrapImage}
        style={{ width: `${params.percentImage}%` }}
      >
        <Image
          className={style.image}
          src={params.image.data.attributes.url}
          alt={params.description}
          height={0}
          width={0}
          // priority={true}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 30vw, 100vw"
        />
      </div>
    </div>
  );
};

export default ContentWithImageAboutUsSection;
