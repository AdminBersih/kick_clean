import Link from "next/link";
import React from "react";
import menu_data from "./menu-data";

const NavMenu = () => {
  return (
    <>
      <ul className="main-menu__list">
        {menu_data.map((item, i) => (
          <li key={i} className={`${item.has_dropdown ? "dropdown" : ''}`}>
            <Link href={item.link} className="link">{item.title}</Link>
            {item.sub_menus && (
              <ul>
                {item.sub_menus.map((sub_item, sub_i) => (
                  <li key={sub_i}>
                    <Link href={sub_item.link}>{sub_item.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default NavMenu;