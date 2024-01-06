import { IContentImageArticle } from "@/types/articles.types";
import { FC } from "react";
import Markdown from "react-markdown";
// import Markdown from "markdown-to-jsx";

import Image from "next/image";
import style from "./ContentWithImageDescription.module.css";

interface IProps {
  params: IContentImageArticle;
}

const ContentWithImageDescription: FC<IProps> = ({ params }) => {
  const image = params.image;

  return (
    <div className={style.wrapContent} data-reverse={params.reverseDirection}>
      <div
        className={`${style.wrapText} w-full lg:w-[${
          100 - params.percentImage
        }%]`}
      >
        <Markdown>{params.content}</Markdown>
      </div>

      <div
        className={`${style.wrapImage} w-full lg:w-[${params.percentImage}%]`}
      >
        {image && image.data && (
          <Image
            className={style.image}
            src={image.data.attributes.url}
            alt={params.description}
            height={0}
            width={0}
            // priority={true}
            sizes="(max-width: 1440px) 30vw, (max-width: 768px) 50vw,  100vw"
          />
        )}
      </div>
    </div>
  );
};

export default ContentWithImageDescription;
