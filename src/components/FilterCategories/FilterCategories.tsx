"use client";

import { FC } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FRONTEND_ROUTES } from "@/constants/app-keys.const";
import style from "./FilterCategories.module.css";

interface IProps {
  allCategories: ICategorie[];
  currentCategory: string;
  title: string;
  addAction?: () => void;
}
const FilterCategories: FC<IProps> = ({
  allCategories,
  currentCategory,
  title,
  addAction,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const objSearchParams = {} as ISearchParams;

  for (const [key, value] of searchParams) {
    objSearchParams[key] = value;
  }

  const handleOnClick = (category: string) => {
    const params = new URLSearchParams({
      ...objSearchParams,
      category,
    });

    params.delete("page");
    if (category === "") params.delete("category");

    if (!!addAction) addAction();

    router.push(`${FRONTEND_ROUTES.PRODUCT}/?${params}`);
  };

  return (
    <>
      <h2 className={style.titleCategory}>{title}</h2>
      <ul className={style.listCategory}>
        <li key="allCategories">
          <button
            className={style.buttonCategory}
            type="button"
            onClick={() => handleOnClick("")}
            data-active={
              currentCategory === "" && pathname === FRONTEND_ROUTES.PRODUCT
            }
          >
            Всі категорії
          </button>
        </li>
        {allCategories.map((elem) => {
          return (
            <li key={elem.id}>
              <button
                className={style.buttonCategory}
                type="button"
                onClick={() => handleOnClick(elem.attributes.slug)}
                data-active={
                  currentCategory === elem.attributes.slug &&
                  pathname === FRONTEND_ROUTES.PRODUCT
                }
              >
                {elem.attributes.title}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default FilterCategories;
