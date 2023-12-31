"use client";

import { useState, useMemo, useEffect, FocusEvent, FC } from "react";
import { Box, TextField, Autocomplete, Grid } from "@mui/material";
import { debounce } from "@mui/material/utils";
import { searchCityNP, searchWarehouses } from "@/services/serverActionHttp";

interface IDeliveryCity {
  name: string;
  id: string;
}

interface IDeliveryCityWarehouse {
  name: string;
  id: string;
}
interface IProps {
  city: string;
  idCity: string;
  postOffice: string;
  idPostOffice: string;
  handleSetCity: (city: string, idCity: string) => void;
  handleSetWarehouse: (postOffice: string, idPostOffice: string) => void;
  handleBlur: (e: FocusEvent<any>) => void;
  touched: { [field: string]: boolean };
  errors: { [field: string]: string };
}

const AddressDeliveryService: FC<IProps> = ({
  city,
  idCity,
  postOffice,
  idPostOffice,
  handleSetCity,
  handleSetWarehouse,
  handleBlur,
  touched,
  errors,
  ...props
}) => {
  const [value, setValue] = useState<IDeliveryCity | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<readonly IDeliveryCity[]>([]);

  const [valueWarehouse, setValueWarehouse] =
    useState<IDeliveryCityWarehouse | null>(null);
  const [inputValueWarehouse, setInputValueWarehouse] = useState("");
  const [optionsWarehouse, setOptionsWarehouse] = useState<
    readonly IDeliveryCityWarehouse[]
  >([]);

  const fetch = useMemo(
    () =>
      debounce(
        async (
          input: string,
          callback: (results?: readonly IDeliveryCity[]) => void
        ) => {
          const response = await searchCityNP(input);

          if (!response || !response.success) {
            callback([]);
            return;
          }
          const result = response.data[0].Addresses.map((city) => {
            return {
              name: city.Present,
              id: city.DeliveryCity,
            };
          });

          callback(result);
        },
        400
      ),
    []
  );

  const fetchWarehouse = useMemo(
    () =>
      debounce(
        async (
          idCity: string,
          searchText: string,
          callback: (results?: readonly IDeliveryCityWarehouse[]) => void
        ) => {
          const response = await searchWarehouses(idCity, searchText);

          if (!response || !response.success) {
            callback([]);
            return;
          }
          const result = response.data.map((warehouse) => {
            return {
              name: warehouse.Description,
              id: warehouse.Ref,
            };
          });

          callback(result);
        },
        400
      ),
    []
  );

  useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch(inputValue, (results?: readonly IDeliveryCity[]) => {
      if (active) {
        let newOptions: readonly IDeliveryCity[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  useEffect(() => {
    let active = true;

    if (!value) {
      setOptionsWarehouse([]);
      return undefined;
    }

    fetchWarehouse(
      value.id,
      inputValueWarehouse,
      (results?: readonly IDeliveryCityWarehouse[]) => {
        if (active) {
          let newOptions: readonly IDeliveryCityWarehouse[] = [];

          if (valueWarehouse) {
            newOptions = [valueWarehouse];
          }

          if (results) {
            newOptions = [...newOptions, ...results];
          }

          setOptionsWarehouse(newOptions);
        }
      }
    );

    return () => {
      active = false;
    };
  }, [value, valueWarehouse, inputValueWarehouse, fetchWarehouse]);

  useEffect(() => {
    setValue({
      name: city,
      id: idCity,
    });
  }, [city, idCity]);

  useEffect(() => {
    setValueWarehouse({
      name: postOffice,
      id: idPostOffice,
    });
  }, [postOffice, idPostOffice]);

  return (
    <>
      <Autocomplete
        id="delivery_city_np"
        sx={{ width: "100%" }}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.name
        }
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={value}
        noOptionsText="Місто доставки"
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(event: any, newValue: IDeliveryCity | null) => {
          setOptions(newValue ? [newValue, ...options] : options);
          // here city was changed. Need fetch new warehouses
          setOptionsWarehouse([]);
          handleSetCity(newValue?.name || "", newValue?.id || "");
          handleSetWarehouse("", "");
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Місто доставки"
            fullWidth
            onBlur={handleBlur}
            error={touched.city && Boolean(errors.city)}
            helperText={touched.city && errors.city}
          />
        )}
        renderOption={(props, option) => {
          return (
            <li {...props}>
              <Grid container alignItems="center">
                <Grid
                  item
                  sx={{ width: "calc(100% - 20px)", wordWrap: "break-word" }}
                >
                  <Box component="span" sx={{ fontWeight: "regular" }}>
                    {option.name}
                  </Box>
                </Grid>
              </Grid>
            </li>
          );
        }}
      />

      <Autocomplete
        id="delivery_warehouses_np"
        sx={{ width: "100%" }}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.name
        }
        filterOptions={(x) => x}
        options={optionsWarehouse}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={valueWarehouse}
        noOptionsText="Відділення"
        isOptionEqualToValue={(option, value) =>
          !!value && !!option && option.id === value.id
        }
        onChange={(event: any, newValue: IDeliveryCityWarehouse | null) => {
          setOptionsWarehouse(
            newValue ? [newValue, ...optionsWarehouse] : [optionsWarehouse[0]]
          );
          handleSetWarehouse(newValue?.name || "", newValue?.id || "");
        }}
        onInputChange={(event, newInputValue) => {
          setInputValueWarehouse(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Відділення"
            onBlur={handleBlur}
            error={touched.postOffice && Boolean(errors.postOffice)}
            helperText={touched.postOffice && errors.postOffice}
            fullWidth
          />
        )}
        renderOption={(props, option) => {
          return (
            <li {...props}>
              <Grid container alignItems="center">
                <Grid
                  item
                  sx={{ width: "calc(100% - 20px)", wordWrap: "break-word" }}
                >
                  <Box component="span" sx={{ fontWeight: "regular" }}>
                    {option.name}
                  </Box>
                </Grid>
              </Grid>
            </li>
          );
        }}
      />
    </>
  );
};

export default AddressDeliveryService;
