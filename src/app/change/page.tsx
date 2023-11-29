import { FC } from "react";
import httpServices from "@/services/http";
import { TypeDescription } from "@/types/generalTypes/articles.type";
import GeneralInfoPage from "@/components/GeneralInfoPage/GeneralInfoPage";

const PageChangeAndReturn: FC = async (): Promise<JSX.Element> => {
  const response = await httpServices.getPageChangeAndReturn();

  if (!response) return <></>;

  const content = response.data.attributes.content;

  return (
    <GeneralInfoPage
      titlePage="Доставка і оплата"
      content={content}
      type={TypeDescription.GeneralPage}
      isPage
    />
  );
};

export default PageChangeAndReturn;
