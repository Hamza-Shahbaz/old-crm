// saga.js
import { put, takeEvery, takeLatest, call } from "redux-saga/effects";
import { BaseUrl, EndPoints } from "../../utils/Api";
import {
  ADD_ADDRESS,
  ADD_PAYMENT_METHOD_REQUEST,
  FETCH_COUPON_FAILURE,
  FETCH_COUPON_REQUEST,
  FETCH_COUPON_SUCCESS,
  FETCH_ORDERS_REQUEST,
  FETCH_ORDER_DATA_REQUEST,
  GET_ORDER_DETAILS_FAILURE,
  GET_ORDER_DETAILS_REQUEST,
  ORDER_CONFIRM_FAILURE,
  ORDER_CONFIRM_REQUEST,
  ORDER_CONFIRM_SUCCESS,
  REMOVE_CARD_REQUEST,
} from "../constant/constants";
import {
  activeSectionHandler,
  addAddressError,
  addAddressSuccess,
  addPaymentMethodFailure,
  addPaymentMethodSuccess,
  clearAddressDataHandler,
  clearOrderDataHandler,
  fetchOrderDataFailure,
  fetchOrderDataRequest,
  fetchOrderDataSuccess,
  fetchOrderStatusFailure,
  fetchOrderStatusSuccess,
  getOrderDetailsFailure,
  getOrderDetailsSuccess,
  handleAddPaymentFormVisibility,
  handleAddressId,
  handleClearCoupon,
  handleMergeCardData,
  removeCardFailure,
  removeCardSuccess,
  shipAddressSuccess,
} from "../actions/OrderAction";
import { MyToast, toast } from "../../components/toast/MyToast";
import { clearCart } from "../actions/CategoryActions";
import Swal from "sweetalert2";
import {
  CartUpdatingHandler,
  SigninHandler,
  handleGetWorkQueue,
  logoutHandlerAction,
  openModal,
} from "../actions/AuthAction";

function* fetchOrderDataSaga(action) {
  const headers = {
    Authentication: action.payload,
  };

  try {
    const response = yield fetch(`${BaseUrl}${EndPoints.order_data}`, {
      method: "GET",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    });

    const responseData = yield response.json();

    if (responseData.status) {
      yield put(fetchOrderDataSuccess(responseData.data));
    } else {
      MyToast(responseData.message, "error");
    }
  } catch (error) {
    console.error("Something went wrong", error);
    yield put(fetchOrderDataFailure(error));
  }
}

