import { put, takeEvery, call, select } from "redux-saga/effects";
import {
  FORGOT_PASSWORD,
  GET_SITESETTINGS,
  GET_WORKQUEUE,
  GUEST_LOGIN_REQUESTING,
  LOGIN_REQUESTING,
  REGISTER_USER,
  RESET_PASSWORD,
  SET_FORGOT_PASSWORD,
  SET_REGISTER_USER,
  SET_RESET_PASSWORD,
  SET_SITESETTINGS,
  SET_UPDATE_INFO,
  UPDATE_INFO,
  UPDATING_CART,
} from "../constant/constants";
import { BaseUrl, EndPoints } from "../../utils/Api";
import { MyToast, toast } from "../../components/toast/MyToast";
import axios from "axios";
import {
  CartUpdatingHandler,
  CartUpdatingSuccess,
  guestLoginFailure,
  guestLoginSuccess,
  handleGetWorkQueue,
  loginSuccess,
  logoutHandlerAction,
  nullifyLastName,
  openModal,
} from "../actions/AuthAction";
import Swal from "sweetalert2";
import {
  addAddress,
  addAddressSuccess,
  clearOrderDataHandler,
  clearSaveAddressDataHandler,
  fetchOrderDataRequest,
  handleAddressId,
} from "../actions/OrderAction";

//////////////// API Function For Register //////////////////

function* handleRegister({
  registerData,
  setIsLoading,
  setIsModalChange,
  setRegisterData,
  dispatch,
}) {
  try {
    const registerResponse = yield call(
      fetch,
      `${BaseUrl}${EndPoints.registerUser}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: registerData?.firstName,
          last_name: registerData?.lastName,
          email: registerData?.email,
          phone_number: registerData?.phoneNo,
          password: registerData?.password,
          confirm_password: registerData?.confirmPassword,
        }),
      }
    );
    const response = yield registerResponse.json();

    if (response?.status) {
      setIsLoading(false);
      dispatch(handleGetWorkQueue());
      setIsModalChange(false);
      setRegisterData([]);
      yield put({ type: SET_REGISTER_USER, payload: response });
    } else if (response?.message) {
      MyToast(response?.message, "error");
    }
    setIsLoading(false);
  } catch (err) {
    setIsLoading(false);
    MyToast("Registration Failed", "error");
    toast.clearWaitingQueue();
  }
  toast.clearWaitingQueue();
}

//////////////// API Function For UPDATE PROFILE //////////////////

function* handleUpdate({
  allFeilds,
  setIsLoading,
  dispatch,
  token,
  navigate,
  setresetAllFields,
}) {
  try {
    const formData = new FormData();
    formData.append("first_name", allFeilds.firstname);
    formData.append("last_name", allFeilds.lastname);
    formData.append("street_address", allFeilds.address);
    formData.append("country", allFeilds.countryCode);
    formData.append("state", allFeilds.stateCode);
    formData.append("city", allFeilds.city);
    formData.append("phone", allFeilds.phoneNumber);
    formData.append("zipcode", allFeilds.zipCode);
    formData.append("existing_password", allFeilds.oldpass);
    formData.append("new_password", allFeilds.newpass);
    formData.append("confirm_password", allFeilds.confirmpass);
    formData.append("password_is_changed", allFeilds.oldpass ? 1 : 0);

    const updateResponse = yield call(
      fetch,
      `${BaseUrl}${EndPoints.updateProfile}`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authentication: token,
        },
      }
    );
    const response = yield updateResponse.json();

    if (response?.status) {
      setIsLoading(false);
      setresetAllFields(true);
      dispatch(clearSaveAddressDataHandler());
      dispatch(nullifyLastName());
      MyToast(response?.message, "success");
      yield put({ type: SET_UPDATE_INFO, payload: response });
    } else if (
      response?.status == "401" ||
      response?.status == "403" ||
      response?.message === "Unauthorized"
    ) {
      navigate("/");
      dispatch(logoutHandlerAction());
      dispatch(handleAddressId(""));
      dispatch(clearOrderDataHandler());
      dispatch(clearSaveAddressDataHandler());
      dispatch(nullifyLastName());
    } else {
      MyToast(response?.message, "error");
    }
    setIsLoading(false);
  } catch (err) {
    setIsLoading(false);
    console.log('errrrrrrrrrrrrrr',err)
    MyToast("Profile Update failed", "error");
    toast.clearWaitingQueue();
  }
  toast.clearWaitingQueue();
}

//////////////// API Function For Forgot Password //////////////////

function* handleForgotPass({
  forgotPassData,
  setIsLoading,
  navigateToLogin,
  dispatch,
  setForgotPassData,
}) {
  try {
    const forgotPassResponse = yield call(
      fetch,
      `${BaseUrl}${EndPoints.forgotPassword}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: forgotPassData?.email,
        }),
      }
    );
    const response = yield forgotPassResponse.json();
    if (response?.status) {
      setIsLoading(false);
      dispatch(handleGetWorkQueue());
      MyToast(response?.message, "success");
      navigateToLogin();
      setForgotPassData("");
      yield put({ type: SET_FORGOT_PASSWORD, payload: response });
    } else {
      MyToast(response?.message, "error");
    }
    setIsLoading(false);
  } catch (err) {
    setIsLoading(false);
    MyToast("Please re-enter your email address", "error");
    toast.clearWaitingQueue();
  }
  toast.clearWaitingQueue();
}

