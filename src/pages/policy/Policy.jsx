import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import BrowseSection from "../../components/container/BrowseSection";
import Footer from "../../components/footer/Footer";
import AccountPolicy from "../../components/account/AccountPolicy";

function Policy() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div>
      <Header />
      <AccountPolicy head={1} />
      <Footer />
    </div>
  );
}

export default Policy;
