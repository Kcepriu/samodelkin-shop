import { FC } from "react";
import Link from "next/link";
import httpServices from "@/services/http";
import { FRONTEND_ROUTES } from "@/constants/app-keys.const";
import style from "./TypeGames.module.css";

const TypeGames: FC = async (): Promise<JSX.Element> => {
  const responseCategories = await httpServices.getCategories();
  const allCategories = responseCategories ? responseCategories.data : [];

  return (
    <ul className={style.listTypeGames}>
      <li key="allCategories" className={style.elementTypeGames}>
        <Link className={style.link} href={FRONTEND_ROUTES.PRODUCT}>
          Всі категорії
        </Link>
      </li>
      {allCategories.map((elem) => {
        return (
          <li key={elem.id} className={style.elementTypeGames}>
            <Link
              className={style.link}
              href={`${FRONTEND_ROUTES.PRODUCT}/?category=${elem.attributes.slug}`}
            >
              {elem.attributes.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default TypeGames;
