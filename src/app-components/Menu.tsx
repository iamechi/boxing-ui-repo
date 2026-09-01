import { Link, Outlet } from "react-router-dom";
import "/src/BoxingApp.css";

interface MenuProps {
  menuList: {
    menuPath: string;
    menuTitle: string;
  }[];
}

function Menu({ menuList }: MenuProps) {
  return (
    <>
      <nav id="navBar">
        {menuList.map((menuLabel) => (
          <Link key={menuLabel.menuTitle} to={menuLabel.menuPath}>
            {menuLabel.menuTitle}
          </Link>
        ))}
      </nav>
      <Outlet />
    </>
  );
}

export default Menu;
