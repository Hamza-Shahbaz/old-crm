import React from "react";
import * as images from "../../config/images";
import CategoryButton from "../button/CategoryButton";
import { useNavigate } from "react-router-dom";

function ConfirmBody() {
  const navigate = useNavigate();

  return (
    <section className="cart my-5">
      <div className="container">
        <div className="row align-items-center text-center justify-content-center">
          <div className="col-xl-4 col-lg-9 col-md-12 col-sm-12 col-xs-12">
            <div className="cart-sec">
              <img
                src={images.confirmOrderImage}
                className="w-100  confirm-edited"
              />
            </div>
          </div>
        </div>
        <div className="row align-items-center text-center justify-content-center">
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-xs-12">
            <div className="cart-sec">
              <h1>Your Order is Confirmed</h1>
              <p></p>
              <CategoryButton
                buttonName={"Continue Shopping"}
                isIcon={true}
                className="btn btn-continue"
                onClick={() => navigate("/")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConfirmBody;
