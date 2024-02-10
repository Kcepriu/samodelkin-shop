import { FC } from "react";
import style from "./ProductAddInfoCharacteristics.module.css";

interface IProps {
  product: IProduct;
}
const ProductAddInfoCharacteristics: FC<IProps> = ({ product }) => {
  const characteristics = product.attributes.characteristics;

  return (
    <ul className={style.wrapContent}>
      {characteristics.map(({ id, value, characteristic }) => {
        const title = characteristic.data.attributes.title;
        return (
          <li key={id} className={style.content}>
            <p className={style.title}>{title}</p>
            <p>{value}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default ProductAddInfoCharacteristics;
