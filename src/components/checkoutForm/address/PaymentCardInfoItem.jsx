import React, { useState } from "react";
import CategoryButton from "../../button/CategoryButton";
import MainInput from "../../input/MainInput";

function PaymentCardInfoItem({
  cardNumber,
  expiryDate,
  image,
  isInfo,
  isEndInfo,
  shippingTime,
  shippingName,
  isContent,
  checked,
  onChange,
  value,
  type,
  onRemoveCard,
}) {
  return (
    <div className="payment-body ">
      <div className="form-check-inline d-flex justify-content-between align-items-center m-0">
        <MainInput
          className={"form-check my-2"}
          inputClassName={"form-check-input customStyleCheckbox"}
          inputHeading={"Free Regular Shipment"}
          type={"checkbox"}
          htmlFor={"default"}
          labelclassName={"form-check-label"}
          onChange={onChange}
          isValue={value}
          isChecked={checked}
        />

        {isEndInfo ? (
          <>
            <CategoryButton
              buttonName={"Remove"}
              className={"remove"}
              onClick={() => onRemoveCard(value)}
              style={{
                border: "none",
                backgroundColor: "white",
                paddingRight: 10,
              }}
              type={"button"}
            />
          </>
        ) : (
          <>
            {isContent ? (
              <input
                type={type}
                className="calender"
                required=""
                style={{
                  marginRight: 10,
                }}
              />
            ) : (
              <span className="radiotextsty" style={{ paddingRight: 10 }}>
                {shippingTime}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentCardInfoItem;
