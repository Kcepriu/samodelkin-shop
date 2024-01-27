import { FC } from "react";
import Signin from "@/components/Signin/Signin";

function SearchBarFallback() {
  return <>placeholder</>;
}

const SignIn: FC = () => {
  return (
    <>
      <Signin />
    </>
  );
};

export default SignIn;
