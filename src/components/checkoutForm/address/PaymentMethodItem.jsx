import React from "react";

function PaymentMethodItem({ paymentPlatform, desc, platformLogo }) {
  return (
    <div className="other-payment">
      <div className="form-check-inline d-flex justify-content-between align-items-center m-0">
        <label className="customradio" id="apple-pay">
          <span className="radiotextsty">{paymentPlatform}</span>
          <p className="mb-0">{desc}</p>
          <input type="radio" name="radio" id="redirect" />
          <span className="checkmark s-top" />
        </label>
        <img src={platformLogo} />
      </div>
    </div>
  );
}

export default PaymentMethodItem;
