import { FC, ReactNode } from "react";
import { notFound } from "next/navigation";
import Product from "@/components/Product/Product";
import SliderProducts from "@/components/SliderProducts/SliderProducts";
import httpServices from "@/services/http";
import BreadcrumbSetData from "@/components/Breadcrumb/BreadcrumbSetData";
import { setSeo } from "@/helpers/setSeo";
import style from "./layoutProduct.module.css";

interface IProps {
  children: ReactNode;
  params: { slug: string };
}

export async function generateMetadata({ params }: IProps) {
  const { slug } = params;
  const responseProduct = await httpServices.getOneProducts(slug);

  const valueSeo =
    responseProduct && responseProduct.data.length > 0
      ? responseProduct.data[0].attributes?.seo
      : undefined;
  const seo = setSeo(valueSeo);
  return seo;
}

const Layout: FC<IProps> = async ({
  children,
  params,
}): Promise<JSX.Element> => {
  const { slug } = params;
  const responseProduct = await httpServices.getOneProducts(slug);

  if (!responseProduct?.data.length) notFound();

  const responseSalesLeaders = await httpServices.getSalesLeaders();
  const productId = responseProduct?.data[0].id || 0;
  const responseInfoProductReview = await httpServices.getInfoProductReview(
    String(productId)
  );
  const category = responseProduct?.data[0].attributes.categories;

  const { count: countReview, avg: rating } = responseInfoProductReview?.data[0]
    .attributes || { count: 0, avg: 0 };

  return (
    <>
      <BreadcrumbSetData
        isInProduct={true}
        category={!category ? null : category.data[0]}
      />
      <section>
        {responseProduct && responseProduct.data.length > 0 && (
          <Product
            product={responseProduct.data[0]}
            rating={rating}
            countReview={countReview}
          />
        )}
      </section>
      {children}
      {responseSalesLeaders && responseSalesLeaders.data.length > 0 && (
        <section className={style.sectionSliderProducts}>
          <h2 className={style.titleSection}>Лідери продажу</h2>

          <div className={style.wrapSwiper}>
            <SliderProducts
              productList={responseSalesLeaders.data}
              slidesPerView={{ desktop: 4, tablet: 2, mobile: 2 }}
            />
          </div>
        </section>
      )}
    </>
  );
};
export const revalidate = 60;

export default Layout;
