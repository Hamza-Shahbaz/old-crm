import React, { useState } from "react";
import { useSelector } from "react-redux";

function BreadcrumbItem({ onChange, activeSection, shipType }) {
  const address = useSelector((state) => state.OrderReducerData.addressData);
  const [localActive, setLocalActive] = useState(activeSection);
  // console.log(localActive);
  // console.log(activeSection);

  return (
    <div className="checkout-right">
      <ul
        className="nav nav-pills justify-content-end position-relative"
        id="pills-tab"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${
              activeSection === "address" ? "active" : ""
            }`}
            onClick={() => {
              onChange("address");
              setLocalActive("address");
            }}
            id="pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#address"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            Address
          </button>
        </li>

        <li className="nav-item" role="presentation">
          <button
            // disabled={!address?.billing_address_id} // Disable the button if address_id is not available
            disabled={localActive === "address" &&  activeSection === "payment" ? false : true}
            className={`nav-link ${
              activeSection === "shipping" ? "active" : ""
            }`}
            onClick={() => {
              onChange("shipping");
              setLocalActive("shipping");
            }}
            id="pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#address"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            Shipping
          </button>
        </li>

        <li className="nav-item" role="presentation">
          <button
            // disabled={!(!!address?.billing_address_id && !!shipType)}
            disabled={(localActive === "address" ||  localActive === "shipping") && true}
            className={`nav-link ${
              activeSection === "payment" ? "active" : ""
            }`}
            onClick={() => {
              onChange("payment");
              setLocalActive("payment");
            }}
            id="pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#address"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            Payment
          </button>
        </li>
      </ul>
    </div>
  );
}

export default BreadcrumbItem;
