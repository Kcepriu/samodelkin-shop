import { FC } from "react";
import Image from "next/image";
import FilterPanel from "@/components/FilterPanel/FilterPanel";
import style from "./HomeScreen.module.css";
import heroImage from "@/assets/hero.jpg";
// import TypeGames from "@/components/TypeGames/TypeGames";
import AboutUsSection from "@/components/AboutUsSection/AboutUsSection";
import SliderProducts from "@/components/SliderProducts/SliderProducts";
import Reviews from "@/components/Reviews/Reviews";
import RevisedProducts from "@/components/RevisedProducts/RevisedProducts";
import httpServices from "@/services/http";

interface IParams {
  params?: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const HomeScreen: FC<IParams> = async ({
  searchParams,
}): Promise<JSX.Element> => {
  const { category = "" } = searchParams;
  const categoryId = typeof category === "string" ? category : category[0];

  const responseProducts = await httpServices.getSalesLeaders();
  const responseReviews = await httpServices.getLastReviews();

  return (
    <>
      <div className={style.wrapHomePage}>
        <div className={style.wrapFilter}>
          <FilterPanel categoryId={categoryId} />
        </div>
        <div className={style.wrapContent}>
          <section>
            <Image
              className={style.imageHero}
              src={heroImage}
              alt="Hero image"
              width={924}
              height={511}
              priority
            />
          </section>

          {/* <section className={style.sectionTypeGames}>
          <TypeGames />
        </section> */}

          {responseProducts && responseProducts.data.length > 0 && (
            <section className={style.section}>
              <h2 className={style.titleSection}>Лідери продажу</h2>

              <div className={style.wrapSwiper}>
                <SliderProducts
                  productList={responseProducts.data}
                  slidesPerView={{ desktop: 3, tablet: 2, mobile: 1 }}
                />
              </div>
            </section>
          )}

          <section className={style.section}>
            <RevisedProducts />
          </section>

          {responseReviews && responseReviews.data.length > 0 && (
            <section className={style.section}>
              <h2 className={style.titleSection}>Відгуки</h2>
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

export default HomeScreen;
