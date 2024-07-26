import React from "react";

function ProductButton({ divClass, label, idoption, inputClass, labelClass, onClick,key}) {
  return (
    <div  className={divClass}>
      <input
        type="radio"
        className={inputClass}
        name="options"
        id={idoption}
        autoComplete="off"
        onClick={onClick}
        key={key}
      />
      <label className={labelClass} htmlFor={idoption}>
        {label}
      </label>
    </div>
  );
}

export default ProductButton;
