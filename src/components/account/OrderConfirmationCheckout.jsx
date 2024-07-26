import React from "react";
import { symbolAmount, valueRateConversion } from "../../utils/Helper";

function OrderConfirmationCheckout(props) {

  const {
    order_id,
    customer_id,
    order_status_id,
    payment_method,
    order_type,
    sub_total,
    discount,
    coupon_amount,
    net_total,
    shipping_address_id,
    billing_address_id,
    created_at,
    first_name,
    last_name,
    email,
    phone,
    type,
    default_address_id,
    num_of_products,
    currencyCode,
    order_serial_no
  } = props;  

  const dateObject = new Date(created_at);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;

  const renderValue = (value) => {
    if(!currencyCode) {
      return value
    }
    if(!value) {
      return symbolAmount(parseInt(0).toFixed(2), currencyCode)
    }
    return symbolAmount(value.toFixed(2),currencyCode)
  };

  return (
    <div className="cart-right">
      <h2 className="pb-1">Invoice</h2>

      <div className="card-right-body">
        <p>Order ID</p>
        <span>{order_serial_no}</span>
      </div>

      <div className="card-right-body">
        <p>Time Order</p>
        <span>{formattedDate}</span>
      </div>
      <div className="card-right-body">
        <p>Payment Method</p>
        <span>{payment_method}</span>
      </div>
 
      <div className="card-right-body">
        <p>Sub Total</p>
        <span>{renderValue(sub_total)}</span>
      </div>
      <div className="card-right-body">
        <p>Discount</p>
        <span>{renderValue(discount)}</span>
      </div>
      <div className="card-right-body">
        <p>Coupon Amount</p>
        <span>{renderValue(coupon_amount)}</span>
      </div>

      <hr className="py-1" />

      <div className="card-right-body">
        <p className="totalTextStyle">TOTAL</p>
        <span>{renderValue(net_total)}</span>
      </div>
    </div>
  );
}

export default OrderConfirmationCheckout;
