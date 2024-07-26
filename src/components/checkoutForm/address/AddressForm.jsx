import React, { useEffect, useState } from "react";
import BreadcrumbItem from "../BreadcrumbItem";
import CheckOutInfo from "../CheckOutInfo";
import PaymentCardInfoItem from "./PaymentCardInfoItem";
import FormSection from "../FormSection";
import { useDispatch, useSelector } from "react-redux";
import AppCheckForm from "../../../pages/checkOut/AppCheckForm";
import {
  fetchCouponRequest,
  fetchOrderDataRequest,
  handleClearCoupon,
  handleCouponAppliedValue,
  handleCouponTotal,
} from "../../../redux/actions/OrderAction";
import CategoryButton from "../../button/CategoryButton";
import { MyToast, toast } from "../../toast/MyToast";
import { useLocation, useNavigate } from "react-router-dom";
import { amoutRateConversion } from "../../../utils/Helper";

function AddressForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("address");
  const [isLoading, setIsLoaing] = useState(false);
  const location = useLocation();
  const [shipType, setShipType] = useState("1");
  const [couponTotal, setCouponTotal] = useState(null);
  const [couponAppliedValue, setCouponAppliedValue] = useState(null);
  const totalPrice = useSelector((state) => state?.handleCartItem?.totalPrice);
  const totalDiscount = useSelector(
    (state) => state?.handleCartItem?.totalDiscount
  );
  const finalTotal = useSelector((state) => state?.handleCartItem?.finalTotal);
  const cartData = useSelector((state) => state?.handleCartItem?.addToCart);
  const loginData = useSelector((state) => state.AuthReducerData.loginUser);
  const orderDet = useSelector((state) => state.OrderReducerData.orderData);
  const couponTotalGlobal = useSelector(
    (state) => state.OrderReducerData.couponTotal
  );
  const [selecetdCountryForCheckout, setSelectedCountryForCheckout] =
    useState("US");
  const couponData = useSelector((state) => state.OrderReducerData.couponData);
  const currencyRate =
    useSelector(
      (state) => state.siteSettingReducerData?.currentCurrency?.conversion_rate
    ) || 1;
  const currencyCode =
    useSelector(
      (state) =>
        state.siteSettingReducerData?.currentCurrency?.currency_iso_code
    ) || "USD";

  const [orderDetails, setOrderDetails] = useState();

  useEffect(() => {
    if (orderDet !== null) {
      setOrderDetails(orderDet);
    }
  }, [orderDet, activeSection, setActiveSection]);

  const [ShipAddressFeildsLifted, setShipAddressFieldsLifted] =
    useState(undefined);

  const [ShipAddressCheckLifted, setShipAddressCheckLifted] =
    useState(undefined);

  // console.log("ShipAddressFeildsLifted", ShipAddressFeildsLifted);

  // console.log("ShipAddressCheckLift", ShipAddressCheckLifted);
  // const activeSection = useSelector(
  //   (state) => state.OrderReducerData.activeSection
  // );

  const [applyCoupon, setApplyCoupom] = useState("");

  // useEffect(() => {
  //   if (
  //     location &&
  //     location.pathname === "/checkout" &&
  //     loginData?.token &&
  //     (!orderDet ||
  //       !orderDet.addresses ||
  //       Object.values(orderDet.addresses).length === 0)
  //   ) {
  //     dispatch(fetchOrderDataRequest(loginData.token));
  //   }
  // }, [location, loginData]);

  // const handleSectionChange = (section) => {
  //   setActiveSection(section);
  //   // dispatch(activeSectionHandler(section));
  // };

  const shippingTypeHandler = (e) => {
    // setShipType(e.target.value);
    setShipType("1");
  };

  useEffect(() => {
    if (couponData && totalPrice !== null) {
      let totalAmount, couponAmount, couponTotal;
      if (loginData) {
        if (couponData.type === "percentage") {
          totalAmount = orderDetails?.order_details?.net_total;
          if (totalAmount !== undefined && couponData.price !== undefined) {
            couponAmount = (totalAmount * couponData.price) / 100;
            couponTotal = totalAmount - couponAmount;
            if (couponTotal <= 0.5) {
              dispatch(handleClearCoupon());
              MyToast("Please add more items to use coupon", "error");
              return;
            }
            setCouponAppliedValue(couponAmount);
            dispatch(handleCouponAppliedValue(couponAmount));
            setCouponTotal(couponTotal);
            dispatch(handleCouponTotal(couponTotal));
          }
        } else if (couponData.type === "fixed") {
          couponAmount = couponData.price;
          totalAmount = orderDetails?.order_details?.net_total;
          couponTotal = totalAmount - couponAmount;
          if (couponTotal <= 0.5) {
            dispatch(handleClearCoupon());
            MyToast(
              "Please purchase items of more than " +
                amoutRateConversion(
                  couponData.price,
                  currencyRate,
                  currencyCode
                ) +
                " to use this coupon",
              "error"
            );
            return;
          }
          setCouponAppliedValue(couponData.price);
          dispatch(handleCouponAppliedValue(couponData.price));
          if (couponData.price && totalAmount) {
            setCouponTotal(couponTotal);
            dispatch(handleCouponTotal(couponTotal));
          }
        }
      }
    }
  }, [couponData, totalPrice]);

  function couponHandler() {
    if (couponTotalGlobal?.total) {
      dispatch(handleClearCoupon());
      return;
    }

    if (applyCoupon.trim() === "") {
      MyToast("Please insert valid coupon code", "error");
    } else {
      setIsLoaing(true);
      dispatch(
        fetchCouponRequest(
          applyCoupon,
          loginData.token,
          false,
          setIsLoaing,
          navigate,
          dispatch,
          setApplyCoupom
        )
      );
    }

    toast.clearWaitingQueue();
  }
  const currentDate = new Date();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [activeSection]);

  // useEffect(() => {
  //   if (couponTotal !== null || couponAppliedValue !== null) {
  //     setCouponTotal(null);
  //     setCouponAppliedValue(null);
  //   }
  // }, [orderDetails?.order_details?.sub_total, totalPrice]);

  // useEffect(() => {
  //   if (couponTotalGlobal?.total !== null || couponTotalGlobal?.appliedValue!== null) {
  //     dispatch(handleCouponAppliedValue(null));
  //     dispatch(handleCouponTotal(null));
  //   }
  // }, [orderDetails?.order_details?.sub_total, totalPrice]);

  // useEffect(() => {
  //   if (couponTotalGlobal?.total <= 0.50 && location.pathname ==="/checkout") {
  //     dispatch(handleClearCoupon());
  //     MyToast("Coupon Removed", "error")
  //   }
  // }, [couponTotalGlobal?.total]);

  function HandlActiveSectionChange(v) {
    setActiveSection(v);
  }

  return (
    <section className="checkout">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-5 col-lg-6 col-md-4 col-sm-12 col-xs-12 col-12">
            <div className="section-title">
              <h1 className="mb-2 topStyle">Checkout</h1>
            </div>
          </div>
          <div className="col-xl-7 col-lg-6 col-md-8 col-sm-12 col-xs-12 col-12">
            <BreadcrumbItem
              activeSection={activeSection}
              onChange={HandlActiveSectionChange}
              shipType={shipType}
            />
          </div>
        </div>

        <div className="row justify-content-center mt-3">
          <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
            {/* For Address */}
            {activeSection === "address" && (
              <FormSection
                onActiveSectionChange={setActiveSection}
                headType={1}
                Ischeckbox={true}
                className={"btn btn-theme-blue mt-4 w-100"}
                btnName={"Save and Continue"}
                isBottomButtonCentered={false}
                activeSection={activeSection}
                setSelectedCountryForCheckout={setSelectedCountryForCheckout}
                ShipAddressFeildsLifted={ShipAddressFeildsLifted}
                onSetShipAddressFeildsLifted={setShipAddressFieldsLifted}
                ShipAddressCheckLifted={ShipAddressCheckLifted}
                onShipAddressCheckLifted={setShipAddressCheckLifted}
              />
            )}

            {/* for shipping */}
            {activeSection === "shipping" && (
              <div className="checkout-left">
                <div className="address-sec">
                  <h2>Shipping Address</h2>
                  <div className="title-line"></div>

                  <p>Complete Your Purchase by Entering Your Information</p>

                  <div>
                    <PaymentCardInfoItem
                      shippingTime={currentDate.toLocaleDateString()}
                      shippingName={"Free Regular Shipment"}
                      onChange={shippingTypeHandler}
                      value={"1"}
                      checked={shipType}
                    />
                  </div>
                  <div>
                    <CategoryButton
                      buttonName={"Save and Continue"}
                      className={"btn btn-theme-blue mt-4 w-10"}
                      type={"submit"}
                      style={{ padding: "8px 28px" }}
                      onClick={() => {
                        if (shipType) {
                          setActiveSection("payment");
                        } else {
                          MyToast("Please Select Shipping Method", "error");
                        }

                        toast.clearWaitingQueue();
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* for payment */}
            {activeSection === "payment" && (
              <AppCheckForm
                setCouponAppliedValue={setCouponAppliedValue}
                setCouponTotal={setCouponTotal}
                countryCode={selecetdCountryForCheckout}
              />
            )}
          </div>

          <div className="log-info col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <CheckOutInfo
              isNoProductsShown={true}
              price={
                // loginData?.type === "GUEST"
                loginData?.type
                  ? orderDetails?.order_details?.sub_total
                  : totalPrice
              }
              // couponTotalFlag={!!couponTotal}
              // totalAfterCouponApplied={couponTotal}
              couponTotalFlag={!!couponTotalGlobal?.total}
              totalAfterCouponApplied={couponTotalGlobal?.total}
              coupunApplied={couponTotalGlobal?.appliedValue}
              discount={
                // loginData?.type === "CUSTOMER"
                loginData?.type
                  ? orderDetails?.order_details?.discount
                  : totalDiscount
              }
              // coupunApplied={couponAppliedValue}
              total={
                // loginData?.type === "CUSTOMER"
                loginData?.type
                  ? orderDetails?.order_details?.net_total
                  : finalTotal
              }
              noOfProducts={
                // loginData?.type === "CUSTOMER"
                loginData?.type
                  ? orderDetails?.order_details?.num_of_products
                  : cartData?.length
              }
              estimatedDelivery={"0"}
              shipping={"0"}
              isCouponCodeEnabled={activeSection === "payment"}
              isCouponInputEnabled={couponData?.coupon_code ? false : true}
              isButtonEnabled={"middle"}
              buttonName={
                couponData?.coupon_code ? "Remove Coupon" : "Apply Coupon"
              }
              onChange={(coupon) => {
                const regex = /^[a-zA-Z0-9]*$/;
                if (coupon.length <= 11 && regex.test(coupon)) {
                  setApplyCoupom(coupon);
                }
              }}
              onClick={couponHandler}
              value={applyCoupon}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddressForm;
