import { FC } from "react";
import style from "./ProductInCart.module.css";

interface IProps {
  rowCart: ICartRow;
}
const ProductInCart: FC<IProps> = ({ rowCart }) => {
  return (
    <div className={style.wrapProduct}>
      <div className={style.wrapImage}>
        <p>Image</p>
      </div>
      <div className={style.wrapContent}>
        <h2> {rowCart.product.attributes.title}</h2>
        <div>
          <p> {rowCart.count}</p>
          <p> {rowCart.price}</p>
          <p> {rowCart.sum}</p>
          <button type="button">delete</button>
        </div>
      </div>
    </div>
  );
};

export default ProductInCart;
