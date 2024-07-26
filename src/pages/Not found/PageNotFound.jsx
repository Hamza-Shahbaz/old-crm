import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
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

export default PageNotFound;
