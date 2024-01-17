import { FC } from "react";
import httpServices from "@/services/http";
import ButtonBurgerClient from "./ButtonBurgerClient/ButtonBurgerClient";

const ButtonBurger: FC = async (): Promise<JSX.Element> => {
  const responseCategories = await httpServices.getCategories();
  const allCategories = responseCategories ? responseCategories.data : [];

  return (
    <>
      <ButtonBurgerClient allCategories={allCategories} />
    </>
  );
};

export default ButtonBurger;