function* addAddressSaga(action) {
  const {
    addressData,
    shippingAddressCheck,
    guestCart,
    token,
    ShipAddressFeilds,
  } = action.payload;
  const { setIsLoading, navigate, dispatch, onActiveSectionChange } =
    action.meta;

  setIsLoading(true);

  try {
    const billingData = {
      address_id: addressData.address_id || null,
      name: addressData.name,
      phone_number: addressData.phoneNumber,
      street_address: addressData.address,
      email: addressData.email,
      country_code: addressData.countryCode,
      city: addressData.city,
      state_code: addressData.stateCode,
      zip_code: addressData.zipCode,
      default_address: addressData.default_address,
    };

    const shippingData = {
      name: ShipAddressFeilds.name,
      phone_number: ShipAddressFeilds.phoneNumber,
      street_address: ShipAddressFeilds.address,
      email: ShipAddressFeilds.email,
      country_code: ShipAddressFeilds.countryCode,
      city: ShipAddressFeilds.city,
      state_code: ShipAddressFeilds.stateCode,
      zip_code: ShipAddressFeilds.zipCode,
      default_address: ShipAddressFeilds.default_address,
    };
    const payload = {
      billing_address: billingData,
      shipping_address: shippingAddressCheck ? shippingData : null,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authentication: token,
      },
      body: JSON.stringify(payload),
    };

    const url = `${BaseUrl}${EndPoints.register_address}`;

    const newResponse = yield fetch(url, requestOptions);
    const newResponseData = yield newResponse.json();

    // if (shippingAddressCheck) {
    //   const newFormData = new FormData();
    //   newFormData.append("name", ShipAddressFeilds.name);
    //   newFormData.append("phone_number", ShipAddressFeilds.phoneNumber);
    //   newFormData.append("street_address", ShipAddressFeilds.address);
    //   newFormData.append("email", ShipAddressFeilds.email);
    //   newFormData.append("country_code", ShipAddressFeilds.countryCode);
    //   newFormData.append("city", ShipAddressFeilds.city);
    //   newFormData.append("state_code", ShipAddressFeilds.stateCode);
    //   newFormData.append("zip_code", ShipAddressFeilds.zipCode);
    //   newFormData.append("default_address", ShipAddressFeilds.default_address);
    //   try {
    //     const newResponse = yield fetch(
    //       ShipAddressFeilds.address_id
    //         ? `${BaseUrl}${EndPoints.register_address}/${addressData.address_id}`
    //         : `${BaseUrl}${EndPoints.register_address}`,
    //       {
    //         method: "POST",
    //         headers: {
    //           Authentication: token,
    //         },
    //         body: newFormData,
    //       }
    //     );

    //     const newResponseData = yield newResponse.json();

    //     if (newResponseData.status) {
    //       yield put(shipAddressSuccess(newResponseData.data));
    //     }
    //   } catch (error) {}
    // }

    if (newResponseData.status) {
      onActiveSectionChange("shipping");
      dispatch(fetchOrderDataRequest(token));
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
      yield put(addAddressSuccess(newResponseData.data));
      yield put(shipAddressSuccess(newResponseData.data));
    } else if (
      newResponseData?.status == "401" ||
      newResponseData?.status == "403"
    ) {
      navigate("/");
      dispatch(logoutHandlerAction());
      dispatch(handleAddressId(""));
      dispatch(clearOrderDataHandler());
    } else {
      if (newResponseData?.data.action === "customer_login") {
        Swal.fire({
          text: newResponseData.message,
          showCancelButton: true,
          confirmButtonText: "Login",
          confirmButtonColor: "#fbb53b",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(
              openModal(
                true, //status
                "come_from_address_form_to_login", //path
                payload, //addressform data
                onActiveSectionChange // boolean
              )
            );
          }
        });
      } else if (newResponseData?.data.action === "guest_login") {
        Swal.fire({
          text: newResponseData.message,
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Sign up",
          denyButtonText: `Continue as Guest`,
          denyButtonColor: "#0a53be",
          confirmButtonColor: "#fbb53b",
          focusConfirm: false,
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(openModal(true));
            navigate("/mycart");
          } else if (result.isDenied) {
            const userSigninCredentials = {
              email: addressData.email,
            };

            // const userAddress = {
            //   name: addressData.name,
            //   phone_number: addressData.phoneNumber,
            //   street_address: addressData.address,
            //   address_email: addressData.email,
            //   country_code: addressData.countryCode,
            //   city: addressData.city,
            //   state_code: addressData.stateCode,
            //   zip_code: addressData.zipCode,
            //   default_address: addressData.default_address,
            // };

            dispatch(
              SigninHandler(
                userSigninCredentials,
                true, //validate cart
                guestCart,
                1, //as guest
                setIsLoading,
                navigate,
                dispatch,
                true, //active section falg
                onActiveSectionChange,
                payload
              )
            );
          }
        });
      } else {
        MyToast(newResponseData.message, "error");
      }

      onActiveSectionChange("address");

      yield put(addAddressError(newResponseData.message));
    }
  } catch (error) {
    console.error(error);
    // MyToast("Front End Error: addAddressSaga Function", "error");
    MyToast("Saving Address Failed", "error");
    yield put(addAddressError(error.message));
  } finally {
    setIsLoading(false);
  }
}

function* addPaymentMethod(action) {
  const { setIsLoading, dispatch, navigate } = action.meta;
  const { cardData, token } = action.payload;

  setIsLoading(true);
  try {
    const formData = new FormData();
    formData.append("name_on_card", cardData.name_on_card);
    formData.append("card_number", cardData.card_number);
    formData.append("expiry_date", cardData.expiry_date);

    const headers = {
      Authentication: token,
    };

    const response = yield call(fetch, `${BaseUrl}${EndPoints.add_card}`, {
      method: "POST",
      headers: headers,
      body: formData,
    });
    const responseData = yield response.json();

    if (responseData.status) {
      handleMergeCardData({
        ...cardData,
        card_id: responseData.data.card_id,
      });
      dispatch(handleAddPaymentFormVisibility(false));
      addPaymentMethodSuccess();
    } else if (response?.status == "401" || response?.status == "403") {
      navigate("/");
      dispatch(logoutHandlerAction());
      dispatch(handleAddressId(""));
      dispatch(clearOrderDataHandler());
    } else {
      MyToast(responseData.message, "error");
      yield put(addPaymentMethodFailure(responseData.message));
    }
  } catch (error) {
    MyToast("Failed to add card", "error");
    console.error(
      "Frontend error : addPaymentMethod, Failed to add payment method:",
      error
    );
    yield put(addPaymentMethodFailure(error.message));
  } finally {
    setIsLoading(false);
    toast.clearWaitingQueue();
  }
}

