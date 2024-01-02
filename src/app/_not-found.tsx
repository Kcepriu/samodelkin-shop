"use client";

import { FC, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import icon404 from "@/assets/404.svg";
import useOnPageNotFound from "@/stores/onPageNotFound.store";
import style from "./not-found.module.css";

const NotFound: FC = () => {
  const [setOnPageNotFound] = useOnPageNotFound((state) => [
    state.setOnPageNotFound,
  ]);

  // useEffect(() => {
  //   setOnPageNotFound(true);

  //   return () => {
  //     setOnPageNotFound(false);
  //   };
  // }, [setOnPageNotFound]);

  return (
    <section className={style.wrapContent}>
      <div className={style.wrapLeft}>
        <h1 className={style.title}>404</h1>
        <p className={style.text}>
          Упссс...щось пішло не так. Зараз кинемо кубики, аби дізнатися, що
          трапилося.
        </p>
        <Link href="/" className={style.button}>
          Повернутися на головну
        </Link>
      </div>

      <Image
        src={icon404}
        alt="Picture of the author"
        width={463}
        height={489}
      />
    </section>
  );
};

export default NotFound;
