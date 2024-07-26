import React, { useEffect, useState } from "react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  handleGetSiteSettings,
  handleIconId,
} from "../../redux/actions/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import { IoLocationSharp } from "react-icons/io5";
import { MyToast, toast } from "../toast/MyToast";
import LocalSiteLogo from "../../assets/images/localsitelogo.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Footer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  // useEffect(() => {
  //   scrollToTop();
  // }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  //SELECTOR & USEEFFECT FOR SITE SETTINGS API  //START

  const siteSettingsData = useSelector(
    (state) => state?.siteSettingReducerData?.siteSettings?.settings
  );

  useEffect(() => {
    if (!siteSettingsData || siteSettingsData?.length === 0) {
      dispatch(handleGetSiteSettings());
    }
  }, [siteSettingsData, dispatch]);

  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();

  //END

  const [data, setData] = useState({
    email: "",
  });
  const [emailError, setEmailError] = useState("");

  const openEmailClient = () => {
    const email = siteSettingsData?.site_email;
    if (email) {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <>
      <footer className="footer bg-footer text-white text-xs-center">
        <div className="container">
          <div className="row mt-0 pt-4 pb-4 justify-content-between">
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12 text-m-center">
              <div className="footer-logo">
                {/* <div>
                <LazyLoadImage
                    className="headerImageStyle"
                    src={siteSettingsData?.site_logo}
                    onError={(event) => {
                      event.target.src = LocalSiteLogo;
                      event.onerror = null;
                    }}
                  />
                </div> */}

                <Link to={"/"} onClick={scrollToTop}>
                  <img
                    className="headerImageStyle"
                    src={siteSettingsData?.site_logo || LocalSiteLogo}
                    onError={(event) => {
                      event.target.src = LocalSiteLogo;
                      event.onerror = null;
                    }}
                  />
                </Link>

                <p>Get the latest updates on new products & upcoming sale</p>

                {/* <div className="col-xl-8 col-lg-8 col-md-6 col-12 top-order-3"> */}
                <div className="col-xl-12 col-lg-12 col-md-12 col-12 ">
                  <div className="input-group has-search">
                    <input
                      type="text"
                      value={data?.email}
                      // showError={emailError.length > 0}
                      // errorMessage={emailError}
                      onChange={(event) => {
                        const emailValue = event.target.value;
                        if (emailValue.length <= 100) {
                          setData((currentState) => ({
                            ...currentState,
                            email: emailValue,
                          }));
                          setEmailError("");
                        } else {
                          setEmailError("Email cannot exceed 100 characters.");
                          return;
                        }
                      }}
                      className="form-control top-search p-0 px-3"
                      placeholder="Your Email-Address.."
                      style={{
                        borderTopLeftRadius: "13px",
                        borderBottomLeftRadius: "13px",
                      }}
                    />

                    <button
                      className="btn btn-search"
                      onClick={() => {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (data?.email === "") {
                          setEmailError("Email is required.");
                          return;
                        }

                        if (!emailRegex.test(data?.email)) {
                          setEmailError("Email incorrect.");
                          return;
                        }
                        MyToast("Thank you for subscribing.", "success");
                        toast.clearWaitingQueue();
                        setData((currentState) => ({
                          ...currentState,
                          email: "",
                        }));
                      }}
                    >
                      Subscribe
                    </button>
                  </div>
                  {emailError.length > 0 && emailError && (
                    <p
                      className="mx-1"
                      style={{
                        color: "red",
                        fontSize: "0.8em",
                        marginTop: "0.5em",
                      }}
                    >
                      {emailError}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-xs-6 col-6 text-m-center justify-content-center d-flex ">
              <div className="footer-links m-mt-40">
                <h6>Information</h6>
                <ul className="list-unstyled text-decoration-none ">
                  <li>
                    <Link to={"/about-us"}>About Us</Link>
                  </li>
                  <li>
                    <Link to={"/return-policy"}>Return Policy</Link>
                  </li>
                  <li>
                    <Link to={"/privacy-policy"}>Privacy Policy</Link>
                  </li>

                  <li
                    className="footerContactStyle"
                    style={{ cursor: "pointer" }}
                    id="myContact"
                    onClick={(event) => {
                      const divId = event.currentTarget.id;
                      // console.log("Clicked div id:", divId);
                      if (divId) {
                        navigate("/myaccount", { state: { id: divId } });
                        dispatch(handleIconId("list-contact"));
                      }
                    }}
                  >
                    <Link to={"/privacy-policy"}>Contact Us</Link>
                    
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-xs-6 col-6 text-m-center">
              <div className="footer-links m-mt-40">
                <h6>Social Media</h6>
                <ul className="list-unstyled">
                  {siteSettingsData
                    ? siteSettingsData && (
                        <li>
                          <Link
                            to={siteSettingsData?.facebook_link}
                            target="_blank"
                          >
                            Facebook
                          </Link>
                        </li>
                      )
                    : null}

                  {siteSettingsData
                    ? siteSettingsData && (
                        <li>
                          <Link
                            to={siteSettingsData?.instagram_link}
                            target="_blank"
                          >
                            Instagram
                          </Link>
                        </li>
                      )
                    : null}

                  {siteSettingsData
                    ? siteSettingsData && (
                        <li>
                          <Link to={siteSettingsData?.x_link} target="_blank">
                            Twitter
                          </Link>
                        </li>
                      )
                    : null}
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12  text-m-center">
              <div className="footer-links m-mt-40">
                <h6>Contact Info</h6>
                <div className="footer-logo " style={{ marginTop: "19px" }}>
                  {siteSettingsData && siteSettingsData?.physical_address ? (
                    <div className="d-flex footerEndStyle">
                      <div>
                        <IoLocationSharp size={17} color="2e3192" />
                      </div>

                      <div>
                        <p
                          style={{
                            // cursor: "pointer",
                            wordBreak: "break-word",
                            marginTop: "0px",
                            paddingTop: "2px",
                          }}
                          className="px-1"
                        >
                          {siteSettingsData?.physical_address}
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {siteSettingsData && siteSettingsData?.site_email ? (
                    <div
                      className="d-flex footerEndStyle"
                      style={{ marginTop: "5px", cursor: "pointer" }}
                      onClick={openEmailClient}
                    >
                      <div>
                        <FaEnvelope size={17} color="2e3192" />
                      </div>

                      <div>
                        <p
                          style={{
                            wordBreak: "break-word",
                            marginTop: "0px",
                            paddingLeft: "7px",
                            paddingTop: "2px",
                          }}
                        >
                          {siteSettingsData?.site_email}
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {siteSettingsData && siteSettingsData?.site_contact_no ? (
                    <div
                      className="d-flex footerEndStyle"
                      style={{ marginTop: "5px" }}
                    >
                      <div>
                        <FaPhoneAlt size={17} color="2e3192" />
                      </div>

                      <Link to={`tel:${siteSettingsData?.site_contact_no}`} style={{textDecoration: 'none'}}>
                        <p
                          style={{
                            cursor: "pointer",
                            wordBreak: "break-word",
                            marginTop: "0px",
                            paddingLeft: "7px",
                            paddingTop: "3px",
                          }}
                        >
                          {siteSettingsData?.site_contact_no}
                        </p>
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="footer-bottom">
        <div className="container">
          <div className="row align-items-center mt-0 pt-2 pb-4 text-center">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 text-m-center">
              <div className="footer-bootom-links">
                <span>
                  Copyright © {currentYear} All Rights Reserved By Kings
                  Distributor
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
