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
  const responseProduct = await httpServices.getOneProducts(slug);
  const responseSalesLeaders = await httpServices.getSalesLeaders();

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
          <h2 className={style.titleSection}>Лідери продажу</h2>

          <div className={style.wrapSwiper}>
            <SliderProducts
              productList={responseSalesLeaders.data}
              slidesPerView={{ desktop: 4, tablet: 2, mobile: 1 }}
            />
          </div>
        </section>
      )}
    </>
  );
};
export const revalidate = 60;

export default Layout;
