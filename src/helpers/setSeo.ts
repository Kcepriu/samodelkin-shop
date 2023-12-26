import { DefaultValueSeo } from "@/constants/seo.const";

export const setSeo = (value: ISeo | undefined) => {
  const keywords = !!value?.keywords ? value.keywords.split("\n") : [];
  return {
    title: !!value?.metaTitle ? value.metaTitle : DefaultValueSeo.title,
    description: !!value?.metaDescription
      ? value.metaDescription
      : DefaultValueSeo.description,
    keywords,
  };
};
