import { useEffect } from "react";
import styles from "./Order.module.css";
import { usePosts } from "../../PostProvider";
import OrderItem from "./OrderItem";
import Lottie from "lottie-react";
import animationData from "../../assets/orderEmpty.json";
function Order() {
  const { orderList, getOrder } = usePosts();
  useEffect(function () {
    getOrder();
  }, []);

  return (
    <div className={styles.orderContainer}>
      {orderList?.length === 0 || orderList === undefined ? (
        <div className={styles.emptyContainer}>
          <Lottie className={styles.lottieIcon} animationData={animationData} />
        </div>
      ) : (
        orderList.map((el) => <OrderItem data={el} key={el.id} />)
      )}
    </div>
  );
}

export default Order;
