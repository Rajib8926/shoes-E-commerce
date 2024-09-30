import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import styles from "./WishItem.module.css";
import { HiMiniXMark } from "react-icons/hi2";

import { app } from "../../fireBase";
import { usePosts } from "../../PostProvider";
import { useNavigate } from "react-router-dom";
function WishItem({ item }) {
  const { getWish, handleCart, cartCount } = usePosts();
  const navigate = useNavigate();
  function handleWish(e, item) {
    e.stopPropagation();
    const db = getFirestore(app);
    const examcollref = doc(db, "menu", item.id);
    updateDoc(examcollref, {
      wish: false,
    });
    deleteDoc(doc(db, "wish", item.id)).then(() => getWish());
  }

  function productHandler(item) {
    navigate(`/product/${item.id}`);
  }
  return (
    <div className={styles.wishItem} onClick={() => productHandler(item)}>
      <div className={styles.imgText}>
        <div className={styles.imgContainer}>
          <img className={styles.wishImg} src={item.imageUrl} alt="wish" />
        </div>
        <div>
          <p className={styles.productName}>{item.productName}</p>
          <p className={styles.color}>Colour: ######</p>
          {item.soldOut ? (
          <p className={styles.soldOut}>Sold Out</p>
        ) : (
          <p className={styles.available}>Available</p>
        )}
          <p className={styles.price}>₹ {item.price}</p>
        </div>
      </div>
      <div className={styles.btnContainer}>
        <div
          className={styles.wishButton}
          onClick={(e) => handleWish(e, item).then(() => cartCount())}
        >
          <HiMiniXMark />
        </div>
        <button className={styles.cartBtn} onClick={(e) => handleCart(e, item)}>
          Add To Cart
        </button>

        <div></div>
      </div>
    </div>
  );
}

export default WishItem;
