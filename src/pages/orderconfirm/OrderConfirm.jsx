// src/components/Home.js
import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import ConfirmBody from "../../components/confirm/ConfirmBody";

const OrderConfirm = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   window.addEventListener("popstate", onBackButtonEvent);

  //   window.scrollTo({
  //     top: 0,
  //     behavior: "instant",
  //   });
  // }, []);

  // const onBackButtonEvent = (e) => {
  //   e.preventDefault();
  //   navigate("/");
  // };


 
  // useEffect(() => {
  //   window.addEventListener("popstate", onBackButtonEvent);

  //   window.scrollTo({
  //     top: 0,
  //     behavior: "instant",
  //   });
    
  //   // Cleanup function
  //   return () => {
  //     window.removeEventListener("popstate", onBackButtonEvent);
  //   };
  // }, []);


  const onBackButtonEvent = (e) => {
    e.preventDefault();
    navigate("/");
  };


  return (
    <div>
      <Header />
      <ConfirmBody />
      <Footer />
    </div>
  );
};

export default OrderConfirm;
        