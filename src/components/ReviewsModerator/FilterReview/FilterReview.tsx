"use client";
import { FC } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import {
  FRONTEND_ROUTES,
  ACCOUNT_ADD_INFORMATION_ROUTES,
} from "@/constants/app-keys.const";

import style from "./FilterReview.module.css";
const options = [
  {
    id: 1,
    name: "Всі відгуки",
  },
  {
    id: 2,
    name: "Деактивовані",
  },
];

const FilterReview: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const objSearchParams = {} as ISearchParams;

  for (const [key, value] of searchParams) {
    objSearchParams[key] = value;
  }

  const currentFilter = !!objSearchParams?.all_review ? "0" : "1";

  const handleChange = (event: SelectChangeEvent) => {
    const params = new URLSearchParams({
      ...objSearchParams,
      all_review: "true",
    });
    params.delete("page");

    if (event.target.value === "1") params.delete("all_review");
    router.push(
      `${FRONTEND_ROUTES.ACCOUNT}${ACCOUNT_ADD_INFORMATION_ROUTES.REVIEWS_MODERATOR}?${params}`
    );
  };

  return (
    <div className={style.wrapFilter}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 240 }}>
        <InputLabel id="select-filter-label">Фільтр</InputLabel>
        <Select
          labelId="select-filter-label"
          id="select-filter"
          value={currentFilter}
          onChange={handleChange}
          label="Filter"
        >
          <MenuItem value="1">Всі відгуки</MenuItem>
          <MenuItem value="0">Деактивовані відгуки</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterReview;
