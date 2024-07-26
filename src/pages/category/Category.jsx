import React from "react";
import Header from "../../components/header/Header";
import CategoryLists from "../../components/category/CategoryLists";
import Footer from "../../components/footer/Footer";
import { useLocation } from "react-router-dom";

function Category() {
  const location = useLocation();

  return (
    <div>
      <Header />
      <CategoryLists
        categoryButton={location?.state?.name && location?.state?.name + " "}
        category={location?.state?.name && location?.state?.name + " "} 
        topSection={true}
        middleSection={true}
        className={"px-10"}
        FeaturedFlag={true}
      />
      <Footer />
    </div>
  );
}

export default Category;
