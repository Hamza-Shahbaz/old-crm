import React from "react";

function CartHead({ heading, location, cartDescription }) {
  return (
      <div className="row align-items-center justify-content-center">
        <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 col-xs-12 col-6">
          <div className="section-title">
            <h1 className="mb-2">{heading}</h1>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12 col-6">
          <div className="section-right text-end">
            <h2>{location}</h2>
          </div>
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="section-title">
            <p className="text-black">{cartDescription}</p>
          </div>
        </div>
      </div>
  );
}

export default CartHead;
