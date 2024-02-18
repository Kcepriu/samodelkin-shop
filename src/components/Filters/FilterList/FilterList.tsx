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
      <ul className={style.listFilters}>
        {attributes.value.map((element) => {
          return (
            <li key={element} className={style.elementFilter}>
              <button
                type="button"
                data-is-active={currentFilter === element}
                className={style.buttonFilter}
                onClick={() =>
                  handleClickFilter(
                    filter.id,
                    element,
                    currentFilter === element
                  )
                }
              >
                {element}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default FilterList;
