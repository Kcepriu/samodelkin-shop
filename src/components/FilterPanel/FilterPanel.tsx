import { FC } from "react";
import httpServices from "@/services/http";
import FilterCategories from "../FilterCategories/FilterCategories";

interface IParams {
  categoryId: string;
}

const FilterPanel: FC<IParams> = async ({
  categoryId,
}): Promise<JSX.Element> => {
  const responseCategories = await httpServices.getCategories();
  const allCategories = responseCategories ? responseCategories.data : [];

  return (
    <>
      <FilterCategories
        allCategories={allCategories}
        currentCategory={categoryId}
      />
    </>
  );
};

export default FilterPanel;
