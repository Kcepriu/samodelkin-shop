"use client";

import { FC, useRef, useState, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
// import { createPortal } from "react-dom";
import styles from "./MainLoader.module.css";

const MainLoader: FC = () => {
  return (
    <div className={styles.containerLoader}>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>
  );
};

// const MainLoader: FC = () => {
//   const ref = useRef<Element | null>(null);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     ref.current = document.querySelector<HTMLElement>("#modal-root");
//     setMounted(true);
//   }, []);

//   return mounted && ref.current ? (
//     createPortal(
//       <div className={styles.containerLoader}>
//         <ColorRing
//           visible={true}
//           height="80"
//           width="80"
//           ariaLabel="blocks-loading"
//           wrapperStyle={{}}
//           wrapperClass="blocks-wrapper"
//           colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
//         />
//       </div>,
//       ref.current
//     )
//   ) : (
//     <>...Loading</>
//   );
// };

export default MainLoader;
