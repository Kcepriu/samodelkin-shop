"use client";
import { FC } from "react";
import { LuAlignLeft } from "react-icons/lu";
import useMobileMenu from "@/hooks/useMobileMenu";
import { useSearchParams } from "next/navigation";
import FilterCategories from "@/components/FilterCategories/FilterCategories";
import style from "./ButtonBurgerClient.module.css";

interface IProps {
  allCategories: ICategorie[];
}

const ButtonBurgerClient: FC<IProps> = ({ allCategories }) => {
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  const currentCategory = !!category ? category : "";

  const closeModal = () => {
    setShowMobileMenu(false);
  };

  const contentComponent = (
    <div className={style.wrapFilter}>
      <FilterCategories
        allCategories={allCategories}
        currentCategory={currentCategory}
        addAction={closeModal}
      />
    </div>
  );

  const { ModalMenuComponent, setShowMobileMenu } = useMobileMenu({
    contentComponent,
  });

  return (
    <>
      <button onClick={() => setShowMobileMenu(true)}>
        <LuAlignLeft size={40} />
      </button>
      {ModalMenuComponent}
    </>
  );
};

export default ButtonBurgerClient;
