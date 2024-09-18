import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import styles from "./CartItem.module.css";
import { app } from "../../fireBase";
import { usePosts } from "../../PostProvider";
import { useState } from "react";
function CartItem({ item }) {
  const [quantitys, setQuantitys] = useState(item.quantity);
  const { getCart, countCartFn, removeCart } = usePosts();
  const db = getFirestore(app);
  // async function removeCart(product) {
  //   const examcollref = doc(db, "menu", product.id);
  //   updateDoc(examcollref, {
  //     inCart: false,
  //   });
  //   await deleteDoc(doc(db, "cart", product.id)).then(getCart);
  // }
  function decriseQu(product) {
    setQuantitys((num) => num - 1);
    const examcollref = doc(db, "cart", product.id);
    updateDoc(examcollref, {
      quantity: quantitys - 1,
      totalPrice: product.price * (quantitys - 1),
    }).then(getCart);
  }
  function incriseQu(product) {
    setQuantitys((num) => num + 1);
    const examcollref = doc(db, "cart", product.id);
    updateDoc(examcollref, {
      quantity: quantitys + 1,
      totalPrice: product.price * (quantitys + 1),
    }).then(getCart);
  }
  return (
    <div className={styles.cartItem}>
      <div className={styles.nameAndImg}>
        <div className={styles.imageContainer}>
          <img className={styles.itemImage} src={item.imageUrl} alt="" />
        </div>
        <div>
          <p className={styles.name}>{item.productName}</p>
          <p className={styles.price}>₹ {item.price}</p>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className={styles.inAndDeButton}>
          <button
            onClick={() => (quantitys > 1 ? decriseQu(item) : removeCart(item))}
          >
            –
          </button>
          <p>{quantitys}</p>
          <button onClick={() => incriseQu(item)}>+</button>
        </div>
        <div>
          <button
            className={styles.removeBtn}
            onClick={() => removeCart(item).then(countCartFn)}
          >
            Remove From Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
