import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import MainInput from "../input/MainInput";
import CategoryButton from "../button/CategoryButton";
import MainImage from "../../assets/images/forgot-img.webp";
import CustomLoader from "../toast/CustomLoader";
import { MyToast, toast } from "../toast/MyToast";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { handleResetPasswordUser } from "../../redux/actions/AuthAction";
import { IoEye, IoEyeOff } from "react-icons/io5";

const ResetPassModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [eyePassword, setEyePassword] = useState(false);
  const [eyeConfirmPassword, setEyeConfirmPassword] = useState(false);
  const [passwordToken, setPasswordToken] = useState(null);
  const [resetPassData, setResetPassData] = useState({
    password: "",
    confirmPassword: "",
  });

  function iconHandler(field) {
    if (field === "password") {
      setEyePassword(!eyePassword);
    } else if (field === "confirmPassword") {
      setEyeConfirmPassword(!eyeConfirmPassword);
    }
  }

  useEffect(() => {
    const path = window.location.href;
    // Split the path based on '/'
    const pathSegments = path.split("/");
    // Extract the last segment of the path, which contains the identifier
    const extractedIdentifier = pathSegments[pathSegments.length - 1];
    setPasswordToken(extractedIdentifier);
  });

  return (
    <Modal show={true} size="xl" centered className="resetPassStyle">
      <div className="modal-content">
        <div className="modal-body">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-4 col-md-4 col-sm-8 col-xs-12 d-none d-xl-block">
              <div className="login-img m-0 p-0">
                <img src={MainImage} className="forgotPass" />
              </div>
            </div>
            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="login">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="loginSpan">Reset Password</span>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      navigate("/");
                    }}
                  />
                </div>
                <hr />
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <MainInput
                      className={"mb-3"}
                      inputClassName={"form-control address-input"}
                      inputHeading={"Password: "}
                      placeholderName={"******"}
                      required={true}
                      htmlFor={"exampleInputEmail1"}
                      labelclassName={"form-label"}
                      value={resetPassData?.password}
                      onChange={(password) => {
                        if (password.length <= 50) {
                          setResetPassData((currentState) => ({
                            ...currentState,
                            password,
                          }));
                        } else {
                          MyToast("Password cannot exceed 50 digits.", "error");
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

                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <MainInput
                      className={"mb-3"}
                      inputClassName={"form-control address-input"}
                      inputHeading={"Confirm Password: "}
                      placeholderName={"******"}
                      required={true}
                      htmlFor={"exampleInputEmail1"}
                      labelclassName={"form-label"}
                      value={resetPassData?.confirmPassword}
                      onChange={(confirmPassword) => {
                        if (confirmPassword.length <= 50) {
                          setResetPassData((currentState) => ({
                            ...currentState,
                            confirmPassword,
                          }));
                        } else {
                          MyToast("Password cannot exceed 50 digits.", "error");
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
                    <CategoryButton
                      buttonName={
                        isLoading ? (
                          <CustomLoader
                            size={14}
                            className={"loaderStyle mb-3"}
                          />
                        ) : (
                          "Reset Password"
                        )
                      }
                      className={"btn btn-theme-blue mt-1 w-100"}
                      type={"submit"}
                      onClick={() => {
                        const passwordRegex =
                          /^(?=.*[0-9])(?=.*[!@#$%^&*_\-\/\\{}()+=,.`~?:;<>'"])[a-zA-Z0-9!@#$%^&*_\-\/\\{}()+=,.`~?:;<>'"]{8,}$/;
                        const isFieldEmpty = Object.entries(resetPassData).find(
                          ([key, value]) => {
                            return /^\s*$/.test(value);
                          }
                        );

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

                        if (!passwordRegex.test(resetPassData?.password)) {
                          MyToast(
                            "Invalid password. It must be at least 8 characters and include a symbol and a number.",
                            "error"
                          );
                          toast.clearWaitingQueue();
                          return;
                        }

                        if (
                          resetPassData?.password !==
                          resetPassData?.confirmPassword
                        ) {
                          MyToast(
                            "Password & confirmation password doesn't match",
                            "error"
                          );
                          toast.clearWaitingQueue();
                          return;
                        }

                        setIsLoading(true);
                        dispatch(
                          handleResetPasswordUser(
                            resetPassData,
                            setIsLoading,
                            navigate,
                            passwordToken
                          )
                        );
                      }}
                    />
                  </div>
                </div>

                <hr className="mt-3 mb-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ResetPassModal;
