import { FC } from "react";
import httpServices from "@/services/http";
import Description from "../Description/Description";
import { TypeDescription } from "@/types/generalTypes/articles.type";
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
    <>
      <div className={style.wrapContent}>
        <Description
          content={CategoryDescription}
          type={TypeDescription.Category}
        />
      </div>
    </>
  );
};

export default CategoryDescription;
