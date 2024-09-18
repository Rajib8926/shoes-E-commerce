import { useEffect } from "react";
import { usePosts } from "../../PostProvider";
import styles from "./Wish.module.css";
import WishItem from "./WishItem";
import Lottie from "lottie-react";
import animationData from "../../assets/emptyWish.json";
function Wish() {
  const { wishList, getWish } = usePosts();
  useEffect(function () {
    getWish();
  }, []);
  return (
    <div className={styles.WishListContainer}>
      {wishList?.length === 0 || wishList === undefined ? (
        <div className={styles.emptyContainer}>
          <Lottie className={styles.lottieIcon} animationData={animationData} />
        </div>
      ) : (
        <>
          <h1>My Wishes</h1>
          <div className={styles.wishItemContainer}>
            {wishList?.map((item) => (
              <WishItem item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Wish;
