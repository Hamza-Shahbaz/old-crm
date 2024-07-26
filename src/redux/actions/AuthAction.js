import {
  CLEAR_UPDATE_INFO,
  FORGOT_PASSWORD,
  GET_ICON_ID,
  GET_SITESETTINGS,
  GET_WORKQUEUE,
  GUEST_LOGIN_FAILURE,
  GUEST_LOGIN_REQUESTING,
  GUEST_LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGOUT_GUEST,
  LOGOUT_USER,
  NULLIFY_LAST_NAME,
  OPEN_MODAL,
  REGISTER_USER,
  RESET_PASSWORD,
  UPDATE_INFO,
  UPDATING_CART,
  UPDATING_CART_ERROR,
  UPDATING_CART_SUCCESS,
} from "../constant/constants";

export const handleRegisterUser = (
  registerData,
  setIsLoading,
  setIsModalChange,
  setRegisterData,
  dispatch
) => {
  return {
    type: REGISTER_USER,
    registerData,
    setIsLoading,
    setIsModalChange,
    setRegisterData,
    dispatch,
  };
};

export const handleInfoUpdate = (
  allFeilds,
  setIsLoading,
  dispatch,
  token,
  navigate,
  setresetAllFields
) => {
  return {
    type: UPDATE_INFO,
    allFeilds,
    setIsLoading,
    dispatch,
    token,
    navigate,
    setresetAllFields,
  };
};

export const handleInfoUpdateClear = () => {
  return {
    type: CLEAR_UPDATE_INFO,
  };
};

export const handleForgotPassword = (
  forgotPassData,
  setIsLoading,
  navigateToLogin,
  dispatch,
  setForgotPassData
) => {
  return {
    type: FORGOT_PASSWORD,
    forgotPassData,
    setIsLoading,
    navigateToLogin,
    dispatch,
    setForgotPassData,
  };
};

////////////////ACTION FOR GET SITE SETTINGS API

export const handleGetSiteSettings = () => {
  return {
    type: GET_SITESETTINGS,
  };
};

////////////////ACTION FOR WORK QUEUE API
export const handleGetWorkQueue = () => {
  return {
    type: GET_WORKQUEUE,
  };
};

/////////////////////////login//////////////

export function SigninHandler(
  userSigninCredentials,
  validateCart,
  userCart,
  userLoginFlag,
  setIsLoading,
  navigate,
  dispatch,
  activeSectionFlag,
  onActiveSectionChange,
  userAddress
) {
  return {
    type: LOGIN_REQUESTING,
    payload: {
      userSigninCredentials,
      validateCart,
      userCart,
      userLoginFlag,
      userAddress,
    },
    meta: {
      setIsLoading,
      navigate,
      dispatch,
      activeSectionFlag,
      onActiveSectionChange,
    },
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}

export function loginSuccess(payload) {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
}

export const nullifyLastName = () => ({
  type: NULLIFY_LAST_NAME,
});

//////////Reset Pass//////////
export const handleResetPasswordUser = (
  resetPassData,
  setIsLoading,
  navigate,
  passwordToken
) => {
  return {
    type: RESET_PASSWORD,
    resetPassData,
    setIsLoading,
    navigate,
    passwordToken,
  };
};

export const logoutHandlerAction = () => {
  return {
    type: LOGOUT_USER,
  };
};
export const logoutGuestHandlerAction = () => {
  return {
    type: LOGOUT_GUEST,
  };
};

export const openModal = (
  status,
  path = "",
  data = {},
  activeSectionFunction = () => {}
) => ({
  type: OPEN_MODAL,
  payload: { status, path, data, activeSectionFunction },
});

///////////////////////// Cart /////////////

export function CartUpdatingHandler(
  token,
  cartItems,
  setIsLoading,
  dispatch,
  navigate
) {
  return {
    type: UPDATING_CART,
    payload: { token, cartItems },
    meta: { setIsLoading, dispatch, navigate },
  };
}

export function CartUpdatingError(error) {
  return {
    type: UPDATING_CART_ERROR,
    error,
  };
}

export function CartUpdatingSuccess(payload) {
  return {
    type: UPDATING_CART_SUCCESS,
    payload,
  };
}

///////////////////////// Guest login /////////////

export function guestLoginHandler(guestEmail, guestCart, guestToken) {
  return {
    type: GUEST_LOGIN_REQUESTING,
    payload: { guestEmail, guestCart },
  };
}

export function guestLoginSuccess(payload) {
  return {
    type: GUEST_LOGIN_SUCCESS,
    payload,
  };
}

export function guestLoginFailure(error) {
  return {
    type: GUEST_LOGIN_FAILURE,
    error,
  };
}

//////FOR HEADER TOP ICON ID//////////
export function handleIconId(divId) {
  // console.log("object,", divId);
  return {
    type: GET_ICON_ID,
    divId,
  };
}
