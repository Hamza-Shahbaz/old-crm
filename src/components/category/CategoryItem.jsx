import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import unfavorite from "../../assets/images/nonfavorite.png";
import favoriteOutline from "../../assets/images/favoriteOutlined.png";
import simpleCart from "../../assets/images/cartsimple.png";
import cartFilled from "../../assets/images/cartFiiled.png";
import { TbListDetails } from "react-icons/tb";
import dummmyImage from "../../assets/images/no-image1.png";
import { amoutRateConversion } from "../../utils/Helper";
import { useSelector } from "react-redux";
import { Tooltip } from "antd";

function CategoryItem({
  prodImage,
  starRating,
  prodDescription,
  prodPrice,
  prodDiscount,
  productPrice,
  productDiscount,
  truncatedDescription,
  prodReviews,
  className,
  isEndIcon,
  cardClassName,
  endClassName,
  styles,
  iconClass,
  id,
  productName,
  isFavouriteIcon,
  isCartIcon,
  onAddtoFavorite,
  isFavorite,
  isCart,
  onRemoveCart,
  listView,
  showDetailsIcon,
}) {
  const navigate = useNavigate();

  // const truncatedDescription =
  //   prodDescription.length > 35
  //     ? prodDescription.substring(0, 40) + "..."
  //     : prodDescription;

  // const productPrice =
  //   prodPrice.length > 12 ? prodPrice.substring(0, 12) + ".." : prodPrice;

  // const productDiscount =
  //   prodDiscount.length > 12
  //     ? prodDiscount.substring(0, 12) + ".."
  //     : prodDiscount;

  function getIdHandler(id, productName, event) {
    // console.log(id, productName, "hhugyigyfuyftdtyguhyuthgfhhf");
    event.stopPropagation();
    event.preventDefault();
    navigate("/product/" + "productid=" + id, {
      state: { id: id, title: productName },
    });
  }
  const currencyRate =
    useSelector(
      (state) => state.siteSettingReducerData?.currentCurrency?.conversion_rate
    ) || 1;
  const currencyCode =
    useSelector(
      (state) =>
        state.siteSettingReducerData?.currentCurrency?.currency_iso_code
    ) || "USD";

  const handleImageError = (e) => {
    e.target.onerror = null; // prevent infinite loop
    e.target.src = dummmyImage;
  };

  if (listView && window.innerWidth > 1000) {
    return (
      <div className={className}>
        <div className="list-group rounded-4 shadowCard">
          <Link
            to="#"
            className="list-group-item list-group-item-action"
            onClick={getIdHandler.bind(this, id ? id : "999", productName)}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div className={"col-xl-3 col-lg-3 col-md-3 col-xs-3 col-3"}>
              <img
                className="selling-img listViewImageStyle"
                // style={{ padding: 0, height: "240px", width: "240px" }}
                src={prodImage ? prodImage : dummmyImage}
                onError={handleImageError}
              />
            </div>

            <div
              className={
                "col-xl-7 col-lg-7 col-md-7 col-xs-7 col-7 d-flex align-items-center"
              }
            >
              <div
                className="card-body d-flex flex-column align-items-center justify-content-center"
                style={{ minWidth: "20px" }}
              >
                {truncatedDescription.length > 40 ? (
                  <Tooltip
                    title={truncatedDescription}
                    color="#77878f"
                    placement="bottom"
                  >
                    <p
                      className={`card-textt mb-2`}
                      style={{ textAlign: "center" }}
                    >
                      <Link className="text-decoration-none">
                        {truncatedDescription.substring(0, 40) + "...."}
                      </Link>
                    </p>
                  </Tooltip>
                ) : (
                  <p
                    className={`card-textt mb-2`}
                    style={{ textAlign: "center" }}
                  >
                    <Link className="text-decoration-none">
                      {truncatedDescription}
                    </Link>
                  </p>
                )}
                <span className="">
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
                <span className="rating pt-1 px-1 text-black">
                  {prodReviews}
                </span>
              </div>
            </div>

            <div
              className={
                "col-xl-2 col-lg-2 col-md-2 col-xs-2 col-2 d-flex align-items-center"
              }
            >
              <div
                className={`d-flex flex-column  justify-content-center card-body pt-3 ${iconClass} mr-10`}
              >
                <div className="d-flex justify-content-end flex-column align-items-center">
                  <div
                    className="d-flex justify-content-end align-items-center flex-column"
                    // style={{ marginRight: "13px" }}
                  >
                    <div>
                      <span className="product-price">
                        {amoutRateConversion(
                          productPrice,
                          currencyRate,
                          currencyCode
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="save-price">Save {productDiscount}</span>
                    </div>
                  </div>
                  <div className="d-flex mt-3 " style={{ marginLeft: "3px" }}>
                    {isEndIcon && (
                      <>
                        {isFavouriteIcon && !showDetailsIcon && (
                          <div className="mx-1">
                            <div
                              className="heart-icon-container "
                              onClick={onAddtoFavorite}
                            >
                              <div
                                className="background-circle1"
                                style={{ alignItems: "center", border: "none" }}
                              >
                                <div>
                                  <img
                                    style={{ height: 30, width: 30 }}
                                    src={
                                      isFavorite ? favoriteOutline : unfavorite
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {isCartIcon && !showDetailsIcon && (
                          <div className="mx-1">
                            <div className="heart-icon-container">
                              <div
                                className="background-circle1"
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
                        {showDetailsIcon ? (
                          <div className="">
                            <div
                              className="heart-icon-container"
                              onClick={getIdHandler.bind(
                                this,
                                id ? id : "999",
                                productName
                              )}
                            >
                              <div
                                className="background-circle1"
                                style={{
                                  alignItems: "flex-start",
                                  border: "none",
                                }}
                              >
                                <div>
                                  <TbListDetails
                                    style={{ height: 24, width: 24 }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        className="card productHover shadowCard"
        style={styles}
        onClick={getIdHandler.bind(this, id ? id : "999", productName)}
      >
        <div
          className={`d-flex align-items-center justify-content-center ${cardClassName}`}
        >
          <img
            className="selling-img"
            style={{ padding: 0 }}
            src={prodImage ? prodImage : dummmyImage}
            onError={handleImageError}
          />
        </div>
        <div className={"d-flex align-items-center justify-content-center p-2"}>
          <span className="m-1">
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

          <span className="rating pt-1 px-1">{prodReviews}</span>
        </div>
        <div className={`card-body pt-2 ${iconClass}`}>
          {/* <p className="card-text" style={{ textAlign: "center" }}> */}
          {/* <Link className="text-decoration-none">{truncatedDescription}</Link> */}

          {truncatedDescription.length > 40 ? (
            <Tooltip
              title={truncatedDescription}
              color="#77878f"
              placement="bottom"
            >
              <p className={`card-text`} style={{ textAlign: "center" }}>
                <Link className="text-decoration-none">
                  {truncatedDescription.substring(0, 40) + "...."}
                </Link>
              </p>
            </Tooltip>
          ) : (
            <p className={`card-text`} style={{ textAlign: "center" }}>
              <Link className="text-decoration-none">
                {truncatedDescription}
              </Link>
            </p>
          )}

          <div
            className={`justify-content-between align-items-center mb-3 col-12 d-flex ${endClassName}`}
          >
            <div>
              <span className="product-price">
                {amoutRateConversion(productPrice, currencyRate, currencyCode)}
              </span>
            </div>

            <div>
              <span className="save-price">Save {productDiscount}</span>
            </div>
          </div>
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
                      onClick={getIdHandler.bind(
                        this,
                        id ? id : "999",
                        productName
                      )}
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
}

export default CategoryItem;
