import { useEffect } from "react";
import { usePosts } from "../../PostProvider";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from '../../assets/cartEmpty.json'
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
function Cart() {
  const { getCart, cartList } = usePosts();
  let totalPriceCart = 0;
  cartList?.forEach((item) => {
    totalPriceCart += item.totalPrice;
  });

  const navigate = useNavigate();
  useEffect(function () {
    getCart();
  }, []);
  function orderHandler() {
    navigate(`/createOrder`, { replace: true });
  }
  return (
    <div className={styles.cartSection}>
      {cartList?.length === 0||cartList===undefined ? (
        <div className={styles.emptyContainer}>
         <Lottie className={styles.lottieIcon} animationData={animationData}/>
        </div>
      ) : (
        <>
          <h1>My Cart</h1>
          <div className={styles.cartContainer}>
            {cartList?.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </div>
          <div className={styles.cartPrice}>
            <p className={styles.totalPrice}>Total Price : ₹{totalPriceCart}</p>
            <button
              className={styles.orderButton}
              onClick={() => (cartList ? orderHandler() : "")}
            >
              Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
