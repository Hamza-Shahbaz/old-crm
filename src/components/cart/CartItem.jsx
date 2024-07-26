import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { FaCircleMinus } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";
import CategoryButton from "../button/CategoryButton";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuantity,
  removeFromCart,
  removeQuantity,
} from "../../redux/actions/CategoryActions";
import { toast } from "../toast/MyToast";
import simpleCart from "../../assets/images/cartsimple.png";
import cartFilled from "../../assets/images/cartFiiled.png";
import dummmyImage from "../../assets/images/no-image1.png";
import { amoutRateConversion } from "../../utils/Helper";
import { Tooltip } from "antd";

function CartItem({
  cartProductImage,
  cartItemName,
  dicountedPrice,
  salePrice,
  actualPrice,
  isCartRight,
  isProdAdd,
  cartCounter,
  id,
  index,
  onCartClick,
  onRemoveFavorite,
  isCart,
  starRating,
  isRatingShown,
  reviewsCount,
  reviewsCount1,
  variantType,
}) {
  const dispatch = useDispatch();
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
  return (
    <div key={index} className="card mb-3 mx-2">
      <div className="row g-0 align-items-center">
        <div className="col-md-2 ">
          <img
            src={cartProductImage ? cartProductImage : dummmyImage}
            className="img-fluid "
            onError={handleImageError}
          />
        </div>
        <div className={isProdAdd ? "col-md-8" : "col-md-10"}>
          <div className="my-card-body mt-3">
            {cartItemName?.length > 70 ? (
              <Tooltip
                title={cartItemName}
                color={"#77878f"}
                key={id}
                placement="bottom"
              >
                <h2 className="cartTextStyle">
                  {cartItemName.substring(0, 70) + "...."}
                </h2>
              </Tooltip>
            ) : (
              <h2 className="cartTextStyle">{cartItemName}</h2>
            )}

            {salePrice !== actualPrice ? (
              <div className="my-cart-price">
                <span className="cartStyleText">
                  {amoutRateConversion(salePrice, currencyRate, currencyCode)}
                </span>
                <span className="mx-2 line cartStyleText cartStyleText-edited">
                  {amoutRateConversion(actualPrice, currencyRate, currencyCode)}
                </span>
                <p className="cartStyleText">
                  {dicountedPrice ? dicountedPrice : "0%"}
                </p>
              </div>
            ) : (
              <div className="my-cart-price">
                <span className="cartStyleText">
                  {amoutRateConversion(salePrice, currencyRate, currencyCode)}
                </span>
              </div>
            )}

            {isRatingShown ? (
              <div className={"d-flex align-items-center headingCenterStyle"}>
                <span className="d-flex align-items-center pt-1">
                  <ReactStars
                    className="me-2 rating"
                    count={5}
                    size={12}
                    value={starRating}
                    edit={false}
                    isHalf={true}
                    char={<i className="fa-solid fa-star"></i>}
                    // char={"★"}
                    activeColor="#FD5F12"
                  />
                  <span className="rating pt-1 px-1">{reviewsCount}</span>
                </span>
              </div>
            ) : null}

            {isProdAdd ? (
              <>
                <div className="input-group mt-2">
                  <div className="input-group-btn">
                    <button
                      type="button"
                      style={{ border: "none", backgroundColor: "#fff" }}
                      className="btn btn-circle"
                      disabled={cartCounter == 1 ? true : false}
                      onClick={() => {
                        dispatch(removeQuantity(id, variantType));
                        toast.clearWaitingQueue();
                      }}
                    >
                      {/* <TiMinus size={15} /> */}
                      <FaCircleMinus size={30} color="2e3192" />
                    </button>
                  </div>

                  <input
                    type="text"
                    className="quantity"
                    disabled
                    id="quantity"
                    value={cartCounter}
                  />
                  <span className="input-group-btn">
                    <button
                      type="button"
                      style={{ border: "none", backgroundColor: "#fff" }}
                      // className="btn btn-circle"
                      onClick={() => {
                        dispatch(addQuantity(id, variantType));
                        toast.clearWaitingQueue();
                      }}
                    >
                      <FaCirclePlus size={30} color="2e3192" />
                    </button>
                  </span>
                </div>
              </>
            ) : (
              <div
                className={"d-flex align-items-center justify-content-between"}
              >
                <span className="d-flex align-items-center pt-1">
                  <ReactStars
                    className="me-2 rating"
                    count={5}
                    size={12}
                    value={starRating}
                    edit={false}
                    isHalf={true}
                    char={<i className="fa-solid fa-star"></i>}
                    activeColor="#FD5F12"
                  />
                  <span className="rating pt-1 px-1">{reviewsCount1}</span>
                </span>

                <div className="d-flex align-items-center">
                  <div
                    className="icon-circle d-flex align-items-center mx-2 "
                    onClick={onCartClick}
                  >
                    <div>
                      <img
                        style={{ height: 30, width: 30 }}
                        src={isCart ? cartFilled : simpleCart}
                      />
                    </div>
                  </div>
                  <div>
                    <CategoryButton
                      buttonName={"Remove"}
                      className={"card-style remove"}
                      style={{
                        border: "none",
                        backgroundColor: "white",
                        paddingRight: 15,
                      }}
                      type={"button"}
                      onClick={onRemoveFavorite}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={isCartRight ? "col-md-2" : null}>
          <div className="my-card-body-right">
            {isCartRight ? (
              <>
                <div className="my-cart-right">
                  <TbTruckDelivery size={22} className="m-1" />
                </div>

                <CategoryButton
                  buttonName={"Remove"}
                  className={"card-style remove"}
                  style={{
                    border: "none",
                    backgroundColor: "white",
                    paddingRight: 10,
                  }}
                  type={"button"}
                  onClick={() => {
                    dispatch(removeFromCart(id, variantType));
                    toast.clearWaitingQueue();
                  }}
                />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
