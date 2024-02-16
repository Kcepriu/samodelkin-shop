import { FC, Suspense } from "react";
import FiltersClient from "./FiltersClient/FiltersClient";

interface IProps {
  filters: IFilter[] | undefined;
}

const Filters: FC<IProps> = async ({ filters = null }) => {
  return (
    <>
      {!!filters && filters.length > 0 && (
        <Suspense>
          <FiltersClient filters={filters} />
        </Suspense>
      )}
    </>
  );
};

export default Filters;
