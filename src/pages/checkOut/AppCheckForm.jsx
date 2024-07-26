import React, { useEffect, useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BaseUrl, EndPoints } from "../../utils/Api";
import {
  storeOrderRequest,
} from "../../redux/actions/OrderAction";
import { MyToast, toast } from "../../components/toast/MyToast";
import { handleGetSiteSettings } from "../../redux/actions/AuthAction";
import { amoutRateConversion } from "../../utils/Helper";

const AppCheckForm = ({ setCouponAppliedValue, setCouponTotal, countryCode }) => {
  const [secretKey, setSecretKey] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.AuthReducerData.loginUser);
  const couponData = useSelector((state) => state.OrderReducerData.couponData);

  const addressIdForNewlyFeildDataFromApiResponse = useSelector(
    (state) => state.OrderReducerData.addressData
  );

  const couponId = couponData && couponData.coupon_id;

  const billingId =
    loginData.billing_address_id ||
    addressIdForNewlyFeildDataFromApiResponse?.billing_address_id;

  const shippingId =  
    loginData.shipping_address_id ||
    addressIdForNewlyFeildDataFromApiResponse.shipping_address_id;

  const currency_id = useSelector(
    (state) => state.siteSettingReducerData?.currentCurrency?.currency_id
  );

  useEffect(() => {
    dispatch(handleGetSiteSettings());
  }, []);
  const stripeKey = useSelector(
    (state) =>
      state.siteSettingReducerData.siteSettings.settings.stripe_publish_key
  );
  const [stripePromise, setStripePromise] = useState("");
  useEffect(() => {
    if (stripeKey) {
      setStripePromise(loadStripe(stripeKey));
    }
  }, [stripeKey]);
  const handleProceedPayment = async () => {
    if (billingId) {
      try {
        const response = await fetch(`${BaseUrl}${EndPoints.store_order}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authentication: loginData.token,
          },
          body: JSON.stringify({
            payment_method: "card",
            shipping_address_id: shippingId || billingId,
            billing_address_id: billingId,
            coupon_id: couponId,
            card_data: null,
            payment_intent: secretKey,
            currency_id,
          }),
        });
        const data = await response.json();

        if (data.status && data.data.clientSecret) {
          setSecretKey(data.data.clientSecret);
        }

        return data;
      } catch (error) {
        console.error("Frontend Error: handleProceedPayment Method ", error);
      }
    }
  };

  const handlePaymentSuccess = async (clientSecret, setPaymentLoading) => {
    const couponId = couponData && couponData.coupon_id;

    if (billingId) {
      dispatch(
        storeOrderRequest(
          loginData?.token,
          setCouponAppliedValue,
          setCouponTotal,
          shippingId || billingId,
          billingId,
          couponId,
          null,
          currency_id,
          navigate,
          dispatch,
          clientSecret,
          setPaymentLoading,
          setSecretKey
        )
      );
    }
  };

  const currencyCode =
    useSelector(
      (state) =>
        state.siteSettingReducerData?.currentCurrency?.currency_iso_code
    ) || "USD";

  const options = {
    mode: "payment",
    currency: currencyCode.toLowerCase(),
    amount: 975,
  };

  return (
    <>
      {stripePromise ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            handleSecretKey={handleProceedPayment}
            handlePaymentSuccess={handlePaymentSuccess}
            countryCode= {countryCode}
          />
        </Elements>
      ) : null}
    </>
  );
};

function CheckoutForm({ handleSecretKey, handlePaymentSuccess, countryCode }) {
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const finalTotal = useSelector((state) => state?.handleCartItem?.finalTotal);

  const couponTotalGlobal = useSelector(
    (state) => state.OrderReducerData.couponTotal
  );
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

    const maxAmount = 2000

  const payMoney = async (e) => {
    e.preventDefault();
    elements.submit()

    if (
      couponData !== undefined &&
      couponData &&
      Object.keys(couponData).length > 0
    ) {
      if (couponTotalGlobal?.total > maxAmount) {
        MyToast(`Max order limit is ${amoutRateConversion(maxAmount,currencyRate, currencyCode)}`, "error");
        toast.clearWaitingQueue();
        return;
      }
    } else if (finalTotal && finalTotal > 2000) {
      MyToast(`Max order limit is ${amoutRateConversion(maxAmount,currencyRate, currencyCode)}`, "error");
      toast.clearWaitingQueue();
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    setPaymentLoading(true);

    try {
      let response = await handleSecretKey();
      let clientSecret = null;
      if (response.status && response.data?.clientSecret) {
        clientSecret = response.data.clientSecret;
      } else {
        setPaymentLoading(false);
        MyToast(response.message, "error");
        toast.clearWaitingQueue();
        throw new Error(response.message);
      }

      let options = {
        elements,
        clientSecret,
        redirect: "if_required",
        confirmParams: {
          return_url: "https://google.com",
          payment_method_data:{billing_details:{address:{country : countryCode.isoCode}}}
        }
      };

      let paymentResult = await stripe.confirmPayment(options);

      if (paymentResult.error) {
        MyToast(paymentResult.error.message, "error");
        toast.clearWaitingQueue();
        throw new Error(paymentResult.error.message);
      }
      handlePaymentSuccess(clientSecret, setPaymentLoading);
    } catch (error) {
      setPaymentLoading(false);
      if (error == "Error") {
        MyToast("Error processing payment. Please try again later.", "error");
        toast.clearWaitingQueue();
      } else {
        MyToast(error, "error");
        toast.clearWaitingQueue();
      }
    }
  };

  return (
    <div>
      <div style={{ maxWidth: "100%", margin: "0 auto" }}>
        <form style={{ display: "block", width: "100%" }} onSubmit={payMoney} id="payment-form">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            id="payment-element"
          >
            <PaymentElement
              className="cardStripe"
              options={{
                style: {
                  base: {
                    backgroundColor: "white",
                  },
                },
                fields: {billingDetails: {address:{country:"never"}}}
              }}
            />
            <button
              className={"btn btn-checkout w-100"}
              style={{
                marginTop: "10px",
              }}
              // className="pay-button"

              disabled={isPaymentLoading}
            >
              {isPaymentLoading ? "Loading..." : "Pay"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AppCheckForm;
