import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import MainInput from "../input/MainInput";
import CategoryButton from "../button/CategoryButton";
import CustomLoader from "../toast/CustomLoader";
import { MyToast, toast } from "../toast/MyToast";
import { Link } from "react-router-dom";
import { handleForgotPassword } from "../../redux/actions/AuthAction";
import { useDispatch } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ForgotPassModal = ({
  onNavigateTo,
  isOpen,
  onClose,
  closeModal,
  navigateToLogin,
  MainImage,
}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPassData, setForgotPassData] = useState({
    email: "",
  });

  return (
    <Modal show={isOpen} onHide={onClose} size="xl" centered>
      <div className="modal-content">
        <div className="modal-body">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-4 col-md-4 col-sm-8 col-xs-12 d-none d-xl-block">
              <div className="login-img m-0 p-0">
                <LazyLoadImage
                  className="forgotPass"
                  alt={MainImage?.props?.alt}
                  height={MainImage?.props?.height}
                  src={MainImage?.props?.src}
                  effect="blur" // Optional: Adds blur effect while loading
                  visibleByDefault={false} // Initially not visible until in view
                  // delayTime={300}
                  // threshold={200}
                  onLoad={MainImage?.props?.onLoad}
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="login">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="loginSpan">Forgot Password</span>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    onClick={closeModal}
                  />
                </div>
                <hr />
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <MainInput
                      className={"mb-3"}
                      inputClassName={"form-control address-input"}
                      inputHeading={"Email: "}
                      placeholderName={"Email"}
                      required={true}
                      type={"email"}
                      htmlFor={"exampleInputEmail1"}
                      labelclassName={"form-label"}
                      value={forgotPassData?.email}
                      onChange={(text) => {
                        setForgotPassData({ ...forgotPassData, email: text });
                      }}
                    />
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
                          "Forgot Password"
                        )
                      }
                      className={"btn btn-theme-blue mt-1 w-100"}
                      type={"submit"}
                      disabled={isLoading}
                      onClick={() => {
                        const isFieldEmpty = /^\s*$/;
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                        if (isFieldEmpty.test(forgotPassData?.email)) {
                          MyToast("Email is required", "error");
                          toast.clearWaitingQueue();
                          return;
                        }

                        if (!emailRegex.test(forgotPassData?.email)) {
                          MyToast("Email incorrect", "error");
                          toast.clearWaitingQueue();
                          return;
                        }

                        setIsLoading(true);

                        dispatch(
                          handleForgotPassword(
                            forgotPassData,
                            setIsLoading,
                            navigateToLogin,
                            dispatch,
                            setForgotPassData
                          )
                        );
                      }}
                    />
                  </div>
                </div>

                <hr className="mt-3 mb-3" />
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <p>
                      Already have an account ?{" "}
                      <Link
                        data-bs-target="#exampleModalToggle2"
                        data-bs-toggle="modal"
                        data-bs-dismiss="modal"
                        onClick={onNavigateTo}
                        style={{ cursor: "pointer" }}
                      >
                        Log In
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ForgotPassModal;
