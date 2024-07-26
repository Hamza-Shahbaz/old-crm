import React from "react";

function CategoryButton({
  buttonName,
  className,
  style,
  onClick,
  isIcon,
  iconName,
  disabled,
}) {
  const buttonClass = disabled ? `${className} disabled` : className;
  return (
    <div>
      <button
        type={"button"}
        className={buttonClass}
        onClick={onClick}
        style={style}
        htmlFor="option1"
        disabled={disabled}
      >
        {isIcon ? <span style={{ paddingRight: 5 }}>{iconName}</span> : null}
        {buttonName}
      </button>
    </div>
  );
}

export default CategoryButton;
