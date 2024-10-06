import { useState } from "react";
import { usePosts } from "../../PostProvider";
import styles from "./OrderItem.module.css";
import DeliveryStatusBtn from "./DeliveryStatusBtn";
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
      <div className={styles.orderHeader}>
        <h3>Order ID: {data.id}</h3>
        <p className={styles.orderDate}>
          Order Date:{" "}
          <span style={{ color: "#949494", fontWeight: "700" }}>
            {data.orderDetails.date}
          </span>
        </p>
      </div>
      {data.cartList.map((item) => (
        <div className={styles.orderItem} key={item.id}>
          <div className={styles.orderItemProduct}>
            <div className={styles.orderItemImgCont}>
              <img src={item.imageUrl} alt="photo" width={150} />
            </div>
            <div className={styles.orderItemText}>
              <p className={styles.productName}>{item.productName}</p>
              <p className={styles.color}>Colour: #####</p>
              <p className={styles.quantity}>
                <span>Quantity:</span> {item?.quantity}
              </p>
            </div>
          </div>
          <div className={styles.itemPriceSection}>
            <p style={{ fontSize: "15px", fontWeight: "700" }}>
              ₹{item?.price}
            </p>
          </div>
        </div>
      ))}
      <div className={styles.orderDetails}>
        <div className={styles.orderStatus}>
          <p className={styles.orderStatusHading}>Order Status</p>
          <DeliveryStatusBtn />
          <button
            onClick={() => deleteOrderHandler(data.id)}
            className={styles.orderCancel}
          >
            Cancel Order
          </button>
        </div>
        <div className={styles.delivery}>
          <p className={styles.deliveryText}>Delivery</p>
          <p className={styles.addressText}>Address</p>
          <div className={styles.addressSection}>
            <p>{data.orderDetails.Address}</p>
            <p>
              <span>PIN number:</span> {data.orderDetails.Pin}
            </p>
            <p>
              <span>State:</span> {data.orderDetails.State}
            </p>
          </div>
          <div>
            <p className={styles.phText}>Phone number</p>
            <p className={styles.phoneNumber}>
              {data.orderDetails.Ph_no} ,{data.orderDetails.Backup_PhNo}{" "}
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
