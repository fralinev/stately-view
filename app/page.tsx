import Image from "next/image";
import Header from "./Header/Header";
import Dashboard from "./Dashboard/Dashboard";

export default function Home() {
  return (
    <>
      <Header />
      <Dashboard/>
    </>
  );
}
