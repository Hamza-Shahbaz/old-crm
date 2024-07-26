import React from "react";

function PaymentAddLargeInput({
  label,
  id,
  placeholder,
  type,
  maxLength,
  onChange,
  value,
  responsiveSize,
}) {
  return (
    <div
      className={`col-xl-9 ${responsiveSize} col-lg-6 col-md-6 col-sm-12 col-xs-12`}
    >
      <div className="paymentInput mb-3">
        <label htmlFor={id} className="px-1">
          {label}
        </label>
        <input
          type={type}
          className="form-control card-input"
          name={id}
          id={id}
          autoComplete="cc-csc"
          placeholder={placeholder}
          required=""
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value, label)}
          value={value}
        />
      </div>
    </div>
  );
}

export default PaymentAddLargeInput;
