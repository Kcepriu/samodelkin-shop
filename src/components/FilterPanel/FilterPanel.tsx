import { FC } from "react";
import httpServices from "@/services/http";
import FilterCategories from "../FilterCategories/FilterCategories";
import Filters from "../Filters/Filters";
import style from "./FilterPanel.module.css";

interface IProps {
  categoryId: string;
  showFilters: boolean;
  filters: IFilter[] | undefined;
}

const FilterPanel: FC<IProps> = async ({
  categoryId,
  showFilters = false,
  filters = undefined,
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
        {showFilters && <Filters filters={filters} />}
      </div>
    </>
  );
};

export default FilterPanel;
