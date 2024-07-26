import React, { useState } from "react";
import * as images from "../../../config/images";
import PaymentAdd from "./PaymentAdd";
import CategoryButton from "../../button/CategoryButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCardRequest,
  storeOrderRequest,
} from "../../../redux/actions/OrderAction";
import { MyToast, toast } from "../../toast/MyToast";
import CustomLoader from "../../toast/CustomLoader";

function PaymentMethod({
  headType,
  isBottomButtonCentered,
  className,
  btnName,
  shipType,
  isCashonDelivery,
  setCouponAppliedValue,
  setCouponTotal
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [childPaymentMethodState, setChildPaymentMethodState] = useState(null);

  const isFormVisible = useSelector(
    (state) => state.OrderReducerData.IsAddPaymentFormVisible
  );
  const [cardData, setCardData] = useState({});
  const [loading, setIsLoading] = useState(false);
  const addressIdForNewlyFeildDataFromApiResponse = useSelector(
    (state) => state.OrderReducerData.addressData
  );
  const loginData = useSelector((state) => state.AuthReducerData.loginUser);
  const couponData = useSelector((state) => state.OrderReducerData.couponData);

  const handlePostPaymentMethod = () => {
    const { card_title, expiry_at, card_number, cvc } = childPaymentMethodState;

    // Define regular expressions for validation
    const cardNumberRegex = /^\d{14}$/; // Updated regex for 16 digits
    const cvcRegex = /^\d{3}$/; // Regex for 3 digits

    // Validation function for checking if a field is empty
    const isFieldEmpty = (value) => {
      return /^\s*$/.test(value);
    };

    if (isFieldEmpty(card_title)) {
      MyToast("Card name is required", "error");
      return;
    }

    if (isFieldEmpty(expiry_at)) {
      MyToast("Expiry date is required", "error");
      return;
    }

    if (isFieldEmpty(card_number)) {
      MyToast("Card number is required", "error");
      return;
    }

    if (isFieldEmpty(cvc)) {
      MyToast("CVC is required", "error");
      return;
    }

    if (!cardNumberRegex.test(card_number)) {
      MyToast("Invalid card number. It must be exactly 14 digits.", "error");
      return;
    }

    if (!cvcRegex.test(cvc)) {
      MyToast("Invalid CVC. It must be exactly 3 digits.", "error");
      return;
    }

    // Proceed with further actions if all validations pass
    const addressId =
      loginData.address_id ||
      addressIdForNewlyFeildDataFromApiResponse?.address_id;
    const couponId = couponData && couponData.coupon_id;

    if (addressId) {
      dispatch(
        storeOrderRequest(
          loginData?.token,
          setIsLoading,
          setCouponAppliedValue,
          setCouponTotal,
          addressId,
          addressId,
          couponId,
          childPaymentMethodState,
          navigate,
          dispatch
        )
      );

      toast.clearWaitingQueue();
    }
  };

  return (
    <div className="payment-sec log-info">
      {headType === 1 ? (
        <>
          <h2>Payment Method</h2>
          <div className="title-line"></div>
          <p>Complete Your Purchase by Entering Your Information</p>
        </>
      ) : headType === 2 ? (
        <div className="log-head-text border-bottom my-3">
          <h4>Wallet Information</h4>
        </div>
      ) : null}

      <form className="needs-validation" noValidate="">
        <div className="row">
          <div
            className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"
            key={"cards"}
          >
            <div className="payment-card-sec">
              {/* {isFormVisible && <PaymentAdd />} */}
              <PaymentAdd
                onGetCardData={(getState) =>
                  setChildPaymentMethodState(getState)
                }
              />

              <div className="protect d-flex align-items-center mt-4 secure">
                <img className="me-2" src={images.secureIconImage} />
                <p className="mb-0">
                  We protect your payment information using encryption to
                  provide bank-level security.
                </p>
              </div>
            </div>
          </div>

          {isBottomButtonCentered ? (
            <div className="col-xl-12 col-lg-5 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-center bg- align-items-center">
              <CategoryButton
                buttonName={btnName}
                className={className}
                type={"submit"}
                style={{ padding: "8px 28px" }}
              />
            </div>
          ) : (
            <div className="col-xl-4 col-lg-5 col-md-12 col-sm-12 col-xs-12">
              <CategoryButton
                buttonName={
                  loading ? (
                    <CustomLoader size={14} className={"loaderStyle mb-3"} />
                  ) : (
                    btnName
                  )
                } //proceed order prop value
                disabled={loading}
                className={className}
                onClick={handlePostPaymentMethod}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default PaymentMethod;
