import { Fragment } from "react";

interface NavProps {
  navList: string[];
}

function NavBar({ navList }: NavProps) {
  return (
    <>
      <nav>
        {navList.map((navButton) => (
          <li>{navButton}</li>
        ))}
      </nav>
    </>
  );
}

export default NavBar;
