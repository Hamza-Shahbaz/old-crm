import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import MainInput from "../input/MainInput";
import CategoryButton from "../button/CategoryButton";
import { Link, useNavigate } from "react-router-dom";
import { MyToast, toast } from "../toast/MyToast";
import CustomLoader from "../toast/CustomLoader";
import { SigninHandler } from "../../redux/actions/AuthAction";
import { IoEye, IoEyeOff } from "react-icons/io5";
import PhonenoInput from "../input/PhonenoInput";
import { handleRegisterUser } from "../../redux/actions/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function ModalSection({
  isOpen,
  onClose,
  closeModal,
  authHeading,
  MainImage,
  onButtonClick,
  formChange,
  imageClass,
  formClass,
  navigateButtonName,
  buttonName,
  openForgotModal,
  getCookie,
  setIsModalChange,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [eyePassword, setEyePassword] = useState(false);
  const [eyeConfirmPassword, setEyeConfirmPassword] = useState(false);
  const [eyeLoginPassword, setEyeLoginPassword] = useState(false);
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  });
  const nameInputRegex = /^[a-zA-Z]*$/;

  const [userSigninCredentials, setUserSigninCreentials] = useState({
    email: getCookie("myusrname"),
    password: getCookie("mypswd"),
  });
  const cartData = useSelector((state) => state?.handleCartItem?.addToCart);
  const isModalOpen = useSelector((state) => state.AuthReducerData.isModalOpen);

  // Function to handle closing the modal and navigating to the privacy policy page
  const handlePrivacyPolicyClick = () => {
    closeModal(); // Close the modal
    navigate("/privacy-policy"); // Navigate to the privacy policy page
  };

  const handleTermsClick = () => {
    closeModal(); // Close the modal
    navigate("/return-policy"); // Navigate to the return policy page
  };

  function iconHandler(field) {
    if (field === "password") {
      setEyePassword(!eyePassword);
    } else if (field === "confirmPassword") {
      setEyeConfirmPassword(!eyeConfirmPassword);
    } else if (field == "logineye") {
      setEyeLoginPassword(!eyeLoginPassword);
    }
  }

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    if (!isChecked) {
      document.cookie =
        "myusrname=" + userSigninCredentials.email + "; path=/ ";
      document.cookie =
        "mypswd=" + userSigninCredentials.password + "; path=/ ";
    } else {
      // Handle removing cookies if needed
    }
  };

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

  let userLoginFlag = 0;
  let userCart = {
    validateCart: false,
    cart: [...extractedCart],
  };

  const handleEnterKeyPress = () => {
    if (isModalOpen?.path === "come_from_address_form_to_login") {
      dispatch(
        SigninHandler(
          userSigninCredentials,
          true, //va  lidate cart
          userCart.cart,
          2, //as customer
          setIsLoading,
          navigate,
          dispatch,
          true,
          isModalOpen?.activeSectionFunction,
          isModalOpen?.data //related to address data
        )
      );
      return;
    }

    dispatch(
      SigninHandler(
        userSigninCredentials,
        userCart.validateCart,
        userCart.cart,
        (userLoginFlag = 0), //as customer
        setIsLoading,
        navigate,
        dispatch,
        false
      )
    );
  };

  return (
    <>
      <Modal show={isOpen} onHide={onClose} size="xl" centered>
        <div className="modal-content">
          <div className="modal-body">
            <div className="row align-items-center">
              <div className={imageClass}>
                <div className="login-img">
                  <LazyLoadImage
                    alt={MainImage?.props?.alt}
                    height={MainImage?.props?.height}
                    src={MainImage?.props?.src}
                    effect="blur" // Optional: Adds blur effect while loading
                    visibleByDefault={false} // Initially not visible until in view
                    onLoad={MainImage?.props?.onLoad}
                  />
                </div>
              </div>
              <div className={formClass}>
                <div className="login">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="loginSpan">{authHeading}</span>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={closeModal}
                    />
                  </div>
                  <hr />
                  {formChange ? (
                    <>
                      <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <MainInput
                            value={userSigninCredentials.email}
                            onChange={(email) => {
                              if (email.length <= 100) {
                                setUserSigninCreentials((currentState) => ({
                                  ...currentState,
                                  email,
                                }));
                              } else {
                                MyToast(
                                  "Email cannot exceed 100 digits.",
                                  "error"
                                );
                                toast.clearWaitingQueue();
                                return;
                              }
                            }}
                            className={"mb-3"}
                            inputClassName={"form-control address-input"}
                            inputHeading={"Email: "}
                            placeholderName={"Email"}
                            required={true}
                            type={"email"}
                            htmlFor={"exampleInputEmail1"}
                            labelclassName={"form-label"}
                          />
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <MainInput
                            value={userSigninCredentials.password}
                            onChange={(password) => {
                              if (password.length <= 50) {
                                setUserSigninCreentials((currentState) => ({
                                  ...currentState,
                                  password,
                                }));
                              } else {
                                MyToast(
                                  "Password cannot exceed 50 digits.",
                                  "error"
                                );
                                toast.clearWaitingQueue();
                                return;
                              }
                            }}
                            className={"mb-3"}
                            enterKeyHandler={handleEnterKeyPress}
                            inputClassName={"form-control address-input"}
                            inputHeading={"Password: "}
                            required={true}
                            placeholderName={"******"}
                            htmlFor={"exampleInputEmail1"}
                            labelclassName={"form-label"}
                            onIconClick={() => iconHandler("logineye")}
                            type={eyeLoginPassword ? "text" : "password"}
                            icon={
                              eyeLoginPassword ? (
                                <IoEye color="#2e3192" size={18} />
                              ) : (
                                <IoEyeOff color="#2e3192" size={18} />
                              )
                            }
                          />
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 col-6">
                          <MainInput
                            className={"form-check mb-3"}
                            inputClassName={"form-check-input"}
                            inputHeading={"Remember me"}
                            placeholderName={"******"}
                            type={"checkbox"}
                            htmlFor={"remember"}
                            labelclassName={"form-check-label"}
                            onChange={handleCheckboxChange}
                            isChecked={isChecked}
                          />
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 col-6">
                          <p className="text-end">
                            <a
                              data-bs-target="#exampleModalToggle3"
                              data-bs-toggle="modal"
                              data-bs-dismiss="modal"
                              onClick={openForgotModal}
                              style={{ cursor: "pointer" }}
                            >
                              Forgot password?
                            </a>
                          </p>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <CategoryButton
                            buttonName={
                              isLoading ? (
                                <CustomLoader
                                  size={14}
                                  className={"loaderStyle mb-3"}
                                />
                              ) : (
                                "Sign In"
                              )
                            }
                            disabled={isLoading}
                            className={"btn btn-theme-blue mt-1 w-100"}
                            type={"submit"}
                            onClick={() => {
                              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                              const isFieldEmpty = Object.entries(
                                userSigninCredentials
                              ).find(([key, value]) => {
                                return /^\s*$/.test(value);
                              });

                              if (isFieldEmpty) {
                                MyToast(
                                  `${
                                    isFieldEmpty[0].charAt(0).toUpperCase() +
                                    isFieldEmpty[0].slice(1).toLocaleLowerCase()
                                  } is required`,
                                  "error"
                                );
                                toast.clearWaitingQueue();
                                return;
                              }

                              if (
                                !emailRegex.test(userSigninCredentials?.email)
                              ) {
                                MyToast("Email incorrect", "error");
                                toast.clearWaitingQueue();
                                return;
                              }

                              if (
                                isModalOpen?.path ===
                                "come_from_address_form_to_login"
                              ) {
                                dispatch(
                                  SigninHandler(
                                    userSigninCredentials,
                                    true, // validate cart
                                    userCart.cart,
                                    2, //as customer
                                    setIsLoading,
                                    navigate,
                                    dispatch,
                                    true,
                                    isModalOpen?.activeSectionFunction,
                                    isModalOpen?.data //related to address data
                                  )
                                );
                                return;
                              }

                              dispatch(
                                SigninHandler(
                                  userSigninCredentials,
                                  userCart.validateCart,
                                  userCart.cart,
                                  (userLoginFlag = 0), //as customer
                                  setIsLoading,
                                  navigate,
                                  dispatch,
                                  false
                                )
                              );
                            }}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <MainInput
                          className={"mb-4"}
                          inputClassName={"form-control address-input"}
                          inputHeading={"First Name: "}
                          placeholderName={"First Name"}
                          required={true}
                          type={"text"}
                          htmlFor={"exampleInputEmail1"}
                          labelclassName={"form-label"}
                          value={registerData?.firstName}
                          onChange={(firstName) => {
                            if (firstName?.length <= 50) {
                              if (nameInputRegex.test(firstName)) {
                                setRegisterData((currentState) => ({
                                  ...currentState,
                                  firstName,
                                }));
                              } else {
                                MyToast(
                                  "First Name must consist of only Alphabets.",
                                  "error"
                                );
                                toast.clearWaitingQueue();
                                return;
                              }
                            } else {
                              MyToast(
                                "First Name cannot exceed 50 characters.",
                                "error"
                              );
                              toast.clearWaitingQueue();
                              return;
                            }
                          }}
                        />
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <MainInput
                          className={"mb-3"}
                          inputClassName={"form-control address-input"}
                          inputHeading={"Last Name: "}
                          placeholderName={"Last Name"}
                          type={"text"}
                          required={true}
                          htmlFor={"exampleInputEmail1"}
                          labelclassName={"form-label"}
                          value={registerData?.lastName}
                          onChange={(lastName) => {
                            if (lastName?.length <= 50) {
                              if (nameInputRegex.test(lastName)) {
                                setRegisterData((currentState) => ({
                                  ...currentState,
                                  lastName,
                                }));
                              } else {
                                MyToast(
                                  "Last Name must consist of only Alphabets.",
                                  "error"
                                );
                                toast.clearWaitingQueue();
                                return;
                              }
                            } else {
                              MyToast(
                                "Last Name cannot exceed 50 characters.",
                                "error"
                              );
                              toast.clearWaitingQueue();
                              return;
                            }
                          }}
                        />
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <MainInput
                          className={"mb-3"}
                          inputClassName={"form-control address-input"}
                          inputHeading={"Email: "}
                          placeholderName={"Email"}
                          type={"email"}
                          required={true}
                          htmlFor={"exampleInputEmail1"}
                          labelclassName={"form-label"}
                          value={registerData?.email}
                          onChange={(email) => {
                            if (email.length <= 100) {
                              setRegisterData((currentState) => ({
                                ...currentState,
                                email,
                              }));
                            } else {
                              MyToast(
                                "Email cannot exceed 100 digits.",
                                "error"
                              );
                              toast.clearWaitingQueue();
                              return;
                            }
                          }}
                        />
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <PhonenoInput
                          inputHeading={"Phone Number: "}
                          placeholderName={"Select Country Code"}
                          htmlFor={"exampleInputEmail1"}
                          required={true}
                          labelclassName={"form-label"}
                          value={registerData?.phoneNo}
                          onChange={(text) => {
                            setRegisterData({ ...registerData, phoneNo: text });
                          }}
                        />
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <MainInput
                          className={"mb-3"}
                          inputClassName={"form-control address-input"}
                          inputHeading={"Password: "}
                          placeholderName={"******"}
                          htmlFor={"exampleInputEmail1"}
                          required={true}
                          labelclassName={"form-label"}
                          value={registerData?.password}
                          onChange={(password) => {
                            if (password.length <= 50) {
                              setRegisterData((currentState) => ({
                                ...currentState,
                                password,
                              }));
                            } else {
                              MyToast(
                                "Password cannot exceed 50 digits.",
                                "error"
                              );
                              toast.clearWaitingQueue();
                              return;
                            }
                          }}
                          onIconClick={() => iconHandler("password")}
                          type={eyePassword ? "text" : "password"}
                          icon={
                            eyePassword ? (
                              <IoEye color="#2e3192" size={18} />
                            ) : (
                              <IoEyeOff color="#2e3192" size={18} />
                            )
                          }
                        />
                      </div>

                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <MainInput
                          className={"mb-3"}
                          inputClassName={"form-control address-input"}
                          inputHeading={"Confirm Password: "}
                          placeholderName={"******"}
                          htmlFor={"exampleInputEmail1"}
                          labelclassName={"form-label"}
                          required={true}
                          value={registerData?.confirmPassword}
                          onChange={(confirmPassword) => {
                            if (confirmPassword.length <= 50) {
                              setRegisterData((currentState) => ({
                                ...currentState,
                                confirmPassword,
                              }));
                            } else {
                              MyToast(
                                "Password cannot exceed 50 digits.",
                                "error"
                              );
                              toast.clearWaitingQueue();
                              return;
                            }
                          }}
                          onIconClick={() => iconHandler("confirmPassword")}
                          type={eyeConfirmPassword ? "text" : "password"}
                          icon={
                            eyeConfirmPassword ? (
                              <IoEye color="#2e3192" size={18} />
                            ) : (
                              <IoEyeOff color="#2e3192" size={18} />
                            )
                          }
                        />
                      </div>

                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="mb-2">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="isChecked"
                            />
                            <label className="form-check-label" htmlFor="ishop">
                              I agree to all the {""}
                              <a className="text-decoration-none text-black" onClick={handleTermsClick}>
                                <b style={{ cursor: "pointer" }}>Terms</b> {""}
                              </a>
                              and {""}
                              <a className="text-decoration-none text-black" onClick={handlePrivacyPolicyClick}>
                                <b style={{ cursor: "pointer" }}>
                                    Privacy Policy
                                </b>
                              </a>
                              .
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <CategoryButton
                          buttonName={
                            isLoading ? (
                              <CustomLoader
                                size={14}
                                className={"loaderStyle mb-3"}
                              />
                            ) : (
                              buttonName
                            )
                          }
                          className={"btn btn-theme-blue mt-1 w-100"}
                          type={"submit"}
                          onClick={() => {
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            const passwordRegex =
                              /^(?=.*[0-9])(?=.*[!@#$%^&*_\-\/\\{}()+=,.`~?:;<>'"])[a-zA-Z0-9!@#$%^&*_\-\/\\{}()+=,.`~?:;<>'"]{8,}$/;
                            const phoneNumberRegex = /^\d{11}$/;

                            const isFieldEmpty = Object.entries(
                              registerData
                            ).find(([key, value]) => {
                              return /^\s*$/.test(value);
                            });

                            if (isFieldEmpty) {
                              MyToast(
                                `${
                                  isFieldEmpty[0].charAt(0).toUpperCase() +
                                  isFieldEmpty[0].slice(1).toLocaleLowerCase()
                                } is required`,
                                "error"
                              );
                              toast.clearWaitingQueue();
                              return;
                            }

                            // if (!nameInputRegex.test(registerData?.firstName)) {
                            //   MyToast(
                            //     "Firstname must consist of only Alphabets.",
                            //     "error"
                            //   );
                            //   toast.clearWaitingQueue();
                            //   return;
                            // }

                            // if (!nameInputRegex.test(registerData?.lastName)) {
                            //   MyToast(
                            //     "Lastname must consist of only Alphabets.",
                            //     "error"
                            //   );
                            //   toast.clearWaitingQueue();
                            //   return;
                            // }

                            if (!emailRegex.test(registerData?.email)) {
                              MyToast("Email incorrect", "error");
                              toast.clearWaitingQueue();
                              return;
                            }

                            if (!passwordRegex.test(registerData?.password)) {
                              MyToast(
                                "Password must be at least 8 characters and include a symbol and a number.",
                                "error"
                              );
                              toast.clearWaitingQueue();
                              return;
                            }

                            if (
                              registerData?.password !==
                              registerData?.confirmPassword
                            ) {
                              MyToast(
                                "Password & confirmation password doesn't match",
                                "error"
                              );
                              toast.clearWaitingQueue();
                              return;
                            }

                            if (!document.getElementById("isChecked").checked) {
                              MyToast(
                                "Agree to the terms and privacy policy",
                                "error"
                              );
                              toast.clearWaitingQueue();
                              return;
                            }

                            setIsLoading(true);

                            dispatch(
                              handleRegisterUser(
                                registerData,
                                setIsLoading,
                                setIsModalChange,
                                setRegisterData,
                                dispatch
                              )
                            );
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <hr className="mt-3 mb-3" />

                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <p>
                        Don’t have an account ?{" "}
                        <a
                          data-bs-target="#exampleModalToggle2"
                          data-bs-toggle="modal"
                          data-bs-dismiss="modal"
                          onClick={onButtonClick}
                          style={{ cursor: "pointer" }}
                        >
                          {navigateButtonName}
                        </a>
                      </p>
                    </div>
                  </div>
                  {/* </form> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </Modal>
    </>
  );
}

export default ModalSection;
