import React, { useEffect, useState } from "react";
import Cart from "../../assets/images/Cart.png";
import Favourites from "../../assets/images/Favourites.png";
import User from "../../assets/images/User.png";
import TogglerIcon from "../../assets/images/toggler-icon.png";
import { FaAngleDown } from "react-icons/fa";
import ModalSection from "../modal/ModalSection";
import SignInImage from "../../assets/images/logn-img.webp";
import SignUpImage from "../../assets/images/register-img.webp";
import ForgotImage from "../../assets/images/forgot-img.webp";
import ForgotPassModal from "../modal/ForgotPassModal";
import OffCanvasSection from "../offCanvas/OffCanvasSection";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { handleIconId, openModal } from "../../redux/actions/AuthAction";
import SearchInput from "../input/SearchInput";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { SET_CURRENT_CURRENCY } from "../../redux/constant/constants";
import LocalSiteLogo from "../../assets/images/localsitelogo.png";
// import { DownOutlined } from "@ant-design/icons";
// import { Dropdown, Menu } from 'antd';

function HeaderTop() {
  const getCookie = (name) => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }
    return "";
  };

  const [hovering, setHovering] = useState(false);
  let currencyOptions = [];

  const currentCurrency = useSelector(
    (state) => state.siteSettingReducerData.currentCurrency
  );

  const cartData = useSelector((state) => state?.handleCartItem?.addToCart);
  const favourites = useSelector((state) => state?.handleCartItem?.favorites);

  const isDataArray = [];

  for (let index = 0; index < cartData.length; index++) {
    var isData = cartData?.[index]["quantity"];
    isDataArray.push(isData);
  }

  const totalQuantity = isDataArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state) => state.AuthReducerData.isModalOpen.status
  );
  const [isModalChange, setIsModalChange] = useState(false);
  const [isModalChange1, setIsModalChange1] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const loginData = useSelector((state) => state.AuthReducerData.loginUser);
  const latestMobSliderData = useSelector(
    (state) => state.SliderReducerData.sliders.BEST_MOBILE.sliderData.data
  );

  let transformedData = [];

  if (latestMobSliderData && latestMobSliderData.products_data) {
    transformedData = Object.values(latestMobSliderData?.products_data).map(
      ({ product_id, product_name, image_path }) => ({
        value: product_id,
        label: product_name,
        img: image_path,
      })
    );
  }

  const [show, setShow] = useState(false);

  //For offCanvas //
  const handleShow = () => setShow(true);

  // Forgot Pass //
  const openForgotModal = () => {
    dispatch(openModal(false));
    setIsForgotModalOpen(true);
  };

  const closeForgotModal = () => {
    setIsForgotModalOpen(false);
  };

  const navigateToLogin = () => {
    setIsModalChange(false);
    setIsForgotModalOpen(false);
    dispatch(openModal(true));
  };

  // Auth Navigation //

  const authNavigation = () => {
    setIsModalChange(!isModalChange);
  };

  const openModalLocal = () => {
    dispatch(openModal(true));
  };

  const closeModal = () => {
    dispatch(openModal(false));
    setIsModalChange(false);
  };

  // function myAccountNavigator() {
  //   navigate("/myaccount");
  // }

  // Classes for Auth Image //
  const signIn =
    "col-xl-6 col-lg-4 col-md-4 col-sm-8 col-xs-12 d-none d-xl-block";
  const signUp =
    "col-xl-0 col-lg-4 col-md-4 col-sm-8 col-xs-12 d-none d-xl-block";

  // Classes for Auth Form Inputs////
  const signInForm = "col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12";
  const signUpForm = "col-xl-8 col-lg-12 col-md-12 col-sm-12 col-xs-12";

  //for automatically close off canvas on bigger screens /////
  const handleCloseOffCanvas = () => {
    if (show) {
      setShow(false);
    }
  };
  useEffect(() => {
    const handleWindowResize = () => {
      // Close off-canvas when the screen size changes
      handleCloseOffCanvas();
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleWindowResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [show]);

  const siteSettingsData = useSelector(
    (state) => state?.siteSettingReducerData?.siteSettings?.settings
  );

  if (siteSettingsData?.currencies?.length > 0) {
    currencyOptions = siteSettingsData?.currencies?.map(
      (item) => item.currency_iso_code
    );
  }

  useEffect(() => {
    if (siteSettingsData?.currencies.length !== 0) {
      if (currentCurrency) {
        return;
      }
      let currency = siteSettingsData?.currencies.filter(
        (item) => item.currency_iso_code === "USD"
      )[0];
      dispatch({ type: SET_CURRENT_CURRENCY, payload: currency });
    }
  }, [siteSettingsData]);

  const handleCurrencyChange = (currency) => {
    let newCurrency = siteSettingsData?.currencies.filter(
      (item) => item.currency_iso_code === currency
    )[0];
    dispatch({ type: SET_CURRENT_CURRENCY, payload: newCurrency });
    setHovering(false);
  };

  // const currencyMenu = (
  //   <Menu>
  //     {currencyOptions.length > 0 ? (
  //       currencyOptions.map((item, index) => (
  //         <Menu.Item key={index} onClick={() => handleCurrencyChange(item)}>
  //           {item}
  //         </Menu.Item>
  //       ))
  //     ) : null}
  //   </Menu>
  // );

  return (
    <section className="top-bar">
      {/* Auth Modal Work */}
      <ModalSection
        setIsModalChange={setIsModalChange}
        isOpen={isModalOpen}
        onClose={closeModal}
        closeModal={closeModal}
        authHeading={!isModalChange ? "Sign In" : "Create Account"}
        MainImage={
          <LazyLoadImage
            alt={!isModalChange ? "Sign In Image" : "Sign Up Image"}
            src={!isModalChange ? SignInImage : SignUpImage}
            onLoad={() => {
              setTimeout(() => {}, 2000);
            }}
          />
        }
        formChange={!isModalChange}
        onButtonClick={authNavigation}
        imageClass={!isModalChange ? signIn : signUp}
        formClass={!isModalChange ? signInForm : signUpForm}
        navigateButtonName={!isModalChange ? "Sign Up" : "Sign In"}
        buttonName={!isModalChange ? "Sign In" : "Create Account"}
        openForgotModal={openForgotModal}
        getCookie={getCookie}
      />

      {/* Forgot Password Modal Work */}
      <ForgotPassModal
        navigateToLogin={navigateToLogin}
        isOpen={isForgotModalOpen}
        closeModal={closeForgotModal}
        onClose={closeForgotModal}
        onNavigateTo={navigateToLogin}
        MainImage={
          <LazyLoadImage
            alt={!isModalChange1 ? "Forgot Image" : null}
            src={!isModalChange1 ? ForgotImage : null}
            onLoad={() => {
              setTimeout(() => {}, 2000);
            }}
          />
        }
      />

      <OffCanvasSection
        onHide={handleCloseOffCanvas}
        show={show}
        buttonOnClick={handleCloseOffCanvas}
        modalFalse={setShow}
      />

      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-2 col-lg-2 col-md-3 col-6">
            <div className="top-logo">
              <nav className="navbar-expand-lg navbarStyle">
                <button
                  className="navbar-toggler mx-2"
                  type="button"
                  onClick={handleShow}
                >
                  <img
                    src={TogglerIcon}
                    className="navbar-toggler-icon togglerStyle"
                  />
                </button>

                <Link className="navbar-brand" to={"/"}>
                  <img
                    className="headerImageStyle"
                    src={siteSettingsData?.site_logo || LocalSiteLogo}
                    onError={(event) => {
                      event.target.src = LocalSiteLogo;
                      event.onerror = null;
                    }}
                  />
                </Link>
              </nav>
            </div>
          </div>
          <div className="col-xl-8 col-lg-8 col-md-6 col-12 top-order-3">
            <form className="">
              <SearchInput data={transformedData} />
            </form>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-3 col-6 top-order-2">
            <div className="top-icon">
              <ul className="d-flex list-unstyled  align-items-center mb-0 headerEndStyle">
                <li className="right">
                  <div
                    id="myFavourite"
                    style={{ cursor: "pointer" }}
                    onClick={(event) => {
                      const divId = event.currentTarget.id;
                      // console.log("Clicked div id:", divId);
                      if (divId) {
                        navigate("/myaccount", { state: { id: divId } });
                        dispatch(handleIconId("list-favorite"));
                      }
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <Badge
                        count={favourites?.length}
                        showZero
                        color="#fbb53b"
                        size="middle"
                        style={{ position: "absolute", top: 0, right: 0 }}
                        className="badgeStyle"
                      >
                        <img src={Favourites} className="iconStyle" />
                      </Badge>
                    </div>
                  </div>
                </li>
                <li
                  className="right"
                  onClick={() => {
                    navigate("/mycart");
                  }}
                >
                  <Link>
                    <div style={{ position: "relative" }}>
                      <Badge
                        count={totalQuantity}
                        showZero
                        size="middle"
                        style={{ position: "absolute", top: 0, right: 0 }}
                        className="badgeStyle"
                      >
                        <img src={Cart} className="iconStyle" />
                      </Badge>
                    </div>
                  </Link>
                </li>
                {/* <!-- login --> */}

                <div
                  id="myAccount"
                  style={{ cursor: "pointer" }}
                  onClick={(event) => {
                    const divId = event.currentTarget.id;
                    if (loginData?.token) {
                      if (divId) {
                        navigate("/myaccount", { state: { id: divId } });
                        dispatch(handleIconId("list-profile"));
                      }
                    } else {
                      openModalLocal();
                    }
                  }}
                  className="right"
                >
                  {loginData?.token ? (
                    <Link
                      role="button"
                      className="btn p-0 userInitialsStyle border-0 "
                    >
                      <div className="userInitials mx-1">
                        {loginData?.first_name?.[0]}
                        {loginData?.last_name?.[0]}
                      </div>
                    </Link>
                  ) : (
                    <Link role="button" className="btn btn-link p-0">
                      <img src={User} className="iconStyle" />
                    </Link>
                  )}
                </div>

                {currentCurrency && (
                  <div
                    onMouseLeave={(e) => setHovering(false)}
                    className={`mx-1 endMenu currencyStyleTop ${
                      hovering ? "show" : ""
                    }`}
                  >
                    <Link
                      className={`dropDownStyle d-flex align-items-center justify-content-center  ${
                        hovering ? "show" : ""
                      }`}
                      role="button"
                      onMouseEnter={(e) => setHovering(true)}
                    >
                      {currentCurrency.currency_iso_code}
                      <FaAngleDown className="fa fa-angle-down" size={15} />
                    </Link>
                    <div
                      className={`dropdown-menu currencyContainer ${
                        hovering ? "show" : ""
                      }`}
                    >
                      <div className="">
                        {currencyOptions != "" ? (
                          <div className="column ">
                            {currencyOptions?.map((item, index) => (
                              <div
                                className="col-lg-3 currencyTextStyle "
                                key={index}
                                onClick={() => handleCurrencyChange(item)}
                                // Revert text color on mouse leave
                              >
                                <div
                                  className="currencyMenu"
                                  onMouseEnter={(e) => {
                                    e.target.style.color = "#2E3192";
                                    e.target.style.backgroundColor = "#d2d6ee";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.color = "#000";
                                    e.target.style.backgroundColor = "#fff";
                                  }}
                                >
                                  {item}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )}

                {/* <Dropdown
                  overlay={currencyMenu}
                  trigger={["click"]}
                  visible={hovering}
                  onVisibleChange={setHovering}
                >
                  <Link
                    className={`dropDownStyle d-flex align-items-center justify-content-center bg-primary ${
                      hovering ? "show" : ""
                    }`}
                    role="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setHovering(!hovering);
                    }}
                  >
                    {currentCurrency?.currency_iso_code}
                    <DownOutlined className="fa fa-angle-down" size={15} />
                  </Link>
                </Dropdown> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeaderTop;
