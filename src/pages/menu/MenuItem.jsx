import { usePosts } from "../../PostProvider";
import { useNavigate } from "react-router-dom";
import styles from "./MenuItem.module.css";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { useState } from "react";
import { MdFavorite } from "react-icons/md";
import Loading from "../../ui/Loading";
function MenuItem({ item }) {
  const [isWish, setIsWish] = useState(item.wish);
  const { wishHandler } = usePosts();
  const navigate = useNavigate();
  function productHandler(item) {
    navigate(`/product/${item.id}`);
  }
  return (
    <div
      className={styles.menuItem}
      key={item.id}
      onClick={() => productHandler(item)}
    >
      <div
        onClick={(e) => wishHandler(e, item, setIsWish)}
        className={styles.wishButton}
      >
        {isWish ? (
          <MdFavorite style={{ color: "#ff5441" }} />
        ) : (
          <MdOutlineFavoriteBorder />
        )}
      </div>
      <div className={styles.imageContainer}>
        <div className={styles.imageContainer}>
          <img
            src={item.imageUrl}
            alt={item.productName}
            className={styles.itemImage}
          />
        </div>
      </div>
      <div className={styles.itemName}>{item.productName}</div>
      {item.soldOut ? (
        <p className={styles.soldOut}>Sold Out</p>
      ) : (
        <p className={styles.available}>Available</p>
      )}
      <div className={styles.itemPrice}>MRP : ₹ {item.price}</div>
    </div>
  );
}

export default MenuItem;
