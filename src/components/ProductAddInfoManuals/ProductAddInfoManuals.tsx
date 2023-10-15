import { FC } from "react";
import Link from "next/link";
import style from "./ProductAddInfoManuals.module.css";
interface IProps {
  manuals: IManual[];
}
const ProductAddInfoManuals: FC<IProps> = ({ manuals }) => {
  return (
    <div className={style.wrapContent}>
      <ul className={style.listManuals}>
        {manuals.map(({ id, file, description }) => {
          return (
            <li key={id}>
              <a
                href={file.data.attributes.url}
                download
                className={style.link}
                type={file.data.attributes.mime}
                target="_blank"
              >
                {description}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductAddInfoManuals;
