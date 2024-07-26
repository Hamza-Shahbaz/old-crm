import React, { useState } from "react";
// import "../css/globalStyle.css";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import unfavorite from "../../assets/images/nonfavorite.png";
import favoriteOutline from "../../assets/images/favoriteOutlined.png";
import simpleCart from "../../assets/images/cartsimple.png";
import cartFilled from "../../assets/images/cartFiiled.png";
import { TbListDetails } from "react-icons/tb";
import dummmyImage from "../../assets/images/no-image1.png";
import { amoutRateConversion } from "../../utils/Helper";
import { useSelector } from "react-redux";
import { Button, Tooltip } from "antd";

const LatestSectionItem = ({
  title,
  description,
  images,
  price,
  discount,
  onClick,
  rating,
  reviews,
  className,
  isRating,
  classPara,
  isDiscount,
  id,
  productName,
  onIdGet,
  onAddtoFavorite,
  isFavouriteIcon,
  isEndIcon,
  isFavorite,
  starRating,
  isCartIcon,
  isCart,
  onRemoveCart,
  showDetailsIcon,
}) => {
  const handleImageError = (e) => {
    e.target.onerror = null; // prevent infinite loop
    e.target.src = dummmyImage;
  };

  const [hover, setHover] = useState(false);
  const currencyRate =
    useSelector(
      (state) => state.siteSettingReducerData?.currentCurrency?.conversion_rate
    ) || 1;
  const currencyCode =
    useSelector(
      (state) =>
        state.siteSettingReducerData?.currentCurrency?.currency_iso_code
    ) || "USD";

  // const truncatedDescription =
  //   prodDescription.length > 35
  //     ? prodDescription.substring(0, 40) + "..."
  //     : prodDescription;

  return (
    <div className="row justify-content-center mt-2" key={id}>
      <div
        className="col-12 col-sm-6 col-md-4 m-1 p-3 card sliderItemStyle shadowCard1"
        onClick={onIdGet.bind(this, id, productName)}
        style={{ minWidth: 222 }}
      >
        <div
          className={`d-flex align-items-center justify-content-center ${className}`}
        >
          <img
            className="selling-img p-0 slider-img"
            src={images ? images : dummmyImage}
            // alt="no product image"
            onError={handleImageError}
          />
        </div>

        {isRating ? (
          <>
            <div className="d-flex align-items-center justify-content-center p-2">
              <span>
                <ReactStars
                  className="me-2 rating"
                  count={5}
                  size={13}
                  value={starRating}
                  edit={false}
                  isHalf={true}
                  char={<i className="fa-solid fa-star"></i>}
                  activeColor="#FD5F12"
                />
              </span>

              <span className="rating pt-1 px-1">
                {reviews ? `${5}` : null}
              </span>
            </div>
          </>
        ) : null}

        <div className="card-body p-0">
          {title.length > 40 ? (
            <Tooltip title={title} color="#77878f" placement="bottom" key={id}>
              <p
                className={`card-text ${classPara}`}
                style={{ textAlign: "center" }}
              >
                <Link
                  className="text-decoration-none desc-dimension"
                  tabIndex="-1"
                  onClick={onClick}
                >
                  {title.substring(0, 40) + "...."}
                </Link>
              </p>
            </Tooltip>
          ) : (
            <p
              className={`card-text ${classPara}`}
              style={{ textAlign: "center" }}
            >
              <Link className="text-decoration-none desc-dimension">
                {title}
              </Link>
            </p>
          )}

          {isDiscount ? (
            <>
              <div className="d-flex justify-content-center align-items-center f-top">
                <span
                  className="btn-clear px-3"
                  style={{ color: "#2e3192", fontSize: 15 }}
                >
                  Deal
                </span>
                <span
                  className="btn-clear"
                  style={{
                    color: "#fff",
                    fontSize: 15,
                    backgroundColor: "#2e3192",
                  }}
                >
                  Upto 40% OFF
                </span>
              </div>
            </>
          ) : (
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="product-price">
                {price
                  ? amoutRateConversion(price, currencyRate, currencyCode)
                  : "0"}
              </span>
              <span className="save-price">Save {discount}</span>
            </div>
          )}

          {isEndIcon ? (
            <>
              {isFavouriteIcon && !showDetailsIcon && (
                <div className="d-flex justify-content-end pb-3  ">
                  <div className="mx-3">
                    <div
                      className="heart-icon-container mx-1 "
                      onClick={onAddtoFavorite}
                    >
                      <div
                        className="background-circle"
                        style={{
                          alignItems: "center",
                          border: "none",
                        }}
                      >
                        <div>
                          <img
                            style={{ height: 30, width: 30 }}
                            src={isFavorite ? favoriteOutline : unfavorite}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {isCartIcon && !showDetailsIcon && (
                    <div className="mx-3">
                      <div className="heart-icon-container">
                        <div
                          className="background-circle"
                          onClick={onRemoveCart}
                          style={{
                            alignItems: "center",
                            border: "none",
                          }}
                        >
                          <div>
                            <img
                              style={{ height: 30, width: 30 }}
                              src={isCart ? cartFilled : simpleCart}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {showDetailsIcon ? (
                <div className="d-flex justify-content-end pb-3  ">
                  <div className="mx-3">
                    <div
                      className="heart-icon-container mx-1 "
                      onClick={onIdGet.bind(this, id, productName)}
                    >
                      <div
                        className="background-circle"
                        style={{
                          alignItems: "center",
                          border: "none",
                        }}
                      >
                        <div>
                          <TbListDetails
                            style={{ width: "20px", height: "20px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LatestSectionItem;
