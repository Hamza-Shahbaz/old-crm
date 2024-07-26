import React from "react";
import Header from "../../components/header/Header";
import ProductDetail from "../../components/products/ProductDetail";
import LatestSection from "../../components/container/LatestSection";
import BrowseSection from "../../components/container/BrowseSection";
import Footer from "../../components/footer/Footer";
import Review from "../../components/products/ReviewSection";
import { BaseUrl, EndPoints } from "../../utils/Api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSliderRequest } from "../../redux/actions/SliderActions";
import { useState } from "react";

function Products() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  const productID = useSelector(
    (state) =>
      state?.singleProductReducer.product?.product_head?.[0]?.product_id
  );

  // console.log(productID);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    if (productID) {
      fetch(
        `${BaseUrl}${EndPoints.similar_products}${productID}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setData(result);
          dispatch(
            fetchSliderRequest("SIMILAR_PRODUCTS", result, setIsLoading)
          );
        })
        .catch((error) => console.error(error));
    }
  }, [productID, dispatch]);

  return (
    <div>
      <Header />
      <ProductDetail />
      <Review />
      <LatestSection
        isLoading={{ isLoading: isLoading, color: "#fbb53b" }}
        data={data?.data?.products_data}
        head={"Similar Products"}
        isRating={true}
        isEndIcon={true}
        discount={true}
      />
      {/* <BrowseSection /> */}
      <Footer />
    </div>
  );
}

export default Products;
