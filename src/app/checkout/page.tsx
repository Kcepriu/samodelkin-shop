import { FC } from "react";
import ContactInformation from "@/components/Checkout/ContactInformation/ContactInformation";
import ProductsCheckout from "@/components/Checkout/ProductsCheckout/ProductsCheckout";

import style from "./pageCheckout.module.css";

const PageCheckout: FC = () => {
  return (
    <div className={style.wrapComponent}>
      <div className={style.wrapContactInformation}>
        <ContactInformation />
      </div>

      <div className={style.wrapProducts}>
        <ProductsCheckout />
      </div>
    </div>
  );
};

export default PageCheckout;