//////////////// API Function For Reset Password //////////////////

function* handleResetPass({
  resetPassData,
  setIsLoading,
  navigate,
  passwordToken,
}) {
  try {
    const resetPassResponse = yield call(
      fetch,
      `${BaseUrl}${EndPoints.resetPassword}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: passwordToken,
        },
        body: JSON.stringify({
          password: resetPassData?.password,
          password_confirmation: resetPassData?.confirmPassword,
          token: passwordToken,
        }),
      }
    );
    const response = yield resetPassResponse.json();

    if (response?.status) {
      setIsLoading(false);
      MyToast(response?.message, "success");
      yield put({ type: SET_RESET_PASSWORD, payload: response });
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } else {
      MyToast(response?.message, "error");
    }
    setIsLoading(false);
  } catch (err) {
    setIsLoading(false);
    MyToast("Reset Password failed ", "error");
    toast.clearWaitingQueue();
  }
  toast.clearWaitingQueue();
}

//////////////// API Function For Login //////////////////

function* handleLogin({ payload, meta }) {
  function isNotEmpty(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return true;
      }
    }
    return false;
  }

  const {
    setIsLoading,
    navigate,
    dispatch,
    activeSectionFlag,
    onActiveSectionChange,
  } = meta;
  const {
    userSigninCredentials,
    validateCart,
    userCart,
    userLoginFlag,
    userAddress,
  } = payload;

  setIsLoading(true);

  try {
    const postData = {
      email: userSigninCredentials?.email,
      password: userSigninCredentials?.password,
      guest_login: userLoginFlag === 1 ? 1 : 0,
      cart: userCart,
      ...userAddress,
    };

    if (validateCart && !userCart.length) {
      MyToast("Cart is empty", "error");
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(userSigninCredentials?.email)) {
      const response = yield call(fetch, `${BaseUrl}${EndPoints.login}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const resData = yield response.json();

      if (resData?.status) {
        localStorage.setItem("username", resData.data.name);
        activeSectionFlag && onActiveSectionChange("shipping"); //for address form movement

        if (userLoginFlag === 1) {
          // as guest
          dispatch(handleGetWorkQueue());
        }

        if (userLoginFlag === 0) {
          // as customer

          if (isNotEmpty(userAddress) && userCart?.length !== 0) {
            setIsLoading(false);
            // form should not empty for call add address
            dispatch(
              addAddress(
                userAddress,
                setIsLoading,
                false,
                resData.data.token,
                navigate,
                dispatch,
                onActiveSectionChange,
                userCart // no use for customer login
              )
            );

            dispatch(
              CartUpdatingHandler(
                resData.data.token,
                userCart,
                setIsLoading,
                dispatch,
                navigate
              )
            );
          }

          if (isNotEmpty(userAddress)) {
            // addreessfrom must not empty
            setIsLoading(false);
            // form should not empty for call add address
            dispatch(
              addAddress(
                userAddress,
                setIsLoading,
                false,
                resData.data.token,
                navigate,
                dispatch,
                onActiveSectionChange,
                userCart // no use for customer login
              )
            );
          }

          if (userCart?.length !== 0) {
            setIsLoading(false);
            dispatch(
              CartUpdatingHandler(
                resData.data.token,
                userCart,
                setIsLoading,
                dispatch,
                navigate
              )
            );
          }
        }
        //userLoginFlag === 2 means it's coming from "come_from_address_form_to_login", do not use is otherwise
        if (userLoginFlag === 2) {
          dispatch(
            CartUpdatingHandler(
              resData.data.token,
              userCart,
              setIsLoading,
              dispatch,
              navigate
            )
          );

          // const billingData = {
          //   address_id: userAddress.address_id || null,
          //   name: userAddress.name,
          //   phone_number: userAddress.phoneNumber,
          //   street_address: userAddress.address,
          //   email: userAddress.email,
          //   country_code: userAddress.countryCode,
          //   city: userAddress.city,
          //   state_code: userAddress.stateCode,
          //   zip_code: userAddress.zipCode,
          //   default_address: userAddress.default_address,
          // };
          // const payload = {
          //   billing_address: billingData,
          //   shipping_address: null,
          // };

          // const loginAddressId = yield select(
          //   (state) => state.AuthReducerData?.loginUser?.address_id
          // );

          const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authentication: resData.data.token,
            },
            body: JSON.stringify(userAddress),
          };

          const url = `${BaseUrl}${EndPoints.register_address}`;

          const response = yield fetch(url, requestOptions);

          const responseData = yield response.json();

          if (responseData.status) {
            // dispatch(activeSectionHandler("shipping"));
            // setTimeout(() => {}, 1000);
            window.scrollTo({
              top: 0,
              behavior: "instant",
            });
            yield put(addAddressSuccess(responseData.data));
          }
        }

        // yield put({ type: LOGIN_SUCCESS, payload: resData.data });
        yield put(loginSuccess(resData.data));
        localStorage.setItem("isLogin", resData.data.token);
        dispatch(openModal(false));
      } else {
        MyToast(resData?.message, "error");
        setIsLoading(false);
      }
    } else {
      MyToast("Email incorrect", "error");
      setIsLoading(false);
    }
  } catch (err) {
    setIsLoading(false);
    MyToast("Login Failed", "error");
  }
  toast.clearWaitingQueue();
}

