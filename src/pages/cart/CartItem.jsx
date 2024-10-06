import styles from "./CartItem.module.css";

import { usePosts } from "../../PostProvider";
import { useState } from "react";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { HiMiniXMark } from "react-icons/hi2";
import Star from "../../ui/Star";
function CartItem({ item }) {
  const [quantitys, setQuantitys] = useState(item.quantity);

  const { removeCart, cartList, setCartList } = usePosts();
  ///////////////for quantity degrees function /////////////////////
  function decriseQu(product) {
    setQuantitys((num) => num - 1);
    let editProduct = {
      ...product,
      quantity: quantitys - 1,
      totalPrice: product.price * (quantitys - 1),
    };
    let cartDataPre = localStorage.getItem("royCart");
    let cartData = JSON.parse(cartDataPre);
    let filterCart = cartData.filter((item) => item.id !== product.id);
    let updateCart = [...filterCart, editProduct];
    console.log(updateCart);
    localStorage.setItem("royCart", JSON.stringify(updateCart));
    setCartList(
      cartList.map((data) =>
        data.id === item.id
          ? {
              ...data,
              quantity: quantitys - 1,
              totalPrice: product.price * (quantitys - 1),
            }
          : data
      )
    );
  }
  ///////////////for quantity increase function /////////////////////
  function incriseQu(product) {
    setQuantitys((num) => num + 1);
    let editProduct = {
      ...product,
      quantity: quantitys + 1,
      totalPrice: product.price * (quantitys + 1),
    };
    let cartDataPre = localStorage.getItem("royCart");
    let cartData = JSON.parse(cartDataPre);
    let filterCart = cartData.filter((item) => item.id !== product.id);
    let updateCart = [editProduct, ...filterCart];
    console.log(updateCart);
    localStorage.setItem("royCart", JSON.stringify(updateCart));

    setCartList(
      cartList.map((data) =>
        data.id === item.id
          ? {
              ...data,
              quantity: quantitys + 1,
              totalPrice: product.price * (quantitys + 1),
            }
          : data
      )
    );
  }
  return (
    <div className={styles.cartItem}>
      <div className={styles.nameAndImg}>
        <div className={styles.imageContainer}>
          <img className={styles.itemImage} src={item.imageUrl} alt="" />
        </div>
        <div className={styles.detailSection}>
          <p className={styles.name}>{item.productName}</p>
          <Star/>
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
          <button className={styles.removeBtn} onClick={() => removeCart(item)}>
            <HiMiniXMark />
          </button>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
