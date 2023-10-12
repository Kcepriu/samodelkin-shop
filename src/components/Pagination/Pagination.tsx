"use client";

import { FC } from "react";
import ReactPaginate from "react-paginate";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import "./Pagination.css";

interface IParams {
  pageCount: number;
  forcePage: number;
}
const Pagination: FC<IParams> = ({ pageCount = 1, forcePage }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const objSearchParams = {} as ISearchParams;
  for (const [key, value] of searchParams) {
    objSearchParams[key] = value;
  }

  const handleClickPagination = ({ selected }: { selected: number }) => {
    const params = new URLSearchParams({
      ...objSearchParams,
      page: String(selected + 1),
    });

    if (selected === 0) params.delete("page");

    router.push(`${pathname}?${params}`);
  };

  return (
    <ReactPaginate
      className="react-paginate"
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handleClickPagination}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
      forcePage={forcePage - 1}
    />
  );
};

export default Pagination;