function* handleCartUpdate({ payload, meta }) {
  const { token, cartItems } = payload;
  const { setIsLoading, dispatch, navigate } = meta;

  setIsLoading(true);
  const myHeaders = {
    "Content-Type": "application/json",
    Authentication: token,
  };

  const formattedCart = {
    cart: cartItems,
  };

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(formattedCart),
  };

  try {
    const response = yield fetch(`${BaseUrl}${EndPoints.cart}`, requestOptions);
    const responseData = yield response.json();

    if (!token) {
      Swal.fire({
        text: "You need to login to Proceed..",
        showCancelButton: true,
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(openModal(true));
        }
      });

      setIsLoading(false);
      return;
    }

    if (responseData?.status) {
      setIsLoading(false);
      // dispatch(auth sagatoken));
      navigate("/checkout");
      yield put(CartUpdatingSuccess(responseData.data.cart));
    } else if (response?.status == "401" || response?.status == "403") {
      navigate("/");
      dispatch(logoutHandlerAction());
      dispatch(handleAddressId(""));
      dispatch(clearOrderDataHandler());
    } else {
      setIsLoading(false);
      Swal.fire({
        text: responseData.message,
        confirmButtonText: "Cancel",
        confirmButtonColor: "#2e3192",
      });
    }
  } catch (error) {
    setIsLoading(false);
    MyToast("Something went wrong", "error");
  }
}

function* handleGuestLogin(action) {
  const { guestEmail, guestCart } = action.payload;

  const postData = {
    email: guestEmail,
    cart: guestCart,
    is_guest: "GUEST",
  };

  try {
    const resetPassResponse = yield call(
      fetch,
      `${BaseUrl}${EndPoints.guest_login}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    );
    const response = yield resetPassResponse.json();
    if (response?.status) {
      yield put(guestLoginSuccess(response?.data));
    } else {
      MyToast(response?.message, "error");
      yield put(guestLoginFailure(response?.message));
    }
  } catch (err) {
    MyToast("Login Failed", "error");
  }

  toast.clearWaitingQueue();
}

/////////////////// Function For GET SITE SETTINGS API ////////////////
function* fetchSiteSettings() {
  try {
    const response = yield call(
      axios.get,
      `${BaseUrl}${EndPoints.siteSettings}`
    );
    const settingsResponse = response?.data?.data;
    if (response?.status) {
      yield put({ type: SET_SITESETTINGS, payload: settingsResponse });
    } else {
    }
  } catch (error) {
    console.error("Frontend Error: fetchSiteSettings Function", error);
  }
}

/////////////////// Function For WORK QUEUE API ////////////////
function* fetchWorkQueue() {
  try {
    const response = yield call(axios.get, `${BaseUrl}${EndPoints.work_queue}`);
  } catch (error) {
    console.error("Frontend Error: fetchWorkQueue Function", error);
  }
}

function* AuthSaga() {
  yield takeEvery(LOGIN_REQUESTING, handleLogin);
  // yield takeEvery(GUEST_LOGIN_REQUESTING, handleGuestLogin);
  yield takeEvery(REGISTER_USER, handleRegister);
  yield takeEvery(FORGOT_PASSWORD, handleForgotPass);
  yield takeEvery(RESET_PASSWORD, handleResetPass);
  yield takeEvery(UPDATING_CART, handleCartUpdate);
  yield takeEvery(GET_SITESETTINGS, fetchSiteSettings);
  yield takeEvery(GET_WORKQUEUE, fetchWorkQueue);
  yield takeEvery(UPDATE_INFO, handleUpdate);
}

export default AuthSaga;
