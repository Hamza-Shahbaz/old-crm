import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CartBody from "../../components/cart/CartBody";

function MyCart() {
  return (
    <div>
      <Header /> 
      <CartBody isShownAll={true}/>
      <Footer />
    </div>
  );
}

export default MyCart;      
