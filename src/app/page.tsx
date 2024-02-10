import { FC } from "react";
import Image from "next/image";
import FilterPanel from "@/components/FilterPanel/FilterPanel";
import heroImage from "@/assets/hero.jpg";
import AboutUsSection from "@/components/AboutUsSection/AboutUsSection";
import SliderProducts from "@/components/SliderProducts/SliderProducts";
import Reviews from "@/components/Reviews/Reviews";
import SliderReviews from "@/components/SliderReviews/SliderReviews";
import RevisedProducts from "@/components/RevisedProducts/RevisedProducts";
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
  const responseProducts = await httpServices.getSalesLeaders();
  const responseReviews = await httpServices.getLastReviews();
  const responseMainPage = await httpServices.getMainPage();

  const banner =
    !!responseMainPage && !!responseMainPage.data.attributes.banner.data
      ? responseMainPage.data.attributes.banner.data[0].attributes.url
      : heroImage;

  return (
    <>
      <div className={style.wrapHomePage}>
        <div className={style.wrapFilter}>
          <FilterPanel categoryId={""} showFilters={false} />
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

          {responseProducts && responseProducts.data.length > 0 && (
            <section className={style.section}>
              <h2 className={style.titleSection}>Лідери продажу</h2>

              <div className={style.wrapSwiper}>
                <SliderProducts
                  productList={responseProducts.data.slice(0, 3)}
                  slidesPerView={SLIDES_PER_VIEW}
                />
              </div>
            </section>
          )}

          <section className={style.section} data-is-slider={true}>
            <RevisedProducts />
          </section>

          {responseReviews && responseReviews.data.length > 0 && (
            <section className={style.section} data-selected={true}>
              <h2 className={style.titleSection} data-hidden-mobile={true}>
                Відгуки
              </h2>
              <div className={style.wrapReviewsSlider}>
                <SliderReviews reviews={responseReviews.data} />
              </div>
              <div className={style.wrapReviews}>
                <Reviews reviews={responseReviews.data} />
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
