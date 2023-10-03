import { FC } from "react";
import HomeScreen from "@/screens/HomeScreen/HomeScreen";
interface IParams {
  params?: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const App: FC<IParams> = ({ searchParams }) => {
  return <HomeScreen searchParams={searchParams} />;
};

export default App;
