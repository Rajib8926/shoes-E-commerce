import { useEffect } from "react";
import { usePosts } from "../../PostProvider";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../assets/cartEmpty.json";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
function Cart() {
  const { getCart, cartList } = usePosts();
  let totalPriceCart = 0;

  cartList?.forEach((item) => {
  totalPriceCart += item.totalPrice;
  });
  useEffect(function () {
    getCart();
  }, []);
  const navigate = useNavigate();

  function orderHandler() {
    navigate(`/createOrder`, { replace: true });
  }
  return (
    <div className={styles.cartSection}>
      {cartList?.length === 0 || cartList === undefined || cartList === null ? (
        <div className={styles.emptyContainer}>
          <Lottie className={styles.lottieIcon} animationData={animationData} />
        </div>
      ) : (
        <div className={styles.cartAndPrice}>
          <div>
            <h1>Cart</h1>
            <div className={styles.cartContainer}>
              {cartList?.map((item) => (
                <CartItem
                  item={item}
                  key={item.id}
                 
                  totalPriceCart={totalPriceCart}
                 
                />
              ))}
            </div>
          </div>
          <div className={styles.cartPrice}>
            <p className={styles.totalPrice}>₹{totalPriceCart}</p>
            <div className={styles.priceSection}>
              <div className={styles.priceItem}>
                <p>Subtotal</p>
                <p>+{totalPriceCart}</p>
              </div>
              <div className={styles.priceItem}>
                <p>Delivery</p>
                <p className={styles.free}>Free</p>
              </div>
              <div className={styles.priceItem}>
                <p>Package charge</p>
                <p className={styles.free}>Free</p>
              </div>
              <div className={styles.priceItem}>
                <p>Tax</p>
                <p>0%</p>
              </div>
            </div>
            <div className={styles.priceItem} style={{ margin: "7px 0" }}>
              <p>Total</p>
              <p>{totalPriceCart}</p>
            </div>
            <button
              className={styles.orderButton}
              onClick={() => (cartList ? orderHandler() : "")}
            >
              Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
