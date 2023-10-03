import { IImageArticle } from "@/types/articles.type";
import { FC } from "react";
import Image from "next/image";
import style from "./ImageAboutUsSection.module.css";
interface IProps {
  params: IImageArticle;
  afterTitle: boolean;
}

const ImageAboutUsSection: FC<IProps> = ({ params, afterTitle }) => {
  return (
    <div className={style.wrapContent} data-after-title={afterTitle}>
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

export default ImageAboutUsSection;
