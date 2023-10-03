"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";

const NavigateToBack: FC = () => {
  const router = useRouter();

  const handleToBack = () => {
    router.back();
  };

  return <button onClick={handleToBack}>to back</button>;
};

export default NavigateToBack;
