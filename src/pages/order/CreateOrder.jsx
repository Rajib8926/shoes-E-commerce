import { Form, redirect } from "react-router-dom";
import styles from "./CreateOrder.module.css";
import { useEffect, useState } from "react";
import { usePosts } from "../../PostProvider";
import Lottie from "lottie-react";
import animationData from "../../assets/createOrder.json";
import { BsXCircleFill } from "react-icons/bs";


function CreateOrder() {
  const [correctNo, setCorrectNo] = useState(true);
  const [correctNoSe, setCorrectNoSe] = useState(true);
  const { cartList, getCart } = usePosts();
  useEffect(function () {
    window.scrollTo(0, 0);
    getCart();
  }, []);
  function validatePhoneNumber(phoneNumber) {
    var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (regex.test(phoneNumber)) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <div className={styles.CreateOrderCont}>
      <div>
        {cartList?.length === 0 || cartList === null ? (
          <div className={styles.emptyContainer}>
            <h2>Your Cart is Empty</h2>
            <Lottie
              className={styles.emptyItem}
              animationData={animationData}
            />
          </div>
        ) : (
          <Form method="POST">
            <div>
              <p className={styles.label}>Full name</p>
              <input
                type="text"
                placeholder="Full Name"
                required
                name="FullName"
              />
            </div>
            <div className={styles.numberInput}>
              <p className={styles.label}>Ph. Number</p>
              <input
                type="number"
                name="Ph_no"
                placeholder="Ph. no"
                required
                onChange={(e) =>
                  Number(e.target.value) > 0
                    ? setCorrectNo(validatePhoneNumber(Number(e.target.value)))
                    : ""
                }
              />
              {!correctNo ? (
                <p className={styles.crossIcon}>
                  <BsXCircleFill />
                </p>
              ) : (
                <p className={styles.rightIcon}>{""}</p>
              )}
            </div>

            <div>
              <div className={styles.numberInput}>
                <p className={styles.label}>Backup Ph. Number</p>
                <div>
                  <input
                    type="number"
                    name="Backup_PhNo"
                    placeholder="Backup Ph. No"
                    required
                    onChange={(e) =>
                      Number(e.target.value) > 0
                        ? setCorrectNoSe(
                            validatePhoneNumber(Number(e.target.value))
                          )
                        : ""
                    }
                  />
                  {!correctNoSe ? (
                    <p className={styles.crossIcon}>
                      <BsXCircleFill />
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            <div>
              <p className={styles.label}>Address</p>
              <input
                type="text"
                placeholder="Address"
                required
                name="Address"
              />
            </div>
            <div>
              <p className={styles.label}>State</p>
              <input type="text" placeholder="State" required name="State" />
            </div>
            <div>
              <p className={styles.label}>Nearest Road</p>
              <input
                type="text"
                placeholder="Nearest Road"
                required
                name="NearestRoad"
              />
            </div>
            <div>
              <p className={styles.label}>PIN Number</p>
              <input
                type="number"
                placeholder="Enter PIN"
                required
                name="Pin"
              />
            </div>
            <div>
              <p className={styles.label}>City</p>
              <input
                type="text"
                placeholder="Enter City"
                required
                name="city"
              />
            </div>
            <div>
              <p className={styles.label}>House Number</p>
              <input type="number" placeholder="House Number" required />
            </div>
            <button className="orderBtn" type="submit">
              Order Place
            </button>
          </Form>
        )}
      </div>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const obj = Object.fromEntries(formData);
  const SubDate = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const date = formatter.format(SubDate);
  const data = { ...obj, date: date };
  await localStorage.setItem("orderDetails", JSON.stringify(data));
  return redirect(`/orderPayment`);
}

export default CreateOrder;
