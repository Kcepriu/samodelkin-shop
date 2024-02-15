import { FC, Suspense } from "react";
import httpServices from "@/services/http";
import FiltersClient from "./FiltersClient/FiltersClient";

interface IProps {
  categoryId: string;
}

const Filters: FC<IProps> = async ({ categoryId }) => {
  const responseFilters = await httpServices.getFilters(categoryId);

  return (
    <>
      {!!responseFilters && responseFilters?.data.length > 0 && (
        <Suspense>
          <FiltersClient filters={responseFilters.data} />
        </Suspense>
      )}
    </>
  );
};

export default Filters;
