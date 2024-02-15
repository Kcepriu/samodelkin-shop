import { FC, Suspense } from "react";
import ProductList from "@/components/ProductList/ProductList";
import Pagination from "@/components/Pagination/Pagination";
import FilterPanel from "@/components/FilterPanel/FilterPanel";
import CategoryDescription from "@/components/CategoryDescription/CategoryDescription";
import BreadcrumbSetData from "@/components/Breadcrumb/BreadcrumbSetData";
import ProductListLoadMore from "@/components/ProductListLoadMore/ProductListLoadMore";
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
  const { page = "1", category = "", filters = "" } = searchParams;
  const categoryId = typeof category === "string" ? category : category[0];
  const currentPage = typeof page === "string" ? page : page[0];
  const currentCategory = await httpServices.getCategory(categoryId);

  const responseProducts = await httpServices.getProducts({
    page: currentPage,
    category: categoryId,
    filters: typeof filters === "string" ? filters : filters[0],
  });

  const paginationProducts = responseProducts?.meta?.pagination;

  const products =
    responseProducts && responseProducts.data.length > 0
      ? responseProducts.data
      : [];

  const pageCount = responseProducts?.meta?.pagination.pageCount || 1;

  return (
    <>
      <BreadcrumbSetData
        isInProduct={false}
        category={
          !!currentCategory && currentCategory.data
            ? currentCategory.data[0]
            : null
        }
      />

      <section className={style.wrapPage}>
        <div className={style.wrapFilter}>
          <FilterPanel categoryId={categoryId} showFilters={true} />
        </div>

        <div className={style.wrapContent}>
          {products.length > 0 && <ProductList productList={products} />}

          {pageCount > 1 && (
            <>
              <div className={style.wrapPagination}>
                <Suspense>
                  <Pagination
                    pageCount={pageCount}
                    forcePage={Number(currentPage)}
                  />
                </Suspense>
              </div>
              <div className={style.wrapLoadMore}>
                <ProductListLoadMore
                  categoryId={categoryId}
                  paginationProducts={paginationProducts}
                  filters={typeof filters === "string" ? filters : filters[0]}
                />
              </div>
            </>
          )}
        </div>
      </section>

      <CategoryDescription categoryId={categoryId} />
    </>
  );
};

export const revalidate = 60;

export default Products;
