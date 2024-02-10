import { FC } from "react";
import httpServices from "@/services/http";
import FilterCategories from "../FilterCategories/FilterCategories";
import Filters from "../Filters/Filters";
import style from "./FilterPanel.module.css";

interface IProps {
  categoryId: string;
  showFilters: boolean;
}

const FilterPanel: FC<IProps> = async ({
  categoryId,
  showFilters = false,
}): Promise<JSX.Element> => {
  const responseCategories = await httpServices.getCategories();
  const allCategories = responseCategories ? responseCategories.data : [];

  return (
    <>
      <FilterCategories
        allCategories={allCategories}
        currentCategory={categoryId}
        title="Класифікація"
      />
      <div className={style.wrapFilters}>
        {showFilters && <Filters categoryId={categoryId} />}
      </div>
    </>
  );
};

export default FilterPanel;
