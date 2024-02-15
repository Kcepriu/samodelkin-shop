interface IParams {
  id: string;
  value: string;
}

export const parsingFiltersSearchParams = (
  textParamsFilter: string
): IParams[] => {
  if (!textParamsFilter) return [];

  const result = textParamsFilter.split(";").map((params) => {
    const [id, value] = params.split(":");
    return {
      id,
      value,
    };
  });

  return result;
};

export const createFiltersSearchParams = (filters: IParams[]): string => {
  return filters.map(({ id, value }) => `${id}:${value}`).join(";");
};

export const deleteFilter = (
  filters: IParams[],
  idFilter: string
): IParams[] => {
  return filters.filter(({ id }) => id !== idFilter);
};

export const replaceFilter = (
  filters: IParams[],
  idFilter: string,
  newValue: string
): IParams[] => {
  const newFilters = deleteFilter(filters, idFilter);
  newFilters.push({
    id: idFilter,
    value: newValue,
  });

  return newFilters;
};

export const addFilterToParamObj = (
  paramsObj: { [key: string]: string },
  filters: string
) => {
  if (!filters) return;
  const currentFilters = parsingFiltersSearchParams(filters);

  currentFilters.map(
    (element) =>
      (paramsObj[`filters[characteristics][id_${element.id}]=`] = element.value)
  );
};
