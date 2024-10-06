
import styles from "./WishItem.module.css";
import { HiMiniXMark } from "react-icons/hi2";


import { usePosts } from "../../PostProvider";
import { useNavigate } from "react-router-dom";
import Star from "../../ui/Star";
function WishItem({ item }) {
  const { getWish, wishHandler } = usePosts();
  const navigate = useNavigate();
  let product = item;

  function productHandler(item) {
    navigate(`/product/${item.id}`, { state: item });
  }
  return (
    <div className={styles.wishItem} onClick={() => productHandler(item)}>
      <div className={styles.imgText}>
        <div className={styles.imgContainer}>
          <img className={styles.wishImg} src={item.imageUrl} alt="wish" />
        </div>
        <div>
          <p className={styles.productName}>{item.productName}</p>
          <Star/>
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
          onClick={(e) => wishHandler(e, product).then(getWish)}
        >
          <HiMiniXMark />
        </div>

        <div></div>
      </div>
    </div>
  );
}

export default WishItem;
