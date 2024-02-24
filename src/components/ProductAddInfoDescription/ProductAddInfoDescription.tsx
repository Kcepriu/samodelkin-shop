import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import httpServices from "@/services/http";
import Description from "../Description/Description";
import { TypeDescription } from "@/types/generalTypes/articles.type";
import { PiArrowLineDown } from "react-icons/pi";
import { getImageFlag } from "@/helpers/getImageFlag";
import style from "./ProductAddInfoDescription.module.css";

interface IPros {
  productId: string;
  manuals: IManual[];
}

const ProductAddInfoDescription: FC<IPros> = async ({
  productId,
  manuals,
}): Promise<JSX.Element> => {
  const respProductDescription = await httpServices.getProductDescriptions(
    productId
  );

  return (
    <div className={style.wrapContent}>
      {!!respProductDescription && respProductDescription.data.length > 0 && (
        <Description
          content={respProductDescription.data[0].attributes.content}
          type={TypeDescription.Product}
        />
      )}

      {/* MAnuals */}
      <ul className={style.wrapManuals}>
        {manuals.map(({ id, file, description, languages }) => {
          if (!file.data) return null;
          return (
            <li key={id}>
              <Link
                className={style.link}
                href={file.data.attributes.url}
                download
                type={file.data.attributes.mime}
                target="_blank"
              >
                {description}
                <div className={style.wrapIcon}>
                  <Image
                    className={style.imageFlag}
                    src={getImageFlag(languages, true)}
                    alt={languages}
                    height={0}
                    width={0}
                  />
                  <PiArrowLineDown size={24} className={style.icon} />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductAddInfoDescription;
