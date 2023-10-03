import { useState, useCallback, ChangeEvent, useEffect } from "react";
import { cities } from "@/constants/deliveryCities";
import styles from "./SearchCity.module.css";
import { useDebouncedCallback } from "use-debounce";
import apiNovaPoshta from "@/services/apiNovaPoshta";

const URL = "https://api.novaposhta.ua/v2.0/json/";

async function getData(nameCity: string) {
  const res = await fetch(URL, {
    method: "POST",
    // body: JSON.stringify(apiNovaPoshta.getRequestSearchCity(nameCity)),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const SearchCity = () => {
  const [search, setSearch] = useState("");

  // const sendRequest = (value: string) => {
  //   console.log(`Sending request for: ${value}`);

  // };

  const debouncedChangeCity = useDebouncedCallback((value) => {
    console.log("😋", value);
    getData(value);
  }, 1000);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newSearch = e.target.value;
    setSearch(newSearch);

    if (newSearch.length >= 3) {
      debouncedChangeCity(newSearch);
    }
  };

  return (
    <div>
      <p className={styles.title}>Виберіть своє місто:</p>
      <ul className={styles.cityList}>
        {cities.map((city) => (
          <li key={city}>
            <span className="group relative inline-block cursor-pointer text-xs text-indigo-700">
              {city}
              <span className="absolute w-0 h-px bg-indigo-700 group-hover:w-full transition-all duration-300 left-0 bottom-0"></span>
            </span>
          </li>
        ))}
      </ul>

      <input
        className={styles.input}
        type="text"
        value={search}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchCity;
