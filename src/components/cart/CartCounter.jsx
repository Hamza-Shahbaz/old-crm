import React from "react";
import { IoMdAdd } from "react-icons/io";
import { TiMinus } from "react-icons/ti";

function CartCounter({ noOfcartItems }) {
  return (
    <div className="input-group">
      <span className="input-group-btn">
        <button type="button" className="btn btn-circle">
          <TiMinus size={15} />
        </button>
      </span>
      <input
        type="text"
        className="quantity"
        id="quantity"
        defaultValue={noOfcartItems}
      />
      <span className="input-group-btn">
        <button type="button" className="btn btn-circle">
          <IoMdAdd size={16} />
        </button>
      </span>
    </div>
  );
}

export default CartCounter;
