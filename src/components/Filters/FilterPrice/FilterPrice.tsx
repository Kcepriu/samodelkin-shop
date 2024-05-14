"use client";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import Image from "next/image";
import Slider from "@mui/material/Slider";
import { formatPrice } from "@/helpers/formatNumber";
import scale from "@/assets/scale.svg";
import style from "./FilterPrice.module.css";

interface IProps {
  filter: IFilter;
  currentFilters: {
    id: string;
    value: string;
  }[];
  handleClickFilter: (
    filterId: string,
    filterValue: string,
    isActiveFilter: boolean
  ) => void;
}

const FilterPrice: FC<IProps> = ({
  filter,
  currentFilters,
  handleClickFilter,
}) => {
  const [valueFilter, setValueFilter] = useState(0);

  const { attributes } = filter;

  const foundFilter = currentFilters.find(
    (element) => element.id === filter.id
  );

  const currentFilter = Number(foundFilter?.value || attributes.value[0]);

  useEffect(() => {
    setValueFilter(currentFilter);
  }, [currentFilter]);

  if (attributes.value.length === 0) return <></>;

  const maxPrice = Number(attributes.value[0]);

  function valuetext(value: number) {
    return `₴${formatPrice(value)}`;
  }

  function valueLabelFormat(value: number) {
    return `₴${formatPrice(value)}`;
  }

  const onChangeCommitted = (
    event: Event | SyntheticEvent<Element, Event>,
    value: number | number[]
  ) => {
    const newValue = Array.isArray(value) ? value[0] : value;

    handleClickFilter(filter.id, String(newValue), newValue === maxPrice);
  };

  const onChange = (event: Event, value: number | number[]) => {
    const newValue = Array.isArray(value) ? value[0] : value;
    setValueFilter(newValue);
  };

  return (
    <div className={style.wrapSlider}>
      <Slider
        aria-label="Filter price"
        value={valueFilter}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valuetext}
        min={0}
        max={maxPrice}
        valueLabelDisplay="on"
        onChangeCommitted={onChangeCommitted}
        onChange={onChange}
        sx={{
          height: "10px",
          color: "#D8E6FB",

          "& .MuiSlider-valueLabelOpen": {
            color: "#161718",
            fontSize: "12px",
            fontFamily: "Inter",
            fontWeight: "500",
            lineHeight: "2",
            backgroundColor: "#D8E6FB",
            borderRadius: "8px",
            padding: "0 5px",
          },

          "& .MuiSlider-rail": {
            backgroundColor: "#F0F0F0",
          },

          "& .MuiSlider-thumb": {
            border: "3px solid #D8E6FB",
            backgroundColor: "#F0F0F0",
          },
        }}
      />

      <Image
        src={scale}
        alt="Scale"
        className={style.image}
        width={292}
        // height={489}
      />
      <div className={style.wrapDescribe}>
        <p>{`₴0`}</p>
        <p>{`₴${formatPrice(maxPrice)}`}</p>
      </div>
    </div>
  );
};

export default FilterPrice;
