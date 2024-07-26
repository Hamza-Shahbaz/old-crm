import {
  ACTIVE_SECTION,
  ADD_ADDRESS,
  ADD_ADDRESS_ERROR,
  ADD_ADDRESS_SUCCESS,
  ADD_PAYMENT_METHOD_FAILURE,
  ADD_PAYMENT_METHOD_REQUEST,
  ADD_PAYMENT_METHOD_SUCCESS,
  ADD_PAYMENT_VISIBLE,
  CLEAR_ADDRESS_DATA,
  CLEAR_COUPON,
  CLEAR_ORDER_DATA,
  CLEAR_SAVE_ADDRESS_DATA,
  CLEAR_SHIP_ADDRESS,
  FETCH_COUPON_REQUEST,
  FETCH_ORDERS_FAILURE,
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDER_DATA_FAILURE,
  FETCH_ORDER_DATA_REQUEST,
  FETCH_ORDER_DATA_SUCCESS,
  GET_ORDER_DETAILS_FAILURE,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  MERGE_CARDS,
  ORDER_CONFIRM_REQUEST,
  REMOVE_CARD_FAILURE,
  REMOVE_CARD_REQUEST,
  REMOVE_CARD_SUCCESS,
  SAVE_ADDRESS,
  SET_ADDRESS_ID,
  SET_COUPON_APPLIED_VALUE,
  SET_COUPON_TOTAL,
  SHIP_ADDRESS_SUCCESS,
} from "../constant/constants";

/////////////////////////////// GET oRDER SCREEN DATA
export const fetchOrderDataRequest = (token) => ({
  type: FETCH_ORDER_DATA_REQUEST,
  payload: token,
});

export const fetchOrderDataSuccess = (orderData) => ({
  type: FETCH_ORDER_DATA_SUCCESS,
  payload: orderData,
});

export const fetchOrderDataFailure = (error) => ({
  type: FETCH_ORDER_DATA_FAILURE,
  payload: error,
});

/////////////////////////////// Post Address data
export const addAddress = (
  addressData,
  shippingAddressCheck,
  setIsLoading,
  token,
  navigate,
  dispatch,
  onActiveSectionChange,
  guestCart,
  ShipAddressFeilds
) => ({
  type: ADD_ADDRESS,
  payload: {
    addressData,
    shippingAddressCheck,
    guestCart,
    token,
    ShipAddressFeilds,
  },
  meta: { setIsLoading, navigate, dispatch, onActiveSectionChange },
});

export const addAddressSuccess = (addressResData) => ({
  type: ADD_ADDRESS_SUCCESS,
  payload: addressResData,
});

export const addAddressError = (error) => ({
  type: ADD_ADDRESS_ERROR,
  payload: error,
});
export const saveAddress = (addressFeilds) => ({
  type: SAVE_ADDRESS,
  payload: addressFeilds,
});

export const shipAddressSuccess = (shipData) => ({
  type: SHIP_ADDRESS_SUCCESS,
  payload: shipData,
});
export const clearShipAddressHandler = () => ({
  type: CLEAR_SHIP_ADDRESS,
});

/////////////////////////////// Add payment card

export const addPaymentMethodRequest = (
  cardData,
  setIsLoading,
  token,
  dispatch,
  navigate
) => ({
  type: ADD_PAYMENT_METHOD_REQUEST,
  payload: { cardData, token },
  meta: { setIsLoading, dispatch, navigate },
});

export const addPaymentMethodSuccess = () => ({
  type: ADD_PAYMENT_METHOD_SUCCESS,
});

export const addPaymentMethodFailure = (error) => ({
  type: ADD_PAYMENT_METHOD_FAILURE,
  payload: error,
});

/////////////////////////////// remove card

export const removeCardRequest = (cardId, token, dispatch, navigate) => ({
  type: REMOVE_CARD_REQUEST,
  payload: cardId,
  meta: { token, dispatch, navigate },
});

