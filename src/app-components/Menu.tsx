interface MenuProps {
  menuList: string[];
}

function Menu({ menuList }: MenuProps) {
  return (
    <ul className="list-group">
      {menuList.map((menuLabel) => (
        <li>{menuLabel}</li>
      ))}
    </ul>
  );
}

export default Menu;
