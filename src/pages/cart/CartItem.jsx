import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import styles from "./CartItem.module.css";
import { app } from "../../fireBase";
import { usePosts } from "../../PostProvider";
import { useState } from "react";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { HiMiniXMark } from "react-icons/hi2";
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
        <div className={styles.detailSection}>
          <p className={styles.name}>{item.productName}</p>
          <p className={styles.color}>Colour: #####</p>
          <p className={styles.price}>₹ {item.price}</p>
        </div>
      </div>
      <div className={styles.inDeBrnSection}>
        <div className={styles.inAndDeButton}>
          <button
            onClick={() => (quantitys > 1 ? decriseQu(item) : removeCart(item))}
          >
            <FaMinus />
          </button>
          <p className={styles.quantity}>{quantitys}</p>
          <button onClick={() => incriseQu(item)}>
            <FaPlus />
          </button>
        </div>
        <div className={styles.btnSection}>
          <button
            className={styles.removeBtn}
            onClick={() => removeCart(item).then(countCartFn)}
          >
            <HiMiniXMark />
          </button>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
