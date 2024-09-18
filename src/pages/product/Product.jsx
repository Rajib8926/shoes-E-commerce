import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "../../fireBase";
import { usePosts } from "../../PostProvider";
import styles from "./Product.module.css";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
function Product() {
  const [productData, setProductData] = useState();
  const { productId } = useParams();
  const { handleCart, wishHandler, countCartFn } = usePosts();
  const navigate = useNavigate();
  async function getProduct(productId) {
    const db = getFirestore(app);
    const docRef = doc(db, "menu", productId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    const id = docSnap.id;
    setProductData({ ...data, id });
  }

  const [isWish, setIsWish] = useState();
  console.log(productData);
  useEffect(
    function () {
      getProduct(productId);
    },
    [productId]
  );
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
  console.log(productData?.inCart);
  return (
    <div className={styles.productContainer}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={productData?.imageUrl} alt="" />
      </div>
      <div className={styles.detailsSection}>
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
          ) : productData?.inCart ? (
            <button className={styles.cartButtonIn}>
              Product Is Already In Cart
            </button>
          ) : (
            <button
              onClick={(e) =>
                productData
                  ? handleCart(e, productData).then(() =>
                      countCartFn().then(() => getProduct(productId))
                    )
                  : ""
              }
              className={styles.cartButton}
            >
              Add To Cart
            </button>
          )}

          <button
            onClick={(e) =>
              productData
                ? wishHandler(e, productData, setIsWish).then(() =>
                    getProduct(productId)
                  )
                : ""
            }
            style={{ fontWeight: "700" }}
          >
            Wish
            {(isWish === undefined ? productData?.wish : isWish) ? (
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
          <p style={{ marginTop: "30px" }}>
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
