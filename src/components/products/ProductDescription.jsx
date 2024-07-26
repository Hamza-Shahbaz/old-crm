import React from "react";

function ProductDescription({children}) {
  return (
    <p className="desc">
     {children}
    </p>
  );
}

export default ProductDescription;
