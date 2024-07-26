import React, { useEffect, useState } from "react";
import * as images from "../../../config/images";
import PaymentAddSmallInput from "./PaymentAddSmallInput";
import PaymentAddLargeInput from "./PaymentAddLargeInput";
import { MyToast, toast } from "../../toast/MyToast";

function PaymentAdd({ onGetCardData, onCardValidation }) {
  const [addPaymentMethod, setAddPaymentMethod] = useState({
    card_title: "",
    card_number: "",
    expiry_at: "",
    cvc: "",
  });

  const AddPaymentMethodHandler = (val, fieldName) => {
    switch (fieldName) {
      case "Name on card":
        if (val === "" || /^[a-zA-Z\s]+$/.test(val)) {
          if (val.length < 40) {
            setAddPaymentMethod((prev) => ({ ...prev, card_title: val }));
          } else {
            MyToast("Maximum length for card name exceeded", "error");
          }
        } else {
          MyToast(
            "Card name should contain only alphabetic characters",
            "error"
          );
        }
        toast.clearWaitingQueue();
        break;
      case "Card Number":
        if (val.length < 15) {
          setAddPaymentMethod((prev) => ({ ...prev, card_number: val }));
        } else {
          // Handle the case when the card number length exceeds 15 characters
        }
        break;

      case "Expiry":
        // Remove non-numeric characters and split into month and year parts
        let formattedValue = val.replace(/\D/g, "");
        let month = formattedValue.slice(0, 2);
        let year = formattedValue.slice(2, 4);

        if (month.length === 2 && formattedValue.length < 6) {
          month += "/";
        }

        setAddPaymentMethod((prev) => ({ ...prev, expiry_at: month + year }));
        break;

      case "CVC":
        if (val.length < 4) {
          setAddPaymentMethod((prev) => ({ ...prev, cvc: val }));
        } else {
          // Handle the case when the CVC length exceeds 4 characters
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    onGetCardData(addPaymentMethod);
  }, [addPaymentMethod]);

  return (
    <div className="card-sec-body ">
      <div className="form-check-inline d-flex justify-content-between align-items-center m-0">
        <label className="customradio">
          <div className="card-style" style={{ padding: 3 }}>
            <span className="radiotextsty">Pay with Card</span>
          </div>
          <input type="radio" name="radio-expire" defaultChecked="checked" />
          <span className="checkmark s-top" />
        </label>
        <div>
          <img src={images?.visaImage} />
          <img src={images?.stripeImage} />
          <img src={images?.mastercardImage} />
        </div>
      </div>
      <div className="row mt-2">
        <PaymentAddLargeInput
          onChange={AddPaymentMethodHandler}
          label="Name on card"
          placeholder="Name"
          type={"text"}
          value={addPaymentMethod.card_title}
        />
        <PaymentAddSmallInput
          onChange={AddPaymentMethodHandler}
          label="Expiry"
          placeholder="mm/yy"
          type={"text"}
          value={addPaymentMethod.expiry_at}
        />
        <PaymentAddLargeInput
          responsiveSize={"col-xl-9"}
          label="Card Number"
          placeholder="0000 0000 0000 0000"
          type={"number"}
          onChange={AddPaymentMethodHandler}
          value={addPaymentMethod?.card_number}
        />
        <PaymentAddSmallInput
          onChange={AddPaymentMethodHandler}
          label="CVC"
          // id="cvc"
          placeholder="CVC"
          type={"number"}
          value={addPaymentMethod.cvc}
        />
      </div>
    </div>
  );
}

export default PaymentAdd;
