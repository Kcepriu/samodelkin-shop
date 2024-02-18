"use client";

import { FC } from "react";
import IconComponent from "@/components/IconComponent/IconComponent";
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
  const foundFilter = currentFilters.find(
    (element) => element.id === filter.id
  );
  const currentFilter = foundFilter?.value || "";
  const { attributes } = filter;

  return (
    <>
      <h3 className={style.title}>
        <IconComponent iconName={attributes.icon} />
        {attributes.title}
      </h3>

      <form className={style.listFilters}>
        {attributes.value.map((element) => {
          return (
            <label key={element} className={style.elementFilter}>
              <input
                type="checkbox"
                className={style.checkbox}
                name={element}
                value={element}
                checked={currentFilter === element}
                data-is-active={currentFilter === element}
                onChange={() =>
                  handleClickFilter(
                    filter.id,
                    element,
                    currentFilter === element
                  )
                }
              />
              {element}
            </label>
          );
        })}
      </form>
    </>
  );
};

export default FilterList;
