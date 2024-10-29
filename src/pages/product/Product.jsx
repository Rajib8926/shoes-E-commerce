import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "../../fireBase";
import { usePosts } from "../../PostProvider";
import styles from "./Product.module.css";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import Star from "../../ui/Star";
function Product() {
  const [productData, setProductData] = useState();
  const { addCart, wishHandler, getData } = usePosts();
  // let isCart = productData?.inCart;
  const location = useLocation();
  const { state } = location;

  useEffect(
    function () {
      window.scrollTo(0, 0);
      let data = undefined;
      let cartDataPre = localStorage.getItem("royCart");
      let cartData = JSON.parse(cartDataPre);

      let wishDataPre = localStorage.getItem("royWish");
      let wishData = JSON.parse(wishDataPre);
      let isCartInData = cartData?.find((item) => item.id === state.id);
      let isWishInData = wishData?.find((item) => item.id === state.id);

      if (isCartInData) {
        data = { ...state, inCart: true, wish: false };
      }
      if (isWishInData) {
        if (data) {
          data = { ...data, wish: true };
        } else if (!data) {
          data = { ...state, wish: true };
        }
      }

      setProductData(data ? data : state);
      getData();
    },
    [state]
  );

  const [isCart, setIsCart] = useState(productData?.inCart);
  const [isWish, setIsWish] = useState(productData?.wish);

  useEffect(
    function () {
      setIsWish(productData?.wish);
      setIsCart(productData?.inCart);
    },
    [productData]
  );

  function handleWish(e, productData) {
    wishHandler(e, { ...productData, wish: isWish });
    setIsWish((item) => !item);
  }
  function handleCart(e, productData) {
    addCart(e, { ...productData, quantity: 1, totalPrice: productData.price });

    setIsCart((item) => !item);
  }

  const shoeSize = [
    { size: "UK 6.5", status: "notAvailable" },
    { size: "UK 7", status: "available" },
    { size: "UK 7.5", status: "available" },
    { size: "UK 8", status: "available" },
    { size: "UK 8.5", status: "available" },
    { size: "UK 9", status: "available" },
    { size: "UK 9.5", status: "available" },
    { size: "UK 10", status: "available" },
    { size: "UK 10.5", status: "available" },
    { size: "UK 11", status: "available" },
  ];

  return (
    <div className={styles.productContainer}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={productData?.imageUrl} alt="" />
      </div>
      <div className={styles.detailsSection}>
        <div style={{ width: "300px" }}>
          <div>
            <p className={styles.productName}>{productData?.productName}</p>
            <p className={styles.productNameTitle}>Men's Road Running Shoes</p>
          </div>
          <div>
            <p className={styles.price}>MRP :₹{productData?.price}</p>
            <p className={styles.productNameTitle}>incl. of taxes</p>
            <p className={styles.productNameTitle}>
              (Also includes all applicable duties)
            </p>
            <Star />
          </div>
        </div>
        <p className={styles.sizeText}>Select Size</p>
        <div className={styles.sizeSection}>
          {shoeSize.map((item) => (
            <div key={item.size} className={styles.sizeBox}>
              {item.size}
            </div>
          ))}
        </div>
        <div className={styles.buttonSection}>
          {productData?.soldOut ? (
            <p className={styles.soldOut}>Sold Out</p>
          ) : isCart ? (
            <button className={styles.cartButtonIn}>
              Product Is Already In Cart
            </button>
          ) : (
            <button
              onClick={(e) => (productData ? handleCart(e, productData) : "")}
              className={styles.cartButton}
            >
              Add To Cart
            </button>
          )}

          <button
            onClick={(e) => (productData ? handleWish(e, productData) : "")}
            style={{ fontWeight: "700" }}
          >
            Wish
            {isWish ? (
              <MdFavorite style={{ color: "#ff5441", fontSize: "18px" }} />
            ) : (
              <MdOutlineFavoriteBorder style={{ fontSize: "18px" }} />
            )}
          </button>
        </div>
        <div style={{ width: "320px" }}>
          <p className={styles.productNameTitle}>
            This product is excluded from site promotions and discounts.
          </p>
          <p className={styles.productAbout}>
            With maximum cushioning to support every mile, the Invincible 3
            gives you our highest level of comfort underfoot to help you stay on
            your feet today, tomorrow and beyond. Designed to help keep you on
            the run, it's super supportive and bouncy, so that you can propel
            down your preferred path and come back for your next run feeling
            ready and reinvigorated.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Product;
