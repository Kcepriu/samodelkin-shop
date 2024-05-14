import { FC } from "react";
import httpServices from "@/services/http";
import { TypeDescription } from "@/types/generalTypes/articles.type";
import Description from "@/components/Description/Description";
import { setSeo } from "@/helpers/setSeo";

export async function generateMetadata() {
  const response = await httpServices.getPageDeliveryAndPayment();
  const seo = setSeo(response?.data.attributes?.seo);
  return seo;
}

const PagePaymentDelivery: FC = async (): Promise<JSX.Element> => {
  const response = await httpServices.getPageDeliveryAndPayment();

  if (!response) return <></>;

  const content = response.data.attributes.content;

  return <Description content={content} />;
};

export default PagePaymentDelivery;
