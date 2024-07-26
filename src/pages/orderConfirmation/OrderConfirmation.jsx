import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ConfirmOrder from "../../components/account/ConfirmOrder";

function OrderConfirmation() {
  return (
    <div>
      <Header />
      <ConfirmOrder isShownAll={true} />
      <Footer />
    </div>
  );
}

export default OrderConfirmation;
