import { FC } from "react";
import Image from "next/image";
import FilterPanel from "@/components/FilterPanel/FilterPanel";
import heroImage from "@/assets/hero.jpg";
import AboutUsSection from "@/components/AboutUsSection/AboutUsSection";
import SliderProducts from "@/components/SliderProducts/SliderProducts";
import Reviews from "@/components/Reviews/Reviews";
import SliderReviews from "@/components/SliderReviews/SliderReviews";
import RevisedProducts from "@/components/RevisedProducts/RevisedProducts";
import ProductList from "@/components/ProductList/ProductList";
import ProductListLoadMore from "@/components/ProductListLoadMore/ProductListLoadMore";
import ButtonOpenMobileFilters from "@/components/ButtonOpenMobileFilters/ButtonOpenMobileFilters";
import httpServices from "@/services/http";
import { setSeo } from "@/helpers/setSeo";
import { SLIDES_PER_VIEW } from "@/constants/app-keys.const";
import style from "./pageHome.module.css";

interface IParams {
  params?: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata() {
  const responseMainPage = await httpServices.getMainPage();
  const seo = setSeo(responseMainPage?.data.attributes?.seo);
  return seo;
}

const App: FC<IParams> = async ({ searchParams }): Promise<JSX.Element> => {
  const responseSalesLeaders = await httpServices.getSalesLeaders();
  const responseReviews = await httpServices.getLastReviews();
  const responseMainPage = await httpServices.getMainPage();
  const responseFilters = await httpServices.getFilters("");
  const responseProducts = await httpServices.getProducts({});

  const banner =
    !!responseMainPage && !!responseMainPage.data.attributes.banner.data
      ? responseMainPage.data.attributes.banner.data[0].attributes.url
      : heroImage;

  const paginationProducts = responseProducts?.meta?.pagination;

  const products =
    responseProducts && responseProducts.data.length > 0
      ? responseProducts.data
      : [];

  const pageCount = responseProducts?.meta?.pagination.pageCount || 1;

  return (
    <>
      <div className={style.wrapHomePage}>
        <div className={style.wrapFilter}>
          <FilterPanel
            categoryId={""}
            showFilters={true}
            filters={responseFilters?.data}
          />
        </div>
        <div className={style.wrapContent}>
          <section>
            <Image
              className={style.imageHero}
              src={banner}
              alt="Hero image"
              width={924}
              height={511}
              priority
            />
          </section>

          {products.length > 0 && (
            <section className={style.section}>
              <div className={style.wrapButtonFilters}>
                {!!responseFilters && responseFilters.data.length > 0 && (
                  <ButtonOpenMobileFilters filters={responseFilters?.data} />
                )}
              </div>

              <ProductList productList={products} />

              {pageCount > 1 && (
                <div className={style.wrapLoadMore}>
                  <ProductListLoadMore
                    categoryId=""
                    paginationProducts={paginationProducts}
                    filters=""
                  />
                </div>
              )}
            </section>
          )}

          {responseSalesLeaders && responseSalesLeaders.data.length > 0 && (
            <section className={style.section} data-is-slider>
              <h2 className={style.titleSection}>Лідери продажу</h2>

              <div className={style.wrapSwiper}>
                <SliderProducts
                  productList={responseSalesLeaders.data.slice(0, 4)}
                  slidesPerView={SLIDES_PER_VIEW}
                />
              </div>
            </section>
          )}

          <section className={style.section} data-is-slider>
            <RevisedProducts />
          </section>

          {responseReviews && responseReviews.data.length > 0 && (
            <section className={style.section} data-selected>
              <h2 className={style.titleSection} data-hidden-mobile>
                Відгуки
              </h2>
              <div className={style.wrapReviewsSlider}>
                <SliderReviews
                  reviews={responseReviews.data}
                  showReply={false}
                />
              </div>
              <div className={style.wrapReviews}>
                <Reviews reviews={responseReviews.data} showReply={false} />
              </div>
            </section>
          )}
        </div>
      </div>
      <section className={style.section}>
        <AboutUsSection />
      </section>
    </>
  );
};

export default App;
