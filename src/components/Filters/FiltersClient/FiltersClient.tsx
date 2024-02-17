"use client";
import { FC } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import FilterPrice from "../FilterPrice/FilterPrice";
import FilterList from "../FilterList/FilterList";
import {
  parsingFiltersSearchParams,
  createFiltersSearchParams,
  deleteFilter,
  replaceFilter,
} from "@/helpers/filters";
import { FRONTEND_ROUTES } from "@/constants/app-keys.const";
import style from "./FiltersClient.module.css";

interface IProps {
  filters: IFilter[];
}
const FiltersClient: FC<IProps> = ({ filters }) => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const textParamsFilter = searchParams.get("filters") || "";
  const currentFilters = parsingFiltersSearchParams(textParamsFilter);

  const objSearchParams = {} as ISearchParams;
  for (const [key, value] of searchParams) {
    objSearchParams[key] = value;
  }

  const handleClickFilter = (
    filterId: string,
    filterValue: string,
    isActiveFilter: boolean
  ) => {
    let newCurrentFilters = deleteFilter(currentFilters, filterId);

    if (!isActiveFilter)
      newCurrentFilters = replaceFilter(
        newCurrentFilters,
        filterId,
        filterValue
      );

    const paramsFilter = createFiltersSearchParams(newCurrentFilters);

    const params = new URLSearchParams({
      ...objSearchParams,
      filters: paramsFilter,
    });

    params.delete("page");
    if (!paramsFilter) params.delete("filters");

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
