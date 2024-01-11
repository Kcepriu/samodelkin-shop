import { FC } from "react";
import httpServices from "@/services/http";
import ButtonBurgerClient from "./ButtonBurgerClient/ButtonBurgerClient";

interface IParams {
  categoryId: string;
}

const ButtonBurger: FC<IParams> = async ({
  categoryId,
}): Promise<JSX.Element> => {
  const responseCategories = await httpServices.getCategories();
  const allCategories = responseCategories ? responseCategories.data : [];

  return (
    <>
      <ButtonBurgerClient
        allCategories={allCategories}
        currentCategory={categoryId}
      />
    </>
  );
};

export default ButtonBurger;
