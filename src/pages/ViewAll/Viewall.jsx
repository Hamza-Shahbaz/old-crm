import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { fetchSliderRequest } from "../../redux/actions/SliderActions";
import { BaseUrl, EndPoints } from "../../utils/Api";
import CategoryLists from "../../components/category/CategoryLists";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { breakPoints } from "../../config/data";

function Viewall() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const bestSellingProducts = useSelector(
    (state) =>
      state.SliderReducerData.sliders.BEST_SELLING_PRODUCTS.sliderData.data
  );

  useEffect(() => {
    if (!bestSellingProducts || bestSellingProducts.length === 0) {
      dispatch(
        fetchSliderRequest(
          "BEST_SELLING_PRODUCTS",
          `${BaseUrl}${EndPoints.best_selling_products}`,
          setIsLoading
        )
      );
    }
  }, [bestSellingProducts, dispatch]);

  // const settings = {
  //   arrows: false,
  //   infinite: true,
  //   speed: 3200,
  //   autoplay: true,
  //   autoplaySpeed: 1700,
  //   responsive: [...breakPoints],
  //   slidesToShow: data
  //     ? Object.values(data)?.length > 5
  //       ? 5
  //       : Object.values(data)?.length
  //     : 0,
  //   slidesToScroll: 1,
  // };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <>
      <Header />
      <div className="row d-flex align-items-center justify-content-center my-2">
        {!bestSellingProducts ? (
          <div style={{ width: 100, height: 100 }}>
            <PulseLoader color={'#2e3192'} />
          </div>
        ) : (
          <div>
            {bestSellingProducts ? (
              <CategoryLists
                headingShow={true}
                headingName={"Best Selling Products"}
                className={"pt-0"}
                data={bestSellingProducts?.products_data}
                FeaturedFlag={false}
                allowSorting={true}
                allowListView={false}
              />
            ) : null}
          </div>
        )}
      </div>
      {/* <BrowseSection /> */}
      <Footer />
    </>
  );
}

export default Viewall;
