"use client";
import { FC } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

import Image from "next/image";
import logo from "@/assets/google.png";
import { Modal } from "../Modal/Modal";
import style from "./Signin.module.css";

const Signin: FC = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const router = useRouter();

  const handleCloseMenu = () => {
    router.push("/");
  };

  return (
    <>
      <Modal onClose={handleCloseMenu} isDark={true}>
        <div className={style.wrapWindow}>
          <h1 className={style.title}>Вхід на сайт</h1>

          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl })}
            className={style.button}
          >
            <Image src={logo} alt="logo google" width={64} height={64} />
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Signin;
