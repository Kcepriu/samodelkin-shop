"use client";
import { FC, useEffect } from "react";
import useRevised from "@/stores/revised.store";
import useStore from "@/helpers/useStore";

interface IProps {
  product: IProduct;
}

const AddToRevised: FC<IProps> = ({ product }) => {
  const revised = useStore(useRevised, (state) => state.revised);
  const addRevised = useRevised((state) => state.addRevised);

  useEffect(() => {
    const addToRevised = async () => {
      await addRevised(product);
    };
    
    if (!revised) return;

    const index = revised.findIndex((element) => element.id === product.id);

    if (index < 0) addToRevised();
  }, [addRevised, revised, product]);

  return <></>;
};

export default AddToRevised;
