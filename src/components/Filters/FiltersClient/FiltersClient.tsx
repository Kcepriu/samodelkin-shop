"use client";
import { FC } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import FilterPrice from "../FilterPrice/FilterPrice";
import FilterList from "../FilterList/FilterList";
import {
  parsingFiltersSearchParams,
  createFiltersSearchParams,
  deleteFilter,
  addFilter,
} from "@/helpers/filters";
import { FRONTEND_ROUTES } from "@/constants/app-keys.const";
import style from "./FiltersClient.module.css";

interface IProps {
  filters: IFilter[];
}
const FiltersClient: FC<IProps> = ({ filters }) => {
  console.log("🚀 ~ filters:", filters);
  const router = useRouter();

  const searchParams = useSearchParams();
  const textParamsFilter = searchParams.get("filters") || "";

  const currentFilters = parsingFiltersSearchParams(textParamsFilter);
  console.log("🚀 ~ currentFilters:", currentFilters);

  const objSearchParams = {} as ISearchParams;
  for (const [key, value] of searchParams) {
    objSearchParams[key] = value;
  }

  const handleClickFilter = (
    filterId: string,
    filterValue: string,
    isActiveFilter: boolean
  ) => {
    console.log("🚀 ~ isActiveFilter:", isActiveFilter);
    console.log("🚀 ~ filterValue:", filterValue);
    console.log("🚀 ~ filterId:", filterId);

    let newCurrentFilters = [...currentFilters];

    console.log("🚀 ~ 111111111");
    if (!isActiveFilter) {
      newCurrentFilters = addFilter(newCurrentFilters, filterId, filterValue);
    } else {
      newCurrentFilters = deleteFilter(currentFilters, filterId, filterValue);
    }

    console.log("🚀 ~ newCurrentFilters:", newCurrentFilters);

    const paramsFilter = createFiltersSearchParams(newCurrentFilters);

    const params = new URLSearchParams({
      ...objSearchParams,
      filters: paramsFilter,
    });

    params.delete("page");

    if (!paramsFilter) params.delete("filters");

    console.log("🚀 ~ paramsFilter:", params);

    router.push(`${FRONTEND_ROUTES.PRODUCTS}?${params}`);
  };

  return (
    <ul className={style.listFilters}>
      {filters.map((filter) => {
        if (filter.id === "price")
          return (
            <li key={filter.id} className={style.filter}>
              <FilterPrice
                filter={filter}
                currentFilters={currentFilters}
                handleClickFilter={handleClickFilter}
              />
            </li>
          );
        return (
          <li key={filter.id} className={style.filter}>
            <FilterList
              filter={filter}
              currentFilters={currentFilters}
              handleClickFilter={handleClickFilter}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default FiltersClient;
