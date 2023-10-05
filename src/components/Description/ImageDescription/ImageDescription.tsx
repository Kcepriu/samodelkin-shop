import { IImageArticle } from "@/types/articles.type";
import { FC } from "react";
import Image from "next/image";
import style from "./ImageDescription.module.css";

interface IProps {
  params: IImageArticle;
}

const ImageDescription: FC<IProps> = ({ params }) => {
  return (
    <div className={style.wrapContent}>
      <Image
        className={style.image}
        src={params.image.data.attributes.url}
        alt={params.description}
        height={0}
        width={0}
        // priority={true}
        sizes="100vw"
      />
    </div>
  );
};

export default ImageDescription;
