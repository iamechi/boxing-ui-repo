import Menu from "./Menu";
import Title from "./Title";
import FighterManagementScreen from "./FighterManagementScreen";
import { HashRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { Fragment } from "react";

//This defines the menu path and title for each menu item in the HomeScreen component.
// Each object in the array represents a menu item with its corresponding path and title.
const menuList = [
  { menuPath: "/", menuTitle: "Home" },
  { menuPath: "/areas", menuTitle: "Add Areas" },
  {
    menuPath: "/fighters",
    menuTitle: "Add Fighters",
  },
  {
    menuPath: "/schedulefight",
    menuTitle: "Schedule Fight",
  },
  { menuPath: "/calendar", menuTitle: "Calendar" },
  { menuPath: "/financing", menuTitle: "Financing" },
];

function HomeScreen() {
  return (
    <>
      <Title Title={"K.O. Time Flow"} />
      <Menu menuList={menuList} />
    </>
  );
}

export default HomeScreen;
