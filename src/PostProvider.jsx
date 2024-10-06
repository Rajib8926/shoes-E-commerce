import { createContext, useContext } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "./fireBase";
import { useState } from "react";

const PostContext = createContext();
function PostProvider({ children }) {
  const [productList, setProductList] = useState();
  const [wishList, setWishList] = useState();
  const [orderList, setOrderList] = useState();
  const [cartList, setCartList] = useState();
  const [cartCount, setCartCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);
  async function getData() {
    const db = getFirestore(app);
    const docRef = collection(db, "menu");
    const docSnap = await getDocs(docRef);
    const beforeData = docSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    let preData = [];

    let wishDataPre = localStorage.getItem("royWish");
    let wishData = JSON.parse(wishDataPre);

    let cartDataPre = localStorage.getItem("royCart");
    let cartData = JSON.parse(cartDataPre);

    if (wishData || cartData) {
      beforeData.forEach((obj1) => {
        const wishItem = wishData?.find((obj2) => obj2?.id === obj1?.id);
        const cartItem = cartData?.find((obj3) => obj3?.id === obj1?.id);
        if (wishItem || cartItem) {
          if (wishItem && !cartItem) {
            preData.push({ ...obj1, wish: true });
          } else if (!wishItem && cartItem) {
            preData.push({ ...obj1, inCart: true });
          } else if (wishItem && cartItem) {
            preData.push({ ...obj1, inCart: true, wish: true });
          }
        } else {
          preData.push(obj1);
        }
      });
    }
    if (!wishData && !wishData) {
      preData = beforeData;
      setProductList(preData);
    }
    if (preData[0].id) {
      setProductList(preData);
    }
  }

  ///// set order function/////////////
  const setOrderFn = (order) => {
    let preData = localStorage.getItem("royOrder");
    let prOrder = JSON.parse(preData);
    localStorage.setItem(
      "royOrder",
      JSON.stringify(
        prOrder
          ? [{ ...order, id: new Date() }, ...prOrder]
          : [{ ...order, id: new Date() }]
      )
    );
  };
  const getOrder = () => {
    let preData = localStorage.getItem("royOrder");
    let data = JSON.parse(preData);
    setOrderList(data);
  };
  function deleteOrder(orderId) {
    let preData = localStorage.getItem("royOrder");
    let prOrder = JSON.parse(preData);
    let updateOrder = prOrder.filter((item) => item.id !== orderId);
    localStorage.setItem("royOrder", JSON.stringify(updateOrder));
    getOrder();
  }
  ///////////////////cart/////////////////
  function addCart(e, product) {
    let isCart;
    if (product.inCart === false) {
      isCart = true;
    } else if (product.inCart === true) {
      isCart = false;
    }

    e.stopPropagation();
    if (isCart === false) {
      let cartDataPre = localStorage.getItem("royCart");
      let cartData = JSON.parse(cartDataPre);
      if (cartData !== null) {
        localStorage.setItem(
          "royCart",
          JSON.stringify(cartData.filter((item) => item.id !== product.id))
        );
      }
    }
    if (isCart === true) {
      let cartDataPre = localStorage.getItem("royCart");
      let cartData = JSON.parse(cartDataPre);
      setCartCount(cartData ? cartData.length + 1 : 1);
      localStorage.setItem(
        "royCart",
        JSON.stringify(cartData !== null ? [...cartData, product] : [product])
      );
    }
  }
  function getCart() {
    let cartDataPre = localStorage.getItem("royCart");
    let cartData = JSON.parse(cartDataPre);
    setCartCount(cartData ? cartData.length : 0);
    setCartList(cartData);
  }
  function removeCart(data) {
    let cartDataPre = localStorage.getItem("royCart");
    let cartData = JSON.parse(cartDataPre);
    setCartCount(cartData.length - 1);
    let filterCart = cartData.filter((item) => item.id !== data.id);
    localStorage.setItem("royCart", JSON.stringify(filterCart));
    getCart();
  }
  function deleteAllCart() {
    localStorage.removeItem("royCart");
  }
  ////////////////////wish /////////////////////
  const wishHandler = async (e, product) => {
    let isWish;
    if (product.wish === false) {
      isWish = true;
    } else if (product.wish === true) {
      isWish = false;
    }
    e.stopPropagation();

    let wishProductPre = productList?.filter((item) => item.id === product.id);
    let wishProduct = wishProductPre?.map((item) => {
      return { ...item, wish: true };
    });

    setProductList((data) =>
      data?.map((item) =>
        item.id === product.id ? { ...item, wish: isWish } : item
      )
    );
    if (isWish === false) {
      let wishDataPre = localStorage.getItem("royWish");
      let wishData = JSON.parse(wishDataPre);
      setWishCount(wishData.length - 1);
      if (wishData !== null) {
        localStorage.setItem(
          "royWish",
          JSON.stringify(wishData.filter((item) => item.id !== product.id))
        );
      }
    }
    if (isWish === true) {
      let wishDataPre = localStorage.getItem("royWish");
      let wishData = JSON.parse(wishDataPre);
      setWishCount(wishData ? wishData.length + 1 : 1);
      localStorage.setItem(
        "royWish",
        JSON.stringify(
          wishData !== null ? [...wishData, ...wishProduct] : wishProduct
        )
      );
    }
  };
  function getWish() {
    let wishDataPre = localStorage.getItem("royWish");
    let wishData = JSON.parse(wishDataPre);
    setWishCount(wishData ? wishData.length : 0);
    setWishList(wishData);
    return wishData;
  }
  return (
    <PostContext.Provider
      value={{
        productList,
        getData,
        wishList,
        getWish,
        wishHandler,
        addCart,
        setOrderFn,
        orderList,
        getOrder,
        cartList,
        getCart,
        removeCart,
        deleteAllCart,
        deleteOrder,
        setCartList,
        cartCount,
        wishCount,
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
