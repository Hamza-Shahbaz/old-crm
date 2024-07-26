import React from "react";

const PaymentAddSmallInput = ({
  label,
  id,
  placeholder,
  type,
  maxLength,
  onChange,
  value,
}) => {
  return (
    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-xs-12">
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
};

export default PaymentAddSmallInput;
