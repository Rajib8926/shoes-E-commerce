import { createContext, useContext, useEffect } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { app } from "./fireBase";
import { useState } from "react";

const PostContext = createContext();

function PostProvider({ children }) {
  const [productList, setProductList] = useState();
  const [wishList, setWishList] = useState();
  const [cartList, setCartList] = useState();
  const [cartCount, setCartCount] = useState();
  const [orderList, setOrderList] = useState();
  // useEffect(() => {
  //   getData();
  // }, []);
  async function getData() {
    const db = getFirestore(app);
    const docRef = collection(db, "menu");
    const docSnap = await getDocs(docRef);
    const data = docSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // localStorage.setItem('menu', JSON.stringify(PreData));
    // var data = JSON.parse(localStorage.getItem("menu"));
    // console.log(data)

    setProductList(data);
  }
  async function countCartFn() {
    const db = getFirestore(app);
    const coll = collection(db, "cart");
    const snapshot = await getCountFromServer(coll);
    const cartCount = snapshot.data().count;
    setCartCount(cartCount);
  }
  const deleteOrder = async (orderId) => {
    console.log(orderId);
    const db = getFirestore(app);
    await deleteDoc(doc(db, "orders", orderId)).then(getOrder);
  };
  const deleteCart = async () => {
    await cartList.map((el) => removeCart(el).then(countCartFn));
  };
  async function getWish() {
    const db = getFirestore(app);
    const docRef = collection(db, "wish");
    const docSnap = await getDocs(docRef);
    const data = docSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setWishList(data);
  }
  async function getCart() {
    const db = getFirestore(app);
    const docRef = collection(db, "cart");
    const docSnap = await getDocs(docRef);
    const data = docSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCartList(data);
  }
  function productDataFn(id) {
    const data = productList?.filter((item) => item.id === id);
    return data;
  }
  const handleCart = async (e, product) => {
    let isCart;
    if (product.inCart === false) {
      isCart = true;
    } else if (product.inCart === true) {
      isCart = false;
    }
    e.stopPropagation();
    const db = getFirestore(app);

    await setDoc(doc(db, "cart", product.id), {
      productName: product.productName,
      price: product.price,
      soldOut: product.soldOut,
      imageUrl: product.imageUrl,
      quantity: 1,
      totalPrice: product.price,
    }).then(countCartFn);
    const examcollref = doc(db, "menu", product.id);
    updateDoc(examcollref, {
      inCart: isCart,
    });
  };

  ///// set order function/////////////
  const setOrderFn = async (order) => {
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, "orders"), order);
  };

  const getOrder = async () => {
    const db = getFirestore(app);
    const docRef = collection(db, "orders");
    const docSnap = await getDocs(docRef);
    const data = docSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setOrderList(data);
  };

  const wishHandler = async (e, product, setIsWish) => {
    let isWish;
    if (product.wish === false) {
      isWish = true;
    } else if (product.wish === true) {
      isWish = false;
    }
    e.stopPropagation();
    const db = getFirestore(app);
    setIsWish(isWish);
    await setDoc(doc(db, "wish", product.id), {
      productName: product.productName,
      price: product.price,
      soldOut: product.soldOut,
      imageUrl: product.imageUrl,
      inCart: product.inCart,
    }).then(getWish);
    if (isWish === false) {
      await deleteDoc(doc(db, "wish", product.id));
    }
    const examcollref = doc(db, "menu", product.id);
    updateDoc(examcollref, {
      wish: isWish,
    }).then((ref) => getData());
  };
  async function removeCart(product) {
    const db = getFirestore(app);
    const examcollref = doc(db, "menu", product.id);
    updateDoc(examcollref, {
      inCart: false,
    });
    await deleteDoc(doc(db, "cart", product.id)).then(getCart);
  }

  return (
    <PostContext.Provider
      value={{
        productList,
        getData,
        getWish,
        wishList,
        productDataFn,
        getCart,
        cartList,
        wishHandler,
        handleCart,
        countCartFn,
        cartCount,
        setOrderFn,
        orderList,
        getOrder,
        deleteOrder,
        deleteCart,
        removeCart,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined)
    throw new Error("PostContext was used outside of the PostProvider");
  return context;
}

export default PostProvider;
