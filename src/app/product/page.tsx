import { FC } from "react";
import ProductList from "@/components/ProductList/ProductList";
import Pagination from "@/components/Pagination/Pagination";
import FilterPanel from "@/components/FilterPanel/FilterPanel";
import CategoryDescription from "@/components/CategoryDescription/CategoryDescription";
import { setSeo } from "@/helpers/setSeo";
import httpServices from "@/services/http";
import style from "./pageProducts.module.css";

interface IParams {
  params?: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ searchParams }: IParams) {
  const { category = "" } = searchParams;
  const categoryId = typeof category === "string" ? category : category[0];
  const response = await httpServices.getCategory(categoryId);

  const valueSeo =
    !!response && response.data.length > 0
      ? response?.data[0].attributes?.seo
      : undefined;
  const seo = setSeo(valueSeo);
  return seo;
}

const Products: FC<IParams> = async ({
  searchParams,
}): Promise<JSX.Element> => {
  const { page = "1", category = "" } = searchParams;
  const categoryId = typeof category === "string" ? category : category[0];
  const currentPage = typeof page === "string" ? page : page[0];

  const responseProducts = await httpServices.getProducts({
    page: currentPage,
    category: categoryId,
  });

  const products =
    responseProducts && responseProducts.data.length > 0
      ? responseProducts.data
      : [];

  const pageCount = responseProducts?.meta?.pagination.pageCount || 1;

  return (
    <>
      {/* <BreadcrumbSetData
        isInProduct={false}
        category={!responseCategory ? null : responseCategory.data[0]}
      /> */}

      <section className={style.wrapPage}>
        <div className={style.wrapFilter}>
          <FilterPanel categoryId={categoryId} />
        </div>

        <div className={style.wrapContent}>
          {products.length > 0 && <ProductList productList={products} />}

          {pageCount > 1 && (
            <Pagination pageCount={pageCount} forcePage={Number(currentPage)} />
          )}
        </div>
      </section>

      <CategoryDescription categoryId={categoryId} />
    </>
  );
};

export const revalidate = 60;

export default Products;
