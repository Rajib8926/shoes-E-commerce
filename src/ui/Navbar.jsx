import { NavLink } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi2";
import { AiOutlineProduct } from "react-icons/ai";
import { RiShoppingCartLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import styles from "./Navbar.module.css";
import { usePosts } from "../PostProvider";
import { useEffect } from "react";
function Navbar() {
  const { countCartFn, cartCount } = usePosts();
  useEffect(function () {
    countCartFn();
  }, []);
  return (
    <nav>
      <NavLink to={"/"}>
        <HiOutlineHome />
      </NavLink>
      <NavLink to={"/menu"}>
        <AiOutlineProduct />
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
      <NavLink to={"/wish"}>
        <MdOutlineFavoriteBorder />
      </NavLink>
    </nav>
  );
}

export default Navbar;
