import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import AccountBody from "../../components/account/AccountBody";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  handleInfoUpdateClear,
  logoutHandlerAction,
} from "../../redux/actions/AuthAction";
import {
  clearOrderDataHandler,
  clearSaveAddressDataHandler,
  clearShipAddressHandler,
  handleAddressId,
} from "../../redux/actions/OrderAction";
import { clearCart } from "../../redux/actions/CategoryActions";

function MyAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function logoutHandler() {
    navigate("/");
    dispatch(logoutHandlerAction());
    dispatch(handleAddressId(""));
    dispatch(clearOrderDataHandler());
    dispatch(clearCart());
    dispatch(clearSaveAddressDataHandler());
    dispatch(handleInfoUpdateClear());
    dispatch(clearShipAddressHandler());
  }

  return (
    <div>
      <Header />
      <AccountBody logoutHandler={logoutHandler} />
      <Footer />
    </div>
  );
}

export default MyAccount;
