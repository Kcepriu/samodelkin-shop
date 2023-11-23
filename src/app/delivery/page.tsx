import { FC } from "react";
import httpServices from "@/services/http";
import { TypeDescription } from "@/types/generalTypes/articles.type";
import GeneralInfoPage from "@/components/GeneralInfoPage/GeneralInfoPage";

const PagePaymentDelivery: FC = async (): Promise<JSX.Element> => {
  const response = await httpServices.getPageDeliveryAndPayment();

  if (!response) return <></>;

  const content = response.data.attributes.content;

  return (
    <GeneralInfoPage
      titlePage="Обмін і повернення"
      content={content}
      type={TypeDescription.GeneralPage}
      isPage
    />
  );
};

export default PagePaymentDelivery;
