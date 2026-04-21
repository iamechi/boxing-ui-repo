import Menu from "./Menu";
import Title from "./Title";
import { Fragment } from "react";

function HomeScreen() {
  const menuList = [
    "Add Areas",
    "Add New Fighter",
    "Schedule Fight",
    "Calendar",
    "Financing",
  ];

  return (
    <>
      <Title Title={"K.O. Time Flow"} />
      <Menu menuList={menuList} />
    </>
  );
}

export default HomeScreen;
