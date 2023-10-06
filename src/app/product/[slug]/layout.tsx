import { FC, ReactNode } from "react";
import Product from "@/components/Product/Product";
import SliderProducts from "@/components/SliderProducts/SliderProducts";
import httpServices from "@/services/http";
import style from "./page.module.css";

interface IProps {
  children: ReactNode;
  params: { slug: string };
}
const Layout: FC<IProps> = async ({
  children,
  params,
}): Promise<JSX.Element> => {
  const { slug } = params;
  const responseProduct = await httpServices.getOneProducts(slug, {
    cache: "no-store",
  });
  const responseSalesLeaders = await httpServices.getSalesLeaders();

  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <section>
        {responseProduct && responseProduct.data.length > 0 && (
          <Product product={responseProduct.data[0]} />
        )}
      </section>

      {children}

      {responseSalesLeaders && responseSalesLeaders.data.length > 0 && (
        <section className={style.sectionSliderProducts}>
          <h2>Лідери продажу</h2>
          <div className={style.wrapSwiper}></div>
          <SliderProducts
            productList={responseSalesLeaders.data}
            slidesPerView={{ desktop: 4, tablet: 2, mobile: 1 }}
          />
        </section>
      )}
    </>
  );
};

export default Layout;
