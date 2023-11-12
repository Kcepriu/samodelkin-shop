import { FC } from "react";
import { getServerSession } from "next-auth";
import { authConfigs } from "@/configs/authConfigs";

const Revised: FC = async (): Promise<JSX.Element> => {
  const session = await getServerSession(authConfigs);
  const user = session?.user;
  return <p>Revised</p>;
};

export default Revised;
