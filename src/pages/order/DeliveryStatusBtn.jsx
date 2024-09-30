import styles from "./DeliveryStatusBtn.module.css";
function DeliveryStatusBtn() {
  return (
    <div className={styles.wrap}>
      <button className={styles.button}>Order Confirmed</button>
    </div>
  );
}

export default DeliveryStatusBtn;
