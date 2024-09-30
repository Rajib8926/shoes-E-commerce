import { useEffect, useState } from "react";
import { usePosts } from "../../PostProvider";
import styles from "./Home.module.css";
import MenuItem from "../menu/MenuItem";
import { Fade } from "react-awesome-reveal";
function Home() {
  const { productList, getData } = usePosts();
  useEffect(function () {
    getData();
  }, []);
  return (
    <div className={styles.HomeContainer}>
      <div className={styles.headerSection}>
        <div className={styles.headerTextSection}>
          <Fade direction={"left"} duration={1600}>
            <p className={styles.secondHeaderTextFa}>UNLEASH</p>
          </Fade>

          <Fade direction={"left"} duration={1300}>
            <p className={styles.secondHeaderText}>UNIQUE</p>
          </Fade>

          <div className={styles.headerImg}>
            <Fade direction={"down"} duration={1300}>
              <img src="headerImg.png" alt="" />
            </Fade>
          </div>

          <Fade direction={"right"} duration={1300}>
            <p className={styles.headerTextRightSmallText}>
              <span style={{ fontWeight: "700" }}>
                {" "}
                Step Up Your Game With Our Premium Sports Shoes!
              </span>{" "}
              <br></br>
              Discover the perfect blend of comfort,style,adn performance with
              our exclusive collection of sports shoes .
            </p>
          </Fade>
          <Fade direction={"right"} duration={1200}>
            <p className={styles.headerTextRightH1U}>YOUR</p>
          </Fade>
          <Fade direction={"right"} duration={1600}>
            <p className={styles.headerTextRightH1}>STYLE</p>
          </Fade>
        </div>
      </div>
      <div className={styles.secondSection}>
        <div className={styles.textSection}>
          <Fade direction={"down"} duration={1500}>
            <p className={styles.productName}>Jordan Spizike Low</p>
          </Fade>
          <Fade direction={"left"} duration={1200}>
            <p className={styles.productAbout}>
              Nike's 1st lifestyle Air Max returns with a vibrant color{" "}
              <br></br> gradient that's sure to turn heads.
            </p>
          </Fade>
          <Fade direction={"up"} duration={1500}>
            <p className={styles.price}>₹17,520</p>
            <button className={styles.byNowBtn}>By Now</button>
          </Fade>
        </div>
        <div className={styles.imageSection}>
          <Fade direction={"up"} duration={1400}>
            <div className={styles.secondSecImgCont}>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/e-shop-db2e3.appspot.com/o/menu%2Ffile%20(7).png?alt=media&token=d18fea9b-9b07-4db0-9d67-a651ac5c81c9"
                alt=""
                className={styles.secondSecImg}
              />
            </div>
          </Fade>
        </div>
      </div>
      <div className={styles.thirdSection}>
        <div className={styles.leftSection}>
          <Fade direction={"left"} duration={1400}>
            <p className={styles.firstH}>WHERE STYLE MEETS COMFORT</p>
          </Fade>

          <div className={styles.firstImgCont}>
            <Fade direction={"left"} duration={1500}>
              <img src="file (1).png" alt="" />
            </Fade>
          </div>
          <Fade direction={"left"} duration={1400}>
            <p className={styles.ELEGANCE}>
              ELEGANCE,TRENDS,AND TIMELESS FASHION ARE THE ESSENCE OF WHAT WE
              OFFER
            </p>
          </Fade>
          <div className={styles.secondImgCont}>
            <Fade direction={"up"} duration={1400}>
              <img src="file.png" alt="" />
            </Fade>
          </div>
          <Fade direction={"up"} duration={1400}>
            <p className={styles.productName}>Nike Pegasus 41</p>
          </Fade>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.thirdSectionHead}>
            <Fade direction={"right"} duration={1400}>
              <p className={styles.Discover}>Discover The Perfect Fusion </p>
            </Fade>
            <Fade direction={"right"} duration={1500}>
              <p className={styles.Welcome}>
                Welcome to a world those two essential elements seamlessly
                intertwine ,giving you the best of both worlds
              </p>
            </Fade>
          </div>
          <div className={styles.thirdImgCont}>
            <Fade direction={"right"} duration={1600}>
              <img src="file (2).png" alt="" />
            </Fade>
          </div>
        </div>
      </div>
      <div className={styles.forthSection}>
        <div className={styles.forthSectionHeader}>
          <Fade direction={"left"} duration={1500}>
            <p className={styles.heading}>OUR SUGGESTED PRODUCT </p>
          </Fade>
          <Fade direction={"right"} duration={1100}>
            <p className={styles.aboutText}>
              We take immense pride in the positive impact our products have on
              your lives,and we're delighted to share some of the stories form
              cur satisfied customers.
            </p>
          </Fade>
        </div>

        <div className={styles.homeMenu}>
          {productList?.map((data, index) =>
            index < 6 ? <MenuItem item={data} /> : ""
          )}
        </div>
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.textSection}>
          <Fade direction="left" duration={1600}>
            <p className={styles.mainText}>
              FINK YOUR FAVORITES, AND TAKE THE FIRST STEP TOWARDS SNEAKER
            </p>
          </Fade>
          <Fade direction="right" duration={1300}>
            <p className={styles.subText}>
              Discover the perfect pair that complements you unique style
            </p>
          </Fade>
        </div>
        <Fade direction="up" duration={1300}>
          <button className={styles.shopBtn}>Shop Now!</button>
        </Fade>
      </div>
      <div className={styles.mainFooter}></div>
    </div>
  );
}

export default Home;
