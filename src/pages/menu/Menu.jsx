import { useEffect } from "react";
import { usePosts } from "../../PostProvider";
import MenuItem from "./MenuItem";
import styles from "./Menu.module.css";
import Loading from "../../ui/Loading";

export default function Menu() {
  const { productList, getData, getWish } = usePosts();

  useEffect(function () {
    getData();
    getWish();
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={styles.menuContainer}>
      {!productList ? (
        <Loading />
      ) : (
        productList?.map((item) => <MenuItem item={item} key={item.id} />)
      )}
    </div>
  );
}
