import React, { useEffect, useMemo, useState } from "react";
import LatestSection from "../../container/LatestSection";
import { BaseUrl, EndPoints } from "../../../utils/Api";
import FeaturedCategory from "./FeaturedCategory";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSliderRequest } from "../../../redux/actions/SliderActions";
import { SUB_CATEGORY_BREADCRUMB } from "../../../redux/constant/constants";
import Skeleton from "react-loading-skeleton";
import { PropagateLoader } from "react-spinners";

function SubCategorySection() {
  const [isFeaturedLoading, setIsFeaturedLoading] = useState(false);
  const [isLighteningLoading, setIsLighteningLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const location = useLocation();

  const featuredDeals = useSelector(
    (state) => state.SliderReducerData.sliders.FEATURED_DEALS.sliderData.data
  );

  //for main category
  const categorydata = useSelector(
    (state) => state?.categoryReducerData?.categories
  );

  // //for sub category
  const subCategoriesArray = categorydata.map(
    (category) => category?.sub_category
  );

  useEffect(() => {
    if (params?.id && categorydata.length !== 0) {
      let myCategory = categorydata.filter(
        (sub_category) => sub_category.category_id == params.id
      )[0];
      if (myCategory) {
        dispatch({ type: SUB_CATEGORY_BREADCRUMB, payload: myCategory });
      }
    }
  }, [params?.id, categorydata]);

  //function for id through filter
  const filterIds = subCategoriesArray
    .map((subCategory) => subCategory.map((catproduct) => catproduct))
    .flat();

  let filtered = useMemo(() => {
    return filterIds
      .filter((subCategory) => subCategory !== undefined || null)
      .filter((subCategory) => subCategory?.parent_id === +params?.id);
  }, [params?.id, categorydata, dispatch]);

  const lighteningdeals = useSelector(
    (state) => state.SliderReducerData.sliders.LIGHTENINIG_DEALS.sliderData.data
  );

  useEffect(() => {
    dispatch(
      fetchSliderRequest(
        "FEATURED_DEALS",
        `${BaseUrl}${EndPoints.featured_products}${+params?.id}`,
        setIsFeaturedLoading
      )
    );
  }, [params.id]);

  useEffect(() => {
    dispatch(
      fetchSliderRequest(
        "LIGHTENINIG_DEALS",
        `${BaseUrl}${EndPoints.lightening_products}${+params?.id}`,
        setIsLighteningLoading
      )
    );
  }, [params.id]);

  function fetchProductData([id, name, state]) {
    navigate("/category/" + id, {
      state: { id: id, name: name, state1: location?.state },
    });
  }

  const skeletons = Array.from({ length: 8 }).map((_, index) => (
    <Skeleton
      key={index}
      highlightColor="#e0dfdc"
      circle={true}
      style={{
        height: 120,
        width: 120,
        margin: 20,
      }}
    />
  ));

  return (
    <div>
      {true ? (
        <>
          <FeaturedCategory
            divClassName={"tab-sec styleTabSec mt-3"}
            productIdHandler={fetchProductData}
            filtered={filtered}
            name={"Categories"}
          />

          {isFeaturedLoading ? (
            <div
              style={{
                backgroundColor: "",
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // border: ".5px solid #cccccc",
              }}
            >
              <PropagateLoader size={16} color="#2e3192" />
            </div>
          ) : (
            <>
              {Object.keys(featuredDeals || {})?.length > 0 && (
                <LatestSection
                  isLoading={{ isLoading: isFeaturedLoading, color: "#fbb53b" }}
                  data={featuredDeals?.products_data}
                  head={"Featured Products"}
                  className={"itemStyle"}
                  classPara={"mt-3"}
                  txtStyle={"mt-4 mb-4"}
                  isDiscount={true}
                  isRating={true}
                />
              )}
            </>
          )}

          {isLighteningLoading ? (
            <div
              style={{
                backgroundColor: "",
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // border: ".5px solid #cccccc",
              }}
            >
              <PropagateLoader size={16} color="#2e3192" />
            </div>
          ) : (
            <>
              {Object.keys(lighteningdeals || {})?.length > 0 && (
                <LatestSection
                  isLoading={{
                    isLoading: isLighteningLoading,
                    color: "#fbb53b",
                  }}
                  data={lighteningdeals?.products_data}
                  head={"Lightening Products"}
                  className={"itemStyle"}
                  classPara={"mt-3"}
                  txtStyle={"mt-4 mb-4"}
                  isDiscount={true}
                  isRating={true}
                />
              )}
            </>
          )}
        </>
      ) : null}
    </div>
  );
}

export default SubCategorySection;
