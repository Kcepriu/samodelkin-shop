import { FC } from "react";
import ContactInformation from "@/components/Checkout/ContactInformation/ContactInformation";
import ProductsCheckout from "@/components/Checkout/ProductsCheckout/ProductsCheckout";
import httpServices from "@/services/http";
import style from "./pageCheckout.module.css";

const PageCheckout: FC = async () => {
  const deliveryServices = await httpServices.getDeliveryServices();
  return (
    <div className={style.wrapComponent}>
      <div className={style.wrapContactInformation}>
        <ContactInformation deliveryServices={deliveryServices} />
      </div>

      <div className={style.wrapProducts}>
        <ProductsCheckout />
      </div>
    </div>
  );
};

export default PageCheckout;
