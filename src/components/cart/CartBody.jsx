import React, { useEffect, useState } from "react";
import empty from "../../assets/images/empty.png";
import CartHead from "../cart/CartHead";
import CartItem from "./CartItem";
import CheckOutInfo from "../checkoutForm/CheckOutInfo";
import { useDispatch, useSelector } from "react-redux";
import { CartUpdatingHandler } from "../../redux/actions/AuthAction";
import CustomLoader from "../toast/CustomLoader";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  calculateFinalPrice,
  calculateTotalDiscount,
  calculateTotalPrice,
  fetchSingleProductRequest,
  removeFromCart,
  removeFromFavorites,
} from "../../redux/actions/CategoryActions";
import { MyToast, toast } from "../toast/MyToast";
import {
  fetchCouponRequest,
  handleClearCoupon,
  handleCouponAppliedValue,
  handleCouponTotal,
} from "../../redux/actions/OrderAction";

function CartBody({ isShownAll }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const cartData = useSelector((state) => state?.handleCartItem?.addToCart);
  const loginData = useSelector((state) => state.AuthReducerData.loginUser);
  const updateCart = useSelector((state) => state.AuthReducerData.updateCart);
  const favourites = useSelector((state) => state?.handleCartItem?.favorites);
  const orderDet = useSelector((state) => state.OrderReducerData.orderData);
  const couponData = useSelector((state) => state.OrderReducerData.couponData);
  const [applyCoupon, setApplyCoupom] = useState("");

  const couponTotalGlobal = useSelector(
    (state) => state.OrderReducerData.couponTotal
  );

  // console.log('couponTotalGlobal 1',couponTotalGlobal);

  const extractedCart = cartData.map((item) => {
    if (item.has_variants_selected) {
      return {
        product_id: item.id,
        quantity: item.quantity,
        variant_combo_id: item[item.variant_combo_string].variant_combo_id,
      };
    } else if (!item.has_variants_selected) {
      return {
        product_id: item.id,
        quantity: item.quantity,
        variant_combo_id: null,
      };
    } else {
      return {
        product_id: item.id,
        quantity: item.quantity,
        variant_combo_id: item.otherData.variant_combo_string,
      };
    }
  });

  const totalPrice = cartData.reduce((accumulator, product) => {
    const quantity = product?.quantity || 0;
    let price = 0;
    if (product.has_variants_selected === 0) {
      price = product?.[0]?.price || 0;
    } else if (product.has_variants_selected === 1) {
      const variantComboString = product?.variant_combo_string;
      price = product?.[variantComboString]?.price || 0;
    } else {
      price = product?.otherData?.price || 0;
    }

    return accumulator + quantity * price;
  }, 0);

  const totalDiscount =
    cartData &&
    cartData?.reduce((accumulator, product) => {
      const quantity = product?.quantity || 0;
      let discount = 0;

      if (product?.has_variants_selected === 0) {
        discount = product?.[0]?.amount_saved || 0;
      } else if (product?.has_variants_selected === 1) {
        const variantComboString = product?.variant_combo_string;
        discount = product?.[variantComboString]?.amount_saved || 0;
      } else {
        discount = product?.otherData?.amount_saved || 0;
      }

      return accumulator + quantity * discount;
    }, 0);

  const finalTotal = totalPrice - totalDiscount;

  // useEffect(() => {
  //   if (couponTotalGlobal?.total !== null) {
  //     dispatch(handleCouponTotal(null))
  //   }
  // }, [totalPrice]);

  useEffect(() => {
    dispatch(calculateTotalPrice(totalPrice));
    dispatch(calculateTotalDiscount(totalDiscount));
    dispatch(calculateFinalPrice(finalTotal));
  }, [cartData]);

  function favoriteHandler(type, id, variant) {
    if (type === "removefavorite") {
      dispatch(removeFromFavorites(id, variant));
    } else {
      let checkCartedProduct = checkIfcarted({
        id,
        variant_combo_string: variant,
      });
      if (checkCartedProduct === true) {
        dispatch(removeFromCart(id, variant));
      } else {
        dispatch(
          fetchSingleProductRequest(id, true, (prod) => {
            let desiredProductfromCartitems;
            if (prod.has_variants_selected) {
              if (prod.variant_combo_reference[variant].product_quantity < 1) {
                MyToast("Product is out of stock", "error");
                toast.clearWaitingQueue();
                return;
              }
              let filteredVariants = {};
              filteredVariants[variant] = prod.variant_combo_reference[variant];
              desiredProductfromCartitems = {
                has_variants_selected: prod?.has_variants_selected,
                productName: prod.product_head[0].product_name,
                id: id,
                quantity: 0,
                productimageurl: prod?.product_images[0].image_path,
                variant_combo_string: variant,
                rating: prod.product_head[0].product_rating,
                discount: prod.product_head[0].discount,
                otherData: { ...prod?.product_head },
                stock: prod.variant_combo_reference[variant].product_quantity,
                ...filteredVariants,
              };
            } else {
              if (prod.offer_data[0].product_quantity < 1) {
                MyToast("Product is out of stock", "error");
                toast.clearWaitingQueue();
                return;
              }
              desiredProductfromCartitems = {
                has_variants_selected: prod?.has_variants_selected,
                productName: prod.product_head[0].product_name,
                rating: prod.product_head[0].product_rating,
                discount: prod.offer_data[0].discount,
                id: id,
                quantity: 0,
                productimageurl: prod?.product_images[0].image_path,
                ...prod?.offer_data,
                otherData: { ...prod?.product_head },
                stock: prod.offer_data[0].product_quantity,
              };
            }
            dispatch(
              addToCart(
                desiredProductfromCartitems,
                desiredProductfromCartitems.stock
              )
            );
            dispatch(removeFromFavorites(id, variant));
            navigate("/mycart");
          })
        );
      }
    }
  }

  function checkIfcarted(item) {
    return (
      cartData.findIndex((cartItem) => {
        if (cartItem.id === item.id) {
          if (cartItem.variant_combo_string !== undefined) {
            return cartItem.variant_combo_string === item.variant_combo_string;
          } else {
            return true;
          }
        }
        return false;
      }) !== -1
    );
  }

  const getNameOfItem = (item) => {
    if (item.variant_combo_string) {
      return (
        item?.productName +
        " ( " +
        item[item.variant_combo_string]?.variant_name_combo +
        " )"
      );
    } else {
      return item?.productName;
    }
  };

  // console.log(cartData, "this is the cart items")

  // console.log(couponData);
  // console.log(totalPrice);
  // console.log(orderDet.order_details);

  useEffect(() => {
    if (couponData && totalPrice !== null) {
      let totalAmount, couponAmount, couponTotal;
      if (loginData) {
        if (couponData.type === "percentage") {
          totalAmount = finalTotal;
          // totalAmount = orderDet?.order_details?.net_total;
          if (totalAmount !== undefined && couponData.price !== undefined) {
            couponAmount = (totalAmount * couponData.price) / 100;
            // setCouponAppliedValue(couponAmount);
            dispatch(handleCouponAppliedValue(couponAmount));
            couponTotal = totalAmount - couponAmount;
            // setCouponTotal(couponTotal);
            dispatch(handleCouponTotal(couponTotal));
          }
        } else if (couponData.type === "fixed") {
          couponAmount = couponData.price;
          totalAmount = finalTotal;
          // totalAmount = orderDet?.order_details?.net_total;
          // setCouponAppliedValue(couponData.price);
          dispatch(handleCouponAppliedValue(couponData.price));
          if (couponData.price && totalAmount) {
            couponTotal = totalAmount - couponAmount;

            // setCouponTotal(couponTotal);
            dispatch(handleCouponTotal(couponTotal));
          }
        }
      }
    }
  }, [couponData, totalPrice]);

  useEffect(() => {
    
    if (couponTotalGlobal?.total <= 0.50 && couponData?.coupon_code) {
      dispatch(handleClearCoupon());
      MyToast("Please add more items to use coupon", "error");
    }

  }, [couponTotalGlobal?.total]);

  return (
    <section className={isShownAll ? "my-cart" : "my-cart pt-0"}>
      {isShownAll ? (
        <>
          <div className="container">
            <CartHead
              heading={"My Cart"}
              // location={"Karachi, 110001"}
              cartDescription={
                "Apply a relevant coupon code here to avail any additional discount. Applicable cashback if any will be credited to your account as per T&C."
              }
            />
            <div className="row justify-content-center mt-3">
              {!cartData?.length == 0 ? (
                <>
                  <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                    <div className="cart-left">
                      {cartData?.map((item, index) => {
                        if (item.has_variants_selected === 1) {
                          return (
                            <div key={index}>
                              <CartItem
                                salePrice={
                                  (item?.[item?.variant_combo_string]
                                    ?.sale_price || "0") + "$"
                                }
                                actualPrice={
                                  (item?.[item?.variant_combo_string]?.price ||
                                    "0") + "$"
                                }
                                cartItemName={getNameOfItem(item)}
                                cartProductImage={item?.productimageurl}
                                dicountedPrice={
                                  "Save " +
                                  (item?.[item?.variant_combo_string]
                                    ?.discount || "0%")
                                }
                                starRating={
                                  item?.otherData?.product_rating ||
                                  item?.rating
                                }
                                cartCounter={item?.quantity}
                                isCartRight={true}
                                isProdAdd={true}
                                isCartCounterShown={true}
                                orderType={"inProgress"}
                                id={item?.id}
                                index={index}
                                isRatingShown={true}
                                reviewsCount={
                                  "(" +
                                  (item?.otherData?.[0]?.no_of_reviews || "0") +
                                  ")"
                                }
                                variantType={item?.variant_combo_string}
                              />
                            </div>
                          );
                        } else if (item?.has_variants_selected === 0) {
                          const dynamicKey = Object.keys(item)[0];
                          return (
                            <div key={index}>
                              <CartItem
                                salePrice={
                                  (item?.[dynamicKey]?.sale_price || "0") + "$"
                                }
                                actualPrice={
                                  (item?.[dynamicKey]?.price || "0") + "$"
                                }
                                cartItemName={getNameOfItem(item)}
                                cartProductImage={item?.productimageurl}
                                discountedPrice={
                                  item?.[dynamicKey]?.sale_price + "$"
                                }
                                cartCounter={item?.quantity}
                                isCartRight={true}
                                isProdAdd={true}
                                isCartCounterShown={true}
                                orderType={"inProgress"}
                                id={item?.id}
                                index={index}
                                dicountedPrice={
                                  "Save " +
                                  (item?.otherData?.discount ||
                                    item?.discount ||
                                    "0%")
                                }
                                starRating={
                                  item?.otherData?.product_rating ||
                                  item?.rating
                                }
                                isRatingShown={true}
                                reviewsCount={
                                  "(" +
                                  (item?.otherData?.no_of_reviews ||
                                    item?.otherData?.[0]?.no_of_reviews ||
                                    "0") +
                                  ")"
                                }
                                reviewsCount1={
                                  "(" +
                                  (item?.otherData?.no_of_reviews ||
                                    item?.otherData?.[0]?.no_of_reviews ||
                                    "0") +
                                  ")"
                                }
                                variantType={item?.variant_combo_string}
                              />
                            </div>
                          );
                        } else {
                          return (
                            <div key={index}>
                              <CartItem
                                salePrice={
                                  (item?.otherData?.sale_price || "0") + "$"
                                }
                                actualPrice={
                                  (item?.otherData?.price || "0") + "$"
                                }
                                cartItemName={getNameOfItem(item)}
                                cartProductImage={item?.productimageurl}
                                discountedPrice={
                                  item?.otherData?.sale_price + "$"
                                }
                                cartCounter={item?.quantity}
                                isCartRight={true}
                                isProdAdd={true}
                                isCartCounterShown={true}
                                orderType={"inProgress"}
                                id={item?.id}
                                index={index}
                                starRating={
                                  item?.otherData?.product_rating ||
                                  item?.rating
                                }
                                isRatingShown={true}
                                dicountedPrice={
                                  "Save " +
                                  (item?.otherData?.discount ||
                                    item?.discount ||
                                    "0%")
                                }
                                reviewsCount={
                                  "(" +
                                  (item?.otherData?.no_of_reviews ||
                                    item?.otherData?.[0]?.no_of_reviews ||
                                    "0") +
                                  ")"
                                }
                                reviewsCount1={
                                  "(" +
                                  (item?.otherData?.no_of_reviews ||
                                    item?.otherData?.[0]?.no_of_reviews) +
                                  ")"
                                }
                                variantType={item?.variant_combo_string}
                              />
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                  <div className="cart-left">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={empty}
                        alt="Cart is Empty"
                        style={{ height: "405px" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="log-info col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <CheckOutInfo
                  isNoProductsShown={false}
                  price={totalPrice}
                  discount={totalDiscount}
                  couponTotalFlag={!!couponTotalGlobal?.total}
                  totalAfterCouponApplied={couponTotalGlobal?.total}
                  coupunApplied={couponTotalGlobal?.appliedValue}
                  shipping={"0"}
                  total={finalTotal}
                  estimatedDelivery={"dd/mm/yy"}
                  isCouponCodeEnabled={false}
                  isButtonEnabled={"bottom"}
                  buttonName={
                    isLoading ? (
                      <CustomLoader size={14} className={"loaderStyle mb-3"} />
                    ) : (
                      "Proceed to Checkout"
                    )
                  }
                  isLoading={isLoading}
                  onProceedCheckout={() => {
                    if (loginData?.token) {
                      dispatch(
                        CartUpdatingHandler(
                          loginData?.token,
                          extractedCart,
                          setIsLoading,
                          dispatch,
                          navigate
                        )
                      );

                      if (couponData?.coupon_code) {
                        dispatch(
                          fetchCouponRequest(
                            couponData?.coupon_code,
                            loginData.token,
                            false,
                            setIsLoading,
                            navigate,
                            dispatch,
                            setApplyCoupom
                          )
                        );
                      }
                    } else {
                      if (extractedCart.length !== 0) {
                        navigate("/checkout");
                      } else {
                        MyToast(
                          "Please add atleast 1 product in cart",
                          "error"
                        );
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        //here crucial
        <div className="col-xl-12 col-lg-12 col-md-12 col-12">
          <div className="cart-left">
            {favourites && favourites?.length !== 0 ? (
              favourites.map((item, index) => {
                return (
                  <CartItem
                    key={index}
                    onCartClick={favoriteHandler.bind(
                      this,
                      "cart",
                      item.id,
                      item.variant_combo_string
                    )}
                    onRemoveFavorite={favoriteHandler.bind(
                      this,
                      "removefavorite",
                      item.id,
                      item.variant_combo_string
                    )}
                    salePrice={
                      (item?.otherData?.sale_price ||
                        item?.[0]?.sale_price ||
                        item?.[item.variant_combo_string]?.sale_price ||
                        "0") + "$"
                    }
                    actualPrice={
                      (item?.otherData?.price ||
                        item?.[0]?.price ||
                        item?.[item.variant_combo_string]?.price ||
                        "0") + "$"
                    }
                    dicountedPrice={
                      "Save " +
                      (item?.otherData?.discount ||
                        item?.discount ||
                        item?.[item?.variant_combo_string]?.discount ||
                        "0%")
                    }
                    id={item.id}
                    reviewsCount1={
                      "(" +
                      (item?.otherData?.no_of_reviews ||
                        item?.otherData?.[0]?.no_of_reviews ||
                        "0") +
                      ")"
                    }
                    isCart={checkIfcarted(item)}
                    cartItemName={getNameOfItem(item)}
                    cartProductImage={item?.productimageurl}
                    starRating={item?.otherData?.product_rating || item?.rating}
                    variantType={item?.variant_combo_string}
                  />
                );
              })
            ) : (
              <p className="pt-1 px-2">No Favorite items</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default CartBody;
