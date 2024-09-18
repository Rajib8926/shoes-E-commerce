import { useState } from "react";
import { usePosts } from "../../PostProvider";
import styles from "./OrderItem.module.css";
function OrderItem({ data }) {
  const { deleteOrder } = usePosts();
  
  function deleteOrderHandler(data) {
    deleteOrder(data);
  }
  let totalPriceCart = 0;
  data.cartList?.forEach((item) => {
    totalPriceCart += item.totalPrice;
  });
  return (
    <div className={styles.orderContainer}>
      <h3>Order ID: {data.id}</h3>
      <h4 style={{ margin: "25px 0 10px" }}>Order Items</h4>
      {data.cartList.map((item) => (
        <div className={styles.orderItem} key={item.id}>
          <img src={item.imageUrl} alt="photo" width={150} />
          <div className={styles.orderItemText}>
            <p>{item.productName}</p>
            <p>
              <b>Price:</b> ₹{item?.price}
            </p>
          </div>
        </div>
      ))}
      <div className={styles.orderDetails}>
        <div>
          <p>
            <b>Name:</b> {data.orderDetails.FullName}
          </p>
          <p>
            <b>Phone number:</b> {data.orderDetails.Ph_no}
          </p>
          <p>
            <b>Backup Phone number:</b> {data.orderDetails.Backup_PhNo}
          </p>
          <p>
            <b>Address:</b> {data.orderDetails.Address}
          </p>
          <p style={{ fontSize: "17px", marginTop: "10px" }}>
            <b>Order price: </b>
            {totalPriceCart}
          </p>
        </div>
        <div className={styles.statusSection}>
          <input
            type="range"
            min="1"
            max="4"
            value="1"
            className={styles.slider}
            readOnly
            id="myRange"
          ></input>
          <button
            className={styles.cancelBtn}
            onClick={() => deleteOrderHandler(data.id)}
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
