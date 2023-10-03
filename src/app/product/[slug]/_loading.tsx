import { FC } from "react";
import ProductSkeleton from "@/components/ProductSkeleton/ProductSkeleton";

const Loading: FC = () => {
  // You can add any UI inside Loading, including a Skeleton.
  return <ProductSkeleton />;
};

export default Loading;
