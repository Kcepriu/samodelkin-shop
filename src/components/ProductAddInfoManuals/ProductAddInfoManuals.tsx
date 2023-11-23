import { FC } from "react";
import Link from "next/link";
import { PiArrowLineDown } from "react-icons/pi";
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
              <Link
                href={file.data.attributes.url}
                download
                className={style.link}
                type={file.data.attributes.mime}
                target="_blank"
              >
                <PiArrowLineDown size={24} />
                {description}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductAddInfoManuals;