export const removeCardSuccess = (message) => ({
  type: REMOVE_CARD_SUCCESS,
  payload: message,
});

export const removeCardFailure = (error) => ({
  type: REMOVE_CARD_FAILURE,
  payload: error,
});

/////////////////////////////// Set Action Section checkout page

export const activeSectionHandler = (sectionName) => ({
  type: ACTIVE_SECTION,
  payload: sectionName,
});

/////////////////////////////// Set Action Section checkout page

export const clearAddressDataHandler = () => ({
  type: CLEAR_ADDRESS_DATA,
});

/////////////////////////////// Set Action Section checkout page

export const clearOrderDataHandler = () => ({
  type: CLEAR_ORDER_DATA,
});

/////////////////////////////// Set Action Section checkout page
export const clearSaveAddressDataHandler = () => ({
  type: CLEAR_SAVE_ADDRESS_DATA,
});

/////////////////////////////// Add payment form visibility

export const handleAddPaymentFormVisibility = (bool) => ({
  type: ADD_PAYMENT_VISIBLE,
  payload: bool,
});
/////////////////////////////// Add payment form visibility

export const handleAddressId = (id) => ({
  type: SET_ADDRESS_ID,
  payload: id,
});

/////////////////////////////// Proceed order

export const storeOrderRequest = (
  token,
  setCouponAppliedValue,
  setCouponTotal,
  shippingAddressId,
  billingAddressId,
  couponId,
  // cardId,
  cardData,
  currency_id,
  navigate,
  dispatch,
  clientSecret,
  setIsLoading,
  setSecretKey
) => ({
  type: ORDER_CONFIRM_REQUEST,
  payload: {
    token,
    shippingAddressId,
    billingAddressId,
    // cardId,
    couponId,
    cardData,
    currency_id,
    setCouponAppliedValue,
    setCouponTotal,
    clientSecret,
  },
  meta: { navigate, dispatch, setIsLoading, setSecretKey },
});

/////////////////////////////// Merge Card State

export const handleMergeCardData = (data) => ({
  type: MERGE_CARDS,
  payload: data,
});

export const handleClearCoupon = () => ({
  type: CLEAR_COUPON,
});

/////////////////////////////// Get Coupon code

export const fetchCouponRequest = (
  couponCode,
  token,
  toastFlag = false,
  setIsLoading,
  navigate,
  dispatch,
  setApplyCoupom
) => ({
  type: FETCH_COUPON_REQUEST,
  payload: { couponCode, token, toastFlag },
  meta: { setIsLoading, navigate, dispatch, setApplyCoupom },
});

//////     Get order status of customers

export const fetchOrderStatusRequest = (
  token,
  setIsLoading,
  navigate,
  dispatch
) => ({
  type: FETCH_ORDERS_REQUEST,
  payload: { token },
  meta: { setIsLoading, navigate, dispatch },
});

export const fetchOrderStatusSuccess = (orders) => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: orders,
});

export const fetchOrderStatusFailure = (error) => ({
  type: FETCH_ORDERS_FAILURE,
  payload: error,
});

//////  Get order detail of customers

export const getOrderDetailsRequest = (
  token,
  orderId,
  setIsLoading,
  navigate,
  dispatch
) => ({
  type: GET_ORDER_DETAILS_REQUEST,
  payload: { token, orderId },
  meta: { setIsLoading, navigate, dispatch },
});

export const getOrderDetailsSuccess = (data) => ({
  type: GET_ORDER_DETAILS_SUCCESS,
  payload: data,
});

export const getOrderDetailsFailure = (error) => ({
  type: GET_ORDER_DETAILS_FAILURE,
  payload: error,
});

//////  Set Copupon toal

export const handleCouponTotal = (total) => ({
  type: SET_COUPON_TOTAL,
  payload: total,
});

export const handleCouponAppliedValue = (value) => ({
  type: SET_COUPON_APPLIED_VALUE,
  payload: value,
});
