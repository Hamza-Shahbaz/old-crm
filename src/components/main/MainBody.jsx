import React, { useEffect, useState } from "react";
import TabsSection from "../container/TabsSection";
import SliderSection from "../container/SliderSection";
import LatestSection from "../container/LatestSection";
import SaleSection from "../container/SalesSection";
import { useSelector, useDispatch } from "react-redux";
import { fetchSliderRequest } from "../../redux/actions/SliderActions";
import { BaseUrl, EndPoints } from "../../utils/Api";
import CategoryLists from "../category/CategoryLists";
import {
  handleLatestProductsData,
  handlePostersData,
} from "../../redux/actions/CategoryActions";
// import Practise from "../container/Practise";

function MainBody() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const latestMobSliderData = useSelector(
    (state) => state.SliderReducerData.sliders.BEST_MOBILE.sliderData.data
  );

  useEffect(() => {
    dispatch(
      fetchSliderRequest(
        "BEST_MOBILE",
        `${BaseUrl}${EndPoints.products}`,
        setIsLoading
      )
    );
  }, []);

  //SELECTOR & USEEFFECT FOR LATEST PRODUCTS API  //START

  const latestProductsData = useSelector(
    (state) => state?.latestProductsReducerData?.latestProducts
  );

  useEffect(() => {
    dispatch(handleLatestProductsData());
  }, []);

  //END

  //SELECTOR & USEEFFECT FOR POSTERS PRODUCTS API  //START

  const postersData = useSelector(
    (state) => state?.postersReducerData?.posters
  );

  useEffect(() => {
    if (!postersData?.posters_data) {
      dispatch(handlePostersData());
    }
  }, []);

  //END

  const bestSellingProducts = useSelector(
    (state) =>
      state.SliderReducerData.sliders.BEST_SELLING_PRODUCTS.sliderData.data
  );

  useEffect(() => {
    dispatch(
      fetchSliderRequest(
        "BEST_SELLING_PRODUCTS",
        `${BaseUrl}${EndPoints.best_selling_products}`,
        setIsLoading
      )
    );
  }, []);

  return (
    <>
      <SliderSection />
      <TabsSection />
      {/* <Practise /> */}
      <LatestSection
        isLoading={{ isLoading: isLoading, color: "#fbb53b" }}
        data={bestSellingProducts?.products_data}
        head={"Best Selling Products"}
        tag={"Explore our hot-selling branded products"}
        viewButton={true}
        isRating={true}
        isEndIcon={true}
      />

      {latestProductsData?.products_data ? (
        <CategoryLists
          headingShow={true}
          headingName={"Latest Products"}
          className={"pt-0"}
          data={latestProductsData?.products_data}
          FeaturedFlag={false}
        />
      ) : null}

      <SaleSection data={postersData?.posters_data} />
    </>
  );
}

export default MainBody;
