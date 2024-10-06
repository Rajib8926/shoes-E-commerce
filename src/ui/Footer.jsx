import styles from "./Footer.module.css";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.aboutCont}>
          <p className={styles.aboutUsH}>About Us</p>
          <p className={styles.aboutUsT}>
            We are a leading e-commerce platform providing a wide range of
            products to cater to all your needs.
          </p>
        </div>
        <div className={styles.linkCont}>
          <p className={styles.linksH}>Quick Links</p>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Shop</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className={styles.followCont}>
          <h3>Follow Us</h3>
          <div className={styles.socialIcons}>
            <a href="https://www.facebook.com/profile.php?id=100049178316585">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/rajibroy8926/">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/in/rajib-roy-888087304/">
              <FaLinkedin />
            </a>
            <a href={"mailto:rajibroy89265@gmail.com"} target="_blank">
              <MdAttachEmail />
            </a>
          </div>
        </div>
      </div>
      <p className={styles.bottomFooter}>
        &copy; 2024 E-commerce Website. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
