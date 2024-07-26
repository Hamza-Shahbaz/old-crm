import React, { useEffect, useLayoutEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import AddressForm from "../../components/checkoutForm/address/AddressForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOrderDataRequest } from "../../redux/actions/OrderAction";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state?.handleCartItem?.addToCart);
  const isCartEmpty = cartData.length === 0;
  const [showContent, setShowContent] = useState(false);
  const loginData = useSelector((state) => state.AuthReducerData.loginUser);


  
  useEffect(() => {
    const currentPathname = window.location.pathname.toLowerCase();
    if (isCartEmpty && currentPathname === "/checkout") {
      navigate("/mycart");
    } else {
      setShowContent(true);
    }
  }, [isCartEmpty, navigate]);


  // useLayoutEffect(() => {
  //   if (!showContent) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "unset";
  //   }
  //   return () => {
  //     document.body.style.overflow = "unset";
  //   };
  // }, [showContent]);

  // if (!showContent) {
  //   return null; // Or a loading spinner or any other placeholder
  // }



  useEffect(() => {
    if (loginData && loginData?.token) {
      dispatch(fetchOrderDataRequest(loginData.token));
    }
  }, [loginData]);



  return (
    <>
      <Header />
      <AddressForm />
      <Footer />
    </>
  );
}

export default Checkout;
