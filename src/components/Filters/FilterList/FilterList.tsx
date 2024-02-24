"use client";

import { FC } from "react";
import IconComponent from "@/components/IconComponent/IconComponent";
import { getNameLanguage } from "@/helpers/getImageFlag";
import { TypeLanguage } from "@/types/generalTypes/language.type";
import style from "./FilterList.module.css";

interface IProps {
  filter: IFilter;
  currentFilters: {
    id: string;
    value: string;
  }[];

  handleClickFilter: (
    filterId: string,
    filterValue: string,
    isActiveFilter: boolean
  ) => void;
}

const FilterList: FC<IProps> = ({
  filter,
  currentFilters,
  handleClickFilter,
}) => {
  const valuesCurrentFilter = currentFilters
    .filter((element) => element.id === filter.id)
    .map((element) => element.value);

  const { attributes } = filter;

  return (
    <>
      <h3 className={style.title}>
        <IconComponent iconName={attributes.icon} />
        {attributes.title}
      </h3>

      <form className={style.listFilters}>
        {attributes.value.map((element) => {
          const inCurrentFilter = !!valuesCurrentFilter.find(
            (value) => value === element
          );

          return (
            <label key={element} className={style.elementFilter}>
              <input
                type="checkbox"
                className={style.checkbox}
                name={element}
                value={element}
                checked={inCurrentFilter}
                data-is-active={inCurrentFilter}
                onChange={() =>
                  handleClickFilter(filter.id, element, inCurrentFilter)
                }
              />
              {filter.id !== "language"
                ? element
                : getNameLanguage(element as TypeLanguage)}
            </label>
          );
        })}
      </form>
    </>
  );
};

export default FilterList;
