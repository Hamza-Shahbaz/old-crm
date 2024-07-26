import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import AccountPolicy from "../../components/account/AccountPolicy";

function ReturnPolicy() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div>
      <Header />
      <AccountPolicy head={2}/>
      <Footer />
    </div>
  );
}

export default ReturnPolicy;
