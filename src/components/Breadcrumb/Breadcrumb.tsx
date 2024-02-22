"use client";
import { FC } from "react";
import Link from "next/link";
import { Typography, Breadcrumbs } from "@mui/material";
import { FaHome } from "react-icons/fa";
import useBreadcrumb from "@/stores/breadcrumb.store";
import useStore from "@/helpers/useStore";
import style from "./Breadcrumb.module.css";

const Breadcrumb: FC = () => {
  const breadcrumb = useStore(useBreadcrumb, (state) => state.breadcrumb) || [];

  return (
    <div role="presentation" className={style.wrapBreadcrumbs}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link href="/">
          <FaHome sx={{ mr: 0.5 }} fontSize="inherit" />
        </Link>

        {breadcrumb.map((element, index, arr) => {
          return (
            <div key={element.url} className={style.wrapBreadcrumbs}>
              {!!element.url ? (
                <Link href={element.url} key={element.url}>
                  {element.title}
                </Link>
              ) : (
                <p key={element.url} className={style.lastEement}>
                  {element.title}
                </p>
              )}
            </div>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
