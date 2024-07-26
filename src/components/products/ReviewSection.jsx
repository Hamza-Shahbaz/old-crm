import React, { useEffect, useState } from "react";
import ReviewsItem from "./ReviewsItem";
import ProductDescription from "./ProductDescription";
import { useDispatch, useSelector } from "react-redux";
import ProductInfo from "./ProductInfo";
import { BounceLoader } from "react-spinners";
import CategoryButton from "../button/CategoryButton";
import ReactStars from "react-rating-stars-component";
import {
  fetchProductReviewPermission,
  handleReviewsData,
} from "../../redux/actions/CategoryActions";
import CustomLoader from "../toast/CustomLoader";
import { toast } from "react-toastify";
import { MyToast } from "../toast/MyToast";
import { useParams } from "react-router-dom";
import { RESET_REVIEW_PERMISSION } from "../../redux/constant/constants";

function Review() {
  const [isSectionShow, setIsSectionShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loginData = useSelector((state) => state.AuthReducerData.loginUser);
  const token = loginData?.token;

  const params = useParams();

  const dispatch = useDispatch();
  const singleProduct = useSelector(
    (state) => state.singleProductReducer.product
  );

  const productID = useSelector(
    (state) =>
      state?.singleProductReducer.product?.product_head?.[0]?.product_id
  );

  const [reviewData, setReviewData] = useState({
    rating: "",
    comment: "",
  });

  useEffect(() => {
    if (!token) {
      return;
    }

    if (params?.id) {
      dispatch({ type: RESET_REVIEW_PERMISSION });
      dispatch(fetchProductReviewPermission(params.id, token));
    }
  }, [params?.id]);

  let reviewPermission = useSelector(
    (state) => state?.setProductReviewPermission?.reviewPermission
  );

  return (
    <section className="reviews m-5 ">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <nav>
              <div
                className={
                  loginData && loginData?.token
                    ? "row align-items-center"
                    : null
                }
              >
                <div
                  className={
                    loginData && loginData?.token
                      ? "nav nav-tabs col-lg-10 col-md-9 col-xl-10"
                      : "nav nav-tabs"
                  }
                  id="nav-tab"
                  role="tablist"
                >
                  <button
                    className="nav-link active"
                    id="nav-home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#product-description"
                    type="button"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    PRODUCT DESCRIPTION
                  </button>
                  <button
                    className="nav-link"
                    id="nav-profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#product-information"
                    type="button"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    INFORMATION
                  </button>
                  <button
                    className="nav-link"
                    id="nav-contact-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#reviews"
                    type="button"
                    role="tab"
                    aria-controls="nav-contact"
                    aria-selected="false"
                  >
                    REVIEWS
                  </button>
                </div>

                {loginData && token && (
                  <div className="col-lg-2 col-md-3 col-xl-2 d-flex reviewButtonStyle">
                    {reviewPermission && (
                      <CategoryButton
                        buttonName={
                          isSectionShow ? "Cancel Review" : "Write a Review"
                        }
                        className="btn log-info-btn btn-continue"
                        style={{ padding: "8px 10px" }}
                        onClick={() => {
                          setIsSectionShow(!isSectionShow);
                          setReviewData({rating: "", comment: ""});
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="product-description"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <div className="row mt-3">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <ProductDescription>
                      {singleProduct && singleProduct?.product_head[0]
                        ? singleProduct?.product_head[0]?.ldesc
                        : "Long description not described yet"}
                    </ProductDescription>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="product-information"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
              >
                <div className="row mt-3">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    {singleProduct ? (
                      <ProductInfo
                        attributes={singleProduct.attribute_payload}
                      />
                    ) : (
                      <div
                        style={{
                          backgroundColor: "",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <BounceLoader size={35} color="#2e3192" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="reviews"
                role="tabpanel"
                aria-labelledby="nav-contact-tab"
              >
                <div className="row mt-2">
                  {singleProduct ? (
                    singleProduct?.product_reviews.length !== 0 ? (
                      singleProduct?.product_reviews.map((review, index) => (
                        <ReviewsItem
                          key={index}
                          date={review?.created_at || ""}
                          rating={review?.star_rating || 0}
                          reviews={review?.comment || ""}
                          verified={true}
                          name={review?.customer_name}
                        />
                      ))
                    ) : (
                      <div
                        style={{
                          backgroundColor: "",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: "10px",
                        }}
                      >
                        <p className="reviewTextStyle">
                          No Product reviews yet
                        </p>
                      </div>
                    )
                  ) : (
                    <div
                      style={{
                        backgroundColor: "",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <BounceLoader size={35} color="#2e3192" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {isSectionShow ? (
          <div
            className="mt-4"
            style={{
              border: "1px solid rgb(163 164 206)",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <div>
              <h4 className="ratingHeadingStyle mx-1">RATING</h4>
              <div className={"mt-2"}>
                <span className="">
                  <ReactStars
                    count={5}
                    size={15}
                    value={reviewData?.rating}
                    edit={true}
                    isHalf={false}
                    char={<i className="fa-solid fa-star"></i>}
                    activeColor="#FD5F12"
                    onChange={(starsRating) => {
                      setReviewData({ ...reviewData, rating: starsRating });
                    }}
                  />
                </span>
              </div>
            </div>

            <div
              className="mt-3"
              style={{ borderTop: ".5px solid #ECECEC", paddingTop: "10px" }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <h4 className="ratingHeadingStyle mx-1">REVIEW</h4>
                <p
                  style={{ marginLeft: "auto" }}
                  className="ratingHeadingStyle1 pt-2"
                >
                  {reviewData?.comment?.length
                    ? reviewData?.comment?.length + " / 100"
                    : "0 / 100"}
                </p>
              </div>

              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">
                <textarea
                  className={"form-control address-input review-input"}
                  placeholder={"Write your Review here"}
                  rows={5}
                  maxLength={100}
                  value={reviewData?.comment}
                  onChange={(txt) => {
                    // console.log("txt", txt);
                    setReviewData({ ...reviewData, comment: txt.target.value });
                  }}
                />
              </div>

              <div className="centerButton">
                <CategoryButton
                  buttonName={
                    isLoading ? (
                      <CustomLoader size={10} className={"loaderStyle mb-3"} />
                    ) : (
                      "Submit Review"
                    )
                  }
                  className={"btn btn-black-outline1 mt-2 reviewButtonWidth"}
                  style={{ padding: "12px" }}
                  type={"button"}
                  onClick={() => {
                    const isEmpty = /^\s*$/;

                    if (isEmpty.test(reviewData?.rating)) {
                      MyToast("Rating is required", "error");
                      toast.clearWaitingQueue();
                      return;
                    }
                    setIsLoading(true);
                    dispatch(
                      handleReviewsData(
                        productID,
                        reviewData,
                        token,
                        setIsLoading,
                        setIsSectionShow,
                        setReviewData
                      )
                    );
                  }}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default Review;
