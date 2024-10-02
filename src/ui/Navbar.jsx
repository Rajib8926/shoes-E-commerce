import { NavLink } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi2";
import { AiOutlineProduct } from "react-icons/ai";
import { RiShoppingCartLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import styles from "./Navbar.module.css";
import { usePosts } from "../PostProvider";
import { useEffect, useState } from "react";
import Hamburger from "./Hamburger";

function Navbar() {
  const { countCartFn, cartCount } = usePosts();
  const [isActive, setActive] = useState(false);
  const ToggleClass = () => {
    setActive(!isActive);
  };
  useEffect(function () {
    countCartFn();
  }, []);
  return (
    <nav className={styles.navigationBar}>
      <Hamburger />
      <div className={styles.fullNavigationCont}>
        <NavLink to={"/"}>
          <HiOutlineHome />
        </NavLink>
        <NavLink to={"/menu"}>
          <AiOutlineProduct />
        </NavLink>
        <NavLink to={"/wish"}>
          <MdOutlineFavoriteBorder />
        </NavLink>
        <NavLink to={"/cart"}>
          <div className={styles.cartContainer}>
            <RiShoppingCartLine />
            {cartCount !== 0 ? (
              <div className={styles.cartCount}>{cartCount}</div>
            ) : (
              ""
            )}
          </div>
        </NavLink>
        <NavLink to={"/order"}>
          <TbTruckDelivery />
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
