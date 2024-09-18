import { Form, redirect } from "react-router-dom";
import styles from "./CreateOrder.module.css";
import { useState } from "react";
import { usePosts } from "../../PostProvider";
import Lottie from "lottie-react";
import animationData from "../../assets/createOrder.json";
function CreateOrder() {
  const [correctNo, setCorrectNo] = useState(true);
  const [correctNoSe, setCorrectNoSe] = useState(true);
  const { cartList } = usePosts();

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
        {cartList.length === 0 ? (
          <div className={styles.emptyContainer}>
            <h2>Your Cart is Empty</h2>
            <Lottie className={styles.emptyItem} animationData={animationData}/>
          </div>
        ) : (
          <Form method="POST">
            <input
              type="text"
              placeholder="Full Name"
              required
              name="FullName"
            />
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
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  fontWeight: "600",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                Enter Correct Ph. no
              </p>
            ) : (
              ""
            )}

            <input
              type="number"
              name="Backup_PhNo"
              placeholder="Backup Ph. No"
              required
              onChange={(e) =>
                Number(e.target.value) > 0
                  ? setCorrectNoSe(validatePhoneNumber(Number(e.target.value)))
                  : ""
              }
            />
            {!correctNoSe ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  fontWeight: "600",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                Enter Correct Ph. no
              </p>
            ) : (
              ""
            )}
            <input type="text" placeholder="Address" required name="Address" />
            <input type="text" placeholder="State" required name="State" />
            <input
              type="text"
              placeholder="Nearest Road"
              required
              name="NearestRoad"
            />
            <input type="number" placeholder="Enter PIN" required name="Pin" />
            <input type="text" placeholder="City" required name="ciry" />
            <input type="number" placeholder="House Number" required />
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
  const data = Object.fromEntries(formData);

  await localStorage.setItem("orderDetails", JSON.stringify(data));
  return redirect(`/orderPayment`);
}

export default CreateOrder;
