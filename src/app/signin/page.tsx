import { FC, Suspense } from "react";
import Signin from "@/components/Signin/Signin";

function SearchBarFallback() {
  return <>placeholder</>;
}

const SignIn: FC = () => {
  return (
    <>
      <Suspense>
        <Signin />
      </Suspense>
    </>
  );
};

export default SignIn;
