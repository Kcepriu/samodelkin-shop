import { FC } from "react";
import httpServices from "@/services/http";
import Description from "../Description/Description";
import style from "./CategoryDescription.module.css";

interface IProps {
  categoryId: string;
}

const CategoryDescription: FC<IProps> = async ({
  categoryId,
}): Promise<JSX.Element> => {
  const respCategoryDescription = await httpServices.getCategoryDescriptions(
    categoryId
  );

  if (!respCategoryDescription || respCategoryDescription.data.length === 0)
    return <></>;

  const CategoryDescription =
    respCategoryDescription.data[0].attributes.content;

  return (
    <section className={style.wrapSection}>
      <div className={style.wrapContent}>
        <Description content={CategoryDescription} />
      </div>
    </section>
  );
};

export default CategoryDescription;
