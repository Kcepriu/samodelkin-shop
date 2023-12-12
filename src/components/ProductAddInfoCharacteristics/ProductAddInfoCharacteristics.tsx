import { FC } from "react";
import style from "./ProductAddInfoCharacteristics.module.css";

interface IProps {
  product: IProduct;
}
const ProductAddInfoCharacteristics: FC<IProps> = ({ product }) => {
  return (
    <div className={style.wrapContent}>
      <p>
        <span>countPlayers: </span>
        {product.attributes.countPlayers}
      </p>
      <p>
        <span>descrition: </span>
        {product.attributes.descrition}
      </p>
      <p>
        <span>price: </span>
        {product.attributes.price} ₴
      </p>
      <p>
        <span>available: </span>
        {product.attributes.available ? "Є в наявністі" : "Під замовлення"}
      </p>
      <p>
        <span>additions: </span>
        {product.attributes.additions ? "Додаток" : "Базовий набір"}
      </p>
    </div>
  );
};

export default ProductAddInfoCharacteristics;
