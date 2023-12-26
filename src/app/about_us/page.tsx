import { FC } from "react";
import AboutUsSection from "@/components/AboutUsSection/AboutUsSection";
import { setSeo } from "@/helpers/setSeo";
import httpServices from "@/services/http";

export async function generateMetadata() {
  const responseAboutUs = await httpServices.getAboutUs();
  const seo = setSeo(responseAboutUs?.data.attributes?.seo);
  return seo;
}

const PageAboutUs: FC = () => {
  return <AboutUsSection isPage />;
};

export default PageAboutUs;
