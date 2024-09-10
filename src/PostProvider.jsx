import { createContext, useContext, useEffect } from "react";
import {
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
    setProductList(data);
  }

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
      totalPrice:product.price
    });
    const examcollref = doc(db, "menu", product.id);
    updateDoc(examcollref, {
      inCart: isCart,
    });
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
    }).then(getWish);
    if (isWish === false) {
      await deleteDoc(doc(db, "wish", product.id));
    }
    const examcollref = doc(db, "menu", product.id);
    updateDoc(examcollref, {
      wish: isWish,
    }).then((ref) => getData());
  };
  async function countCartFn() {
    const db = getFirestore(app);
    const coll = collection(db, "cart");
    const snapshot = await getCountFromServer(coll);
    const cartCount = snapshot.data().count;
    setCartCount(cartCount);
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
