import React from "react";
import { PropagateLoader } from "react-spinners";

function CustomLoader({ size, className, style, color }) {
  return (
    <div className={className}>
      <PropagateLoader size={size} color={color || "#708090"}  style={style} />
    </div>
  );
}

export default CustomLoader;
