import { FC } from "react";
import Image from "next/image";
import ImgNoImage from "@/assets/no_images.png";
import style from "./ChoiceDelivery.module.css";

interface IProps {
  activeDeliveryServicesId: number;
  deliveryServices: IDeliveryServices[];
  handleChoseDelivery: (deliveryServicesId: number) => void;
}

const ChoiceDelivery: FC<IProps> = ({
  activeDeliveryServicesId,
  deliveryServices,
  handleChoseDelivery,
}) => {
  return (
    <ul className={style.listDelivery}>
      {deliveryServices.map((delivery) => {
        const urlLogo =
          delivery?.attributes?.logo?.data?.attributes.url || ImgNoImage;
        return (
          <li
            key={delivery.id}
            className={style.logo}
            onClick={() => handleChoseDelivery(delivery.id)}
            data-active={delivery.id === activeDeliveryServicesId}
          >
            <Image
              // className={styles.image}
              src={urlLogo}
              alt={delivery?.attributes?.title || "Logo delivery"}
              height={0}
              width={80}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ChoiceDelivery;
