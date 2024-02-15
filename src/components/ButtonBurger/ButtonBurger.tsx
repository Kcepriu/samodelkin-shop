import { FC, Suspense } from "react";
import httpServices from "@/services/http";
import ButtonBurgerClient from "./ButtonBurgerClient/ButtonBurgerClient";

const ButtonBurger: FC = async (): Promise<JSX.Element> => {
  const responseCategories = await httpServices.getCategories();
  const allCategories = responseCategories ? responseCategories.data : [];
  const responseMainPage = await httpServices.getMainPage();

  return (
    <>
      <Suspense>
        <ButtonBurgerClient
          allCategories={allCategories}
          responseMainPage={responseMainPage}
        />
      </Suspense>
    </>
  );
};

export default ButtonBurger;
