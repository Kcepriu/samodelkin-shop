import { FC } from "react";
import style from "./ProductAddInfoCharacteristics.module.css";

interface IProps {
  product: IProduct;
}
const ProductAddInfoCharacteristics: FC<IProps> = ({ product }) => {
  const characteristics = product.attributes.characteristics;

  return (
    <ul className={style.wrapContent}>
      {characteristics.map((element) => {
        return (
          <li key={element.id} className={style.content}>
            <p className={style.title}>{element.title}</p>
            <p>{element.value}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default ProductAddInfoCharacteristics;
