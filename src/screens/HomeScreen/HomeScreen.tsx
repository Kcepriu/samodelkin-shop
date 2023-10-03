import { FC } from "react";
import Image from "next/image";
import FilterPanel from "@/components/FilterPanel/FilterPanel";
import style from "./HomeScreen.module.css";
import heroImage from "@/assets/hero.jpg";
// import TypeGames from "@/components/TypeGames/TypeGames";
import AboutUsSection from "@/components/AboutUsSection/AboutUsSection";
import SliderProducts from "@/components/SliderProducts/SliderProducts";
import httpServices from "@/services/http";

interface IParams {
  params?: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const HomeScreen: FC<IParams> = async ({
  searchParams,
}): Promise<JSX.Element> => {
  const responseProducts = await httpServices.getSalesLeaders();

  return (
    <>
      <div className={style.wrapHomePage}>
        <div className={style.wrapFilter}>
          <FilterPanel searchParams={searchParams} />
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
              <h2>Лідери продажу</h2>
              <SliderProducts productList={responseProducts.data} />
            </section>
          )}

          {responseProducts && responseProducts.data.length > 0 && (
            <section className={style.section}>
              <h2>Переглянуті</h2>
              <SliderProducts productList={responseProducts.data} />
            </section>
          )}

          <section className={style.section}>
            <h2>Відгуки</h2>
            <p>Reviews.</p>
          </section>
        </div>
      </div>
      <section className={style.section}>
        <AboutUsSection />
      </section>
    </>
  );
};

export default HomeScreen;
