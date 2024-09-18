import { useEffect, useState } from "react";
import { usePosts } from "../../PostProvider";
import styles from "./PaymentOrder.module.css";
import { useNavigate } from "react-router-dom";
function PaymentOrder() {
  let orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
  const [paymentMethod, setPaymentMethod] = useState("none");
  const { cartList, getCart, setOrderFn, deleteCart } = usePosts();
  const navigate = useNavigate();

  useEffect(function () {
    getCart();
  }, []);
  let totalPriceCart = 0;
  cartList?.forEach((item) => {
    totalPriceCart += item.totalPrice;
  });
  cartList ? console.log(cartList) : console.log("not Fetch yet");
  function payOnClickHandler() {
    const order = { orderDetails, cartList };
    setOrderFn(order)
      .then(() => deleteCart())
      .then(() => navigate("/order", { replace: true }));
  }
  return (
    <div className={styles.orderPaymentContainer}>
      {cartList ? (
        cartList.map((el) => (
          <div className={styles.orderItemBox} key={el.id}>
            <img src={el.imageUrl} alt="photo" className={styles.productImg} />
            <div className={styles.orderDetailText}>
              <p>Price: ₹{el.price}</p>
              <p>{el.productName}</p>
              <p>quantity: {el.quantity}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
      <div className={styles.orderDetailBox}>
        <p>
          <b>Name:</b> {orderDetails.FullName}
        </p>
        <p>
          <b>Address:</b> {orderDetails.Address}
        </p>
        <p>
          <b>Phone Number:</b> {orderDetails.Ph_no}
        </p>
        <p>
          <b>Backup Phone number:</b> {orderDetails.Backup_PhNo}
        </p>
      </div>
      <div className={styles.bottomSection}>
        <p className={styles.totalPrice}>
          <b>Total Price:</b> ₹{totalPriceCart}
        </p>
        <div>
          {paymentMethod === "cod" ? (
            <button onClick={payOnClickHandler}>
              Order on cash on delivery
            </button>
          ) : (
            <div className={styles.container}>
              <div className={styles.select}>
                <select onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option defaultChecked value="none">
                    Select payment method
                  </option>
                  <option disabled value="online">
                    Pay online
                  </option>
                  <option value="cod">Cash on delivery</option>
                </select>
              </div>
              <div className={styles.down_note}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentOrder;
