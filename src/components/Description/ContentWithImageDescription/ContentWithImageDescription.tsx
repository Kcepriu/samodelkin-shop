"use client";
import { IContentImageArticle } from "@/types/articles.types";
import { FC } from "react";
import Image from "next/image";
import Markdown from "react-markdown";
import useMediaQuery from "@mui/material/useMediaQuery";
import { breakpoints } from "@/constants/breakpoints";
import style from "./ContentWithImageDescription.module.css";

interface IProps {
  params: IContentImageArticle;
}

const ContentWithImageDescription: FC<IProps> = ({ params }) => {
  const image = params.image;
  const matches = useMediaQuery(`(min-width:${breakpoints.desktop}px)`);

  return (
    <div className={style.wrapContent} data-reverse={params.reverseDirection}>
      <div
        className={style.wrapText}
        style={
          matches
            ? {
                backgroundColor: "tomato",
                width: `${100 - params.percentImage}%`,
              }
            : {}
        }
      >
        <Markdown>{params.content}</Markdown>
      </div>

      <div
        className={style.wrapImage}
        style={
          matches
            ? {
                width: `${params.percentImage}%`,
              }
            : {}
        }
      >
        {image && image.data && (
          <Image
            className={style.image}
            src={image.data.attributes.url}
            alt={params.description}
            height={0}
            width={0}
            // priority={true}
            sizes={`(max-width: ${breakpoints.desktop}px) 30vw, (max-width: ${breakpoints.tablet}px) 50vw,  100vw`}
          />
        )}
      </div>
    </div>
  );
};

export default ContentWithImageDescription;
