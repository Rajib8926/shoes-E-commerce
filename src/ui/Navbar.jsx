import { NavLink } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi2";
import { AiOutlineProduct } from "react-icons/ai";
import { RiShoppingCartLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import styles from "./Navbar.module.css";
import { usePosts } from "../PostProvider";
import Hamburger from "hamburger-react";
import { useEffect, useState } from "react";
function Navbar() {
  const { cartCount, wishCount } = usePosts();
  const [isNavOpen, setIsNavOpen] = useState(false);
  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = "hidden"; // disable scroll
    } else {
      document.body.style.overflow = "auto"; // enable scroll again
    }

    // cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isNavOpen]);
  return (
    <nav className={styles.navigationBar}>
      <div
        onClick={() => setIsNavOpen(!isNavOpen)}
        className={styles.navBackdrop}
        style={{ display: isNavOpen ? "block" : "none" }}
      ></div>
      <div className={styles.hamburgerContainer}>
        <div>
          <Hamburger toggled={isNavOpen} toggle={setIsNavOpen} color="white" />
        </div>
      </div>
      <div
        className={styles.fullNavigationCont}
        style={{ right: isNavOpen && "0" }}
      >
        <NavLink to={"/"} onClick={() => setIsNavOpen(!isNavOpen)}>
          <HiOutlineHome />
          <p className={styles.navigationText}>Home</p>
        </NavLink>
        <NavLink to={"/menu"} onClick={() => setIsNavOpen(!isNavOpen)}>
          <AiOutlineProduct />
          <p className={styles.navigationText}>Menu</p>
        </NavLink>
        <div className={styles.cartContainer}>
          <NavLink to={"/wish"} onClick={() => setIsNavOpen(!isNavOpen)}>
            <MdOutlineFavoriteBorder />
            <p className={styles.navigationText}>Wish list</p>
          </NavLink>
          {wishCount !== 0 || wishCount ? (
            <div className={styles.cartCount}>{wishCount}</div>
          ) : (
            ""
          )}
        </div>
        <div className={styles.cartContainer}>
          <NavLink to={"/cart"} onClick={() => setIsNavOpen(!isNavOpen)}>
            <RiShoppingCartLine />
            <p className={styles.navigationText}>Cart</p>
          </NavLink>
          {cartCount !== 0 || cartCount ? (
            <div className={styles.cartCount}>{cartCount}</div>
          ) : (
            ""
          )}
        </div>
        <NavLink to={"/order"} onClick={() => setIsNavOpen(!isNavOpen)}>
          <TbTruckDelivery />
          <p className={styles.navigationText}>Your Delivery</p>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
