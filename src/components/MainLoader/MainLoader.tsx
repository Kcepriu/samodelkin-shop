"use client";

import { FC } from "react";
import { CirclesWithBar } from "react-loader-spinner";
import styles from "./MainLoader.module.css";

const MainLoader: FC = () => {
  return (
    <div className={styles.containerLoader}>
      <CirclesWithBar
        height="200"
        width="200"
        color="#4488ED"
        outerCircleColor="#4488ED"
        innerCircleColor="#243650"
        barColor="#4488ED"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default MainLoader;
