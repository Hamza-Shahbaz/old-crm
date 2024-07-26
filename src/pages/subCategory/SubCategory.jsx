import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
// import BrowseSection from "../../components/container/BrowseSection";
import Footer from "../../components/footer/Footer";
import SubCategorySection from "../../components/category/subCategories/SubCategorySection";
import CategoryList from "../../components/category/CategoryLists";
// import { useNavigate, useParams } from "react-router-dom";
// import { handleProductsData, resetSubProductData } from "../../redux/actions/CategoryActions";
// import { useDispatch, useSelector } from "react-redux";

function SubCategory() {
  // const dispatch = useDispatch()
  // const params = useParams();
  // const productId = Number(params?.id);

  // const [isLoading,setIsLoading] = useState("")

  // const products = useSelector(
  //   (state) => state?.productReducerData?.product
  // );

  // useEffect(() => {
  //   console.log("here")
  //   if (params?.id) {
  //     dispatch(resetSubProductData());
  //     dispatch(handleProductsData(productId, setIsLoading));
  //   }
  // }, [productId]);

  // console.log(products.length, products.length > 0)

  return (
    <div>
      <Header />
      <div style={{minHeight:"200px"}}>
        <SubCategorySection />
        <CategoryList
          categoryButton={location?.state?.name && location?.state?.name + " "}
          category={location?.state?.name && location?.state?.name + " "}
          topSection={true}
          middleSection={true}
          className={"px-10"}
          FeaturedFlag={false}
          renderOnlyWhenProducts={true}
        />
      </div>
      <Footer />
    </div>
  );
}

export default SubCategory;
