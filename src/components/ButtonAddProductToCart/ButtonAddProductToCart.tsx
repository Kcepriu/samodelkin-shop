"use client";

import { FC } from "react";
import { BsCart3 } from "react-icons/bs";
import useCart from "@/stores/cart.store";
import useStore from "@/helpers/useStore";
import ButtonMain from "../ButtonMain/ButtonMain";
import useCartComponent from "@/hooks/useCartComponent";
import { defaultLanguage } from "@/constants/defaultValue.const";

import style from "./ButtonAddProductToCart.module.css";

interface IProps {
  product: IProduct;
  bigButton?: boolean;
}

const ButtonAddProductToCart: FC<IProps> = ({ product, bigButton }) => {
  const cart = useStore(useCart, (state) => state.products);
  const { CartComponent, setShowModal } = useCartComponent();

  const addOneProductToCart = useCart((state) => state.addOneProductToCart);

  const isInCart =
    cart?.some((element) => element.product.data.id === product.id) || false;

  const handleAddToCart = async () => {
    if (isInCart) {
      setShowModal(true);
      return;
    }

    await addOneProductToCart(
      product,
      product.attributes?.languages && product.attributes?.languages.length > 0
        ? product.attributes.languages[0]
        : defaultLanguage
    );
    setShowModal(true);
    return;
  };

  return (
    <>
      {!bigButton && (
        <button type="button" onClick={handleAddToCart}>
          <BsCart3 size={32} className={style.icon} data-in-cart={isInCart} />
        </button>
      )}

      {!!bigButton && (
        <ButtonMain text="Купити" handlerButton={handleAddToCart} />
      )}

      {CartComponent}
    </>
  );
};

export default ButtonAddProductToCart;
