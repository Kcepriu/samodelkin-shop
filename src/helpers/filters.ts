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
  idFilter: string,
  valueFilter: string
): IParams[] => {
  return filters.filter(
    ({ id, value }) => !(value === valueFilter && id === idFilter)
  );
};

export const addFilter = (
  filters: IParams[],
  idFilter: string,
  newValue: string
): IParams[] => {
  const newFilters = [...filters];
  newFilters.push({
    id: idFilter,
    value: newValue,
  });

  return newFilters;
};

export const addFilterToParamObj = (
  paramsObj: [string, string][],
  filters: string
) => {
  if (!filters) return;

  const currentFilters = parsingFiltersSearchParams(filters);

  currentFilters.map((element) =>
    paramsObj.push([
      `filters[characteristics][id_${element.id}]=`,
      element.value,
    ])
  );
};
