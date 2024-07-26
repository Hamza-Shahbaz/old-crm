
import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

function NoInternet() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Result
        status="404"
        // title="404"
        subTitle="No Internet detected"
        className="styleBackBtn "
    
      />
      <Footer />
    </>
  );
}

export default NoInternet;
