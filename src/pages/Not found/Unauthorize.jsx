import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

function UnAuthorize() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        className="styleBackBtn"
        extra={
          <Button onClick={() => navigate("/")} className="btn-backHome">
            Back Home
          </Button>
        }
      />
      <Footer />
    </>
  );
}

export default UnAuthorize;
