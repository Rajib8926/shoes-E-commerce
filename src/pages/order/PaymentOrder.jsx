import { useEffect, useState } from "react";
import { usePosts } from "../../PostProvider";
import styles from "./PaymentOrder.module.css";
import { useNavigate } from "react-router-dom";
function PaymentOrder() {
  let orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
  const [paymentMethod, setPaymentMethod] = useState("none");
  const { cartList, getCart, setOrderFn, deleteAllCart } = usePosts();
  const navigate = useNavigate();
  console.log(orderDetails);
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
    setOrderFn(order);
    navigate("/order", { replace: true });
    deleteAllCart()
  }
  return (
    <div className={styles.orderPaymentContainer}>
      <div>
        {cartList ? (
          cartList.map((el) => (
            <div className={styles.orderItemBox} key={el.id}>
              <div className={styles.imageSection}>
                <img
                  src={el.imageUrl}
                  alt="photo"
                  className={styles.productImg}
                />
              </div>
              <div className={styles.orderDetailText}>
                <p className={styles.productName}>{el.productName}</p>
                <p className={styles.quantity}>quantity: {el.quantity}</p>
                <p className={styles.price}>Price: ₹{el.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className={styles.orderDetailBoxContainer}>
        <div className={styles.orderDetailBox}>
          <dir className={styles.orderDetailHeader}>
            <p>Order details</p>
          </dir>
          <div className={styles.detailSection}>
            <div className={styles.detailItem}>
              <p>Name:</p> <p>{orderDetails.FullName}</p>
            </div>
            <div className={styles.detailItem}>
              <p>Address:</p> <p>{orderDetails.Address}</p>
            </div>
            <div className={styles.detailItem}>
              <p>PIN number:</p> <p>{orderDetails.Pin}</p>
            </div>
            <div className={styles.detailItem}>
              <p>Phone number:</p>
              <p>{orderDetails.Ph_no}</p>
            </div>
            <div className={styles.detailItem}>
              <p>Backup phone number:</p> <p>{orderDetails.Backup_PhNo}</p>
            </div>
          </div>
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
          <div
            className={styles.priceItem}
            style={{ padding: "0px 22px 15px" }}
          >
            <p>Total</p>
            <p>₹{totalPriceCart}</p>
          </div>
        </div>
        <div className={styles.bottomSection}>
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
    </div>
  );
}

export default PaymentOrder;
