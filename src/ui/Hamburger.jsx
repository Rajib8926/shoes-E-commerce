import { NavLink } from "react-router-dom";
import styles from "./Hamburger.module.css";
import { HiOutlineHome } from "react-icons/hi2";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { RiShoppingCartLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { useState } from "react";
import { Turn } from "hamburger-react";
function Hamburger() {
  const [isChecked, setIsChecked] = useState(false);
  function checkControl(){
    setIsChecked((data)=>!data)
  }
  return (
    <div className={styles.hamburgerContainer}>
      <div className={styles.menu}>
        <input
          type="checkbox"
          href="#"
          className={styles.menuOpen}
          name="menu-open"
          id="menu-open"
          checked={isChecked?true:false}
          onChange={(e) => console.log(e)}
          onClick={checkControl}
        />
        <label className={styles.menuOpenButton} for="menu-open">
          <span className={`${styles.hamburger} ${styles.hamburger1}`}></span>
          <span className={`${styles.hamburger} ${styles.hamburger2}`}></span>
          <span className={`${styles.hamburger} ${styles.hamburger3}`}></span>
        </label>

        <NavLink to={"/"} className={styles.menuItem} onClick={checkControl}>
          <HiOutlineHome />
        </NavLink>
        <NavLink to={"/menu"} className={styles.menuItem} onClick={checkControl}>
          <AiOutlineProduct />
        </NavLink>
        <NavLink to={"/wish"} className={styles.menuItem} onClick={checkControl}>
          <MdOutlineFavoriteBorder />
        </NavLink>
        <NavLink to={"/cart"} className={styles.menuItem} onClick={checkControl}>
          <RiShoppingCartLine />
        </NavLink>
        <NavLink to={"/order"} className={styles.menuItem} onClick={checkControl}>
          <TbTruckDelivery />
        </NavLink>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="shadowed-goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="10"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
            <feColorMatrix
              in="shadow"
              mode="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2"
              result="shadow"
            />
            <feOffset in="shadow" dx="1" dy="1" result="shadow" />
            <feBlend in2="shadow" in="goo" result="goo" />
            <feBlend in2="goo" in="SourceGraphic" result="mix" />
          </filter>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="10"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in2="goo" in="SourceGraphic" result="mix" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default Hamburger;
