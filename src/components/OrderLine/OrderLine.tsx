import { FC } from "react";
import Image from "next/image";
import ImgNoImage from "@/assets/no_images.png";
import { formatDateOrder } from "@/helpers/formatDateTime";
import { formatPrice } from "@/helpers/formatNumber";
import style from "./OrderLine.module.css";

interface IProps {
  order: IOrder;
}
const OrderLine: FC<IProps> = ({ order }) => {
  const { id, attributes } = order;
  const images = attributes.products[0].product.data.attributes.images?.data;
  const titleProduct = attributes.products[0].product.data.attributes.title;
  const urlImage =
    images && images.length === 1 ? images[0].attributes.url : ImgNoImage;

  return (
    <div className={style.wrapOrder}>
      <p>
        №{id} від {formatDateOrder(Date.parse(attributes.date))}
      </p>
      <div>
        <p className={style.titleSumma}>Сумма замовлення</p>
        <p>{formatPrice(attributes.totalSum)} ₴</p>
      </div>
      <Image src={urlImage} alt={titleProduct} width={64} height={60} />
    </div>
  );
};

export default OrderLine;
