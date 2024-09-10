import { useEffect } from "react";
import { usePosts } from "../../PostProvider";
import styles from "./Wish.module.css";
import WishItem from "./WishItem";
function Wish() {
  const { wishList, getWish } = usePosts();
  useEffect(function () {
    getWish();
  }, []);
  return (
    <div className={styles.WishListContainer}>
      <h1>My Wishes</h1>
      <div className={styles.wishItemContainer}>
        {wishList?.map((item) => (
          <WishItem item={item} />
        ))}
      </div>
    </div>
  );
}

export default Wish;