function* handleProceedOrder(action) {
  try {
    const {
      token,
      shippingAddressId,
      billingAddressId,
      couponId,
      cardData,
      setCouponAppliedValue,
      setCouponTotal,
      clientSecret,
      currency_id,
    } = action.payload;
    const { navigate, dispatch, setIsLoading, setSecretKey } = action.meta;

    // MyToast(responseData.message, "success");

    const myHeaders = new Headers();
    myHeaders.append("Authentication", token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      payment_method: "card",
      shipping_address_id: shippingAddressId,
      billing_address_id: billingAddressId,
      coupon_id: couponId,
      card_data: null,
      payment_intent: clientSecret,
      currency_id,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = yield fetch(
      `${BaseUrl}${EndPoints.update_order_to_pending}`,
      requestOptions
    );

    const responseData = yield response.json();

    if (responseData.status) {
      navigate("/orderconfirm", { replace: true });
      dispatch(clearAddressDataHandler());
      dispatch(clearOrderDataHandler());
      dispatch(activeSectionHandler("address"));
      dispatch(clearCart());
      dispatch(handleClearCoupon());
      dispatch(handleAddressId(""));

      dispatch(handleGetWorkQueue());
    } else {
      setIsLoading(false);
      setSecretKey("");
      MyToast(responseData?.message, "error");
      throw new Error("Order Failed");
    }
  } catch (error) {
    const { navigate, dispatch, setIsLoading, setSecretKey } = action.meta;
    setIsLoading(false);
    setSecretKey("");
  }
}

function* removeCardSaga(action) {
  const { token, dispatch, navigate } = action.meta;

  try {
    const myHeaders = new Headers();
    myHeaders.append("Authentication", token);

    const formdata = new FormData();
    formdata.append("card_id", action.payload);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    const response = yield fetch(
      `${BaseUrl}${EndPoints.remove_card}`,
      requestOptions
    );
    const responseData = yield response.json(); // Parse response JSON

    if (responseData.status) {
      yield put(removeCardSuccess(responseData.message));
      // dispatch(fetchOrderDataRequest(token));
      // MyToast(responseData?.message, "success");
    } else if (response?.status == "401" || response?.status == "403") {
      navigate("/");
      dispatch(logoutHandlerAction());
      dispatch(handleAddressId(""));
      dispatch(clearOrderDataHandler());
    } else {
      yield put(removeCardFailure(responseData.message));
      MyToast(responseData?.message, "error");
    }
  } catch (error) {
    MyToast(`Failed to remove card`, "error");
    yield put(removeCardFailure(error.message));
  }
}

function* fetchCouponSaga({ payload, meta }) {
  const { couponCode, token, toastFlag } = payload;
  const { setIsLoading, dispatch, setApplyCoupom } = meta;

  try {
    setIsLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("Authentication", token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = yield call(
      fetch,
      `${BaseUrl}${EndPoints.coupon}${couponCode}`,
      requestOptions
    );

    const result = yield response.json();

    if (result.status) {
      setIsLoading(false);
      setApplyCoupom("");
      toastFlag && MyToast(result.message, "success");
      yield put({ type: FETCH_COUPON_SUCCESS, payload: result.data });
    } else {
      setIsLoading(false);
      MyToast(result?.message, "error");
      yield put({ type: FETCH_COUPON_FAILURE, payload: result.data });
    }
  } catch (error) {
    console.error("Failed to apply coupon:", error);
    MyToast("Failed to apply coupon", "error");
    yield put({ type: FETCH_COUPON_FAILURE, payload: error.message });
  } finally {
    setIsLoading(false);
  }
}

function* fetchOrdersStatusSaga(action) {
  const { token } = action.payload;
  const { navigate, dispatch, setIsLoading } = action.meta;
  setIsLoading(true);
  try {
    const myHeaders = new Headers();
    myHeaders.append("Authentication", token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = yield call(
      fetch,
      `${BaseUrl}${EndPoints.user_orders_status}`,
      requestOptions
    );
    const res = yield response.json();

    if (res.status) {
      setIsLoading(false);
      yield put(fetchOrderStatusSuccess(res.data));
    } else {
      setIsLoading(false);
      yield put(fetchOrderStatusFailure(res.data));
    }
  } catch (error) {
    setIsLoading(false);
    console.error("Frontend Error: fetchOrdersStatusSaga Function ", error);
    yield put(fetchOrderStatusFailure());
  }
}

function* fetchOrderDetailSSaga(action) {
  const { token, orderId } = action.payload;
  const { navigate, dispatch, setIsLoading } = action.meta;
  setIsLoading(true);
  try {
    const myHeaders = new Headers();
    myHeaders.append("Authentication", token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = yield call(
      fetch,
      `${BaseUrl}${EndPoints.user_order_details}${orderId}`,
      requestOptions
    );
    const res = yield response.json();

    if (res.status) {
      setIsLoading(false);
      yield put(getOrderDetailsSuccess(res.data));
    } else {
      setIsLoading(false);
      yield put(getOrderDetailsFailure(res));
    }
  } catch (error) {
    setIsLoading(false);
    console.error("Frontend Error: fetchOrderDetailSSaga Function ", error);
    yield put(fetchOrderStatusFailure());
  }
}

function* OrderSaga() {
  yield takeLatest(ADD_ADDRESS, addAddressSaga);
  yield takeEvery(FETCH_ORDER_DATA_REQUEST, fetchOrderDataSaga);
  yield takeEvery(ADD_PAYMENT_METHOD_REQUEST, addPaymentMethod);
  yield takeEvery(ORDER_CONFIRM_REQUEST, handleProceedOrder);
  yield takeEvery(REMOVE_CARD_REQUEST, removeCardSaga);
  yield takeLatest(FETCH_COUPON_REQUEST, fetchCouponSaga);
  yield takeLatest(FETCH_ORDERS_REQUEST, fetchOrdersStatusSaga);
  yield takeLatest(GET_ORDER_DETAILS_REQUEST, fetchOrderDetailSSaga);
}

export default OrderSaga;
