"use client";
import { FC } from "react";
import Link from "next/link";
import { Typography, Breadcrumbs } from "@mui/material";
import { FaHome } from "react-icons/fa";
import useBreadcrumb from "@/stores/breadcrumb.store";
import useStore from "@/helpers/useStore";

const Breadcrumb: FC = () => {
  const breadcrumb = useStore(useBreadcrumb, (state) => state.breadcrumb) || [];

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link href="/">
          <FaHome sx={{ mr: 0.5 }} fontSize="inherit" />
        </Link>

        {breadcrumb.map((element, index, arr) => {
          return (
            <div key={element.url}>
              {!!element.url ? (
                <Link href={element.url} key={element.url}>
                  {element.title}
                </Link>
              ) : (
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  color="text.primary"
                  key={element.url}
                >
                  {element.title}
                </Typography>
              )}
            </div>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
