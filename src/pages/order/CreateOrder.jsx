import { Form } from "react-router-dom";
import styles from "./CreateOrder.module.css";
import { useState } from "react";

function CreateOrder() {
  const [correctNo, setCorrectNo] = useState(true);
  const [correctNoSe, setCorrectNoSe] = useState(true);
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
        <Form>
          <input type="text" placeholder="Full Name" required />
          <input
            type="number"
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
            placeholder="Backup Ph. no"
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
          <input type="text" placeholder="Address" required />
          <input type="text" placeholder="State" required />
          <input type="text" placeholder="Nearest Road" required />
          <input type="number" placeholder="Enter PIN" required />
          <input type="text" placeholder="City" required />
          <input type="number" placeholder="House Number" required />
          <button>Order Place</button>
        </Form>
      </div>
    </div>
  );
}

export default CreateOrder;
