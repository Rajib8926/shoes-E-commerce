import { NavLink } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi2";
import { AiOutlineProduct } from "react-icons/ai";
import { RiShoppingCartLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import styles from "./Navbar.module.css";
import { usePosts } from "../PostProvider";
import Hamburger from "./Hamburger";

function Navbar() {
  const { cartCount, wishCount } = usePosts();

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
        <div className={styles.cartContainer}>
          <NavLink to={"/wish"}>
            <MdOutlineFavoriteBorder />
          </NavLink>
          {wishCount !== 0 || wishCount ? (
            <div className={styles.cartCount}>{wishCount}</div>
          ) : (
            ""
          )}
        </div>
        <div className={styles.cartContainer}>
          <NavLink to={"/cart"}>
            <RiShoppingCartLine />
          </NavLink>
          {cartCount !== 0 || cartCount ? (
            <div className={styles.cartCount}>{cartCount}</div>
          ) : (
            ""
          )}
        </div>
        <NavLink to={"/order"}>
          <TbTruckDelivery />
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
