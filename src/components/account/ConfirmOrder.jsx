import React, { useEffect, useState } from "react";
import empty from "../../assets/images/empty.png";
import OrderConfirmationCheckout from "./OrderConfirmationCheckout";
import AccountCart from "./AccountCart";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetailsRequest } from "../../redux/actions/OrderAction";
import { PropagateLoader } from "react-spinners";
import { IoIosArrowBack } from "react-icons/io";
import { symbolAmount } from "../../utils/Helper";

function ConfirmOrder({ isShownAll }) {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderId = Number(params?.id.slice(8));
  const [isLoading, setIsLoading] = useState(false);

  const loginData = useSelector((state) => state.AuthReducerData.loginUser);
  const orderDetails = useSelector(
    (state) => state.OrderReducerData.orderDetails
  );

  const orderInvoiceData =
    orderDetails &&
    orderDetails?.order_head_data &&
    orderDetails?.order_head_data?.head;
  const orderProducts = orderDetails && orderDetails?.products_data;

  // console.log(orderProducts);
  // console.log(isLoading);

  const checkingProperty = "status" in orderDetails;
  
  useEffect(() => {
    console.log(checkingProperty);
    if (checkingProperty) {
      navigate("/")
    }
  }, [checkingProperty]);


  useEffect(() => {
    if (loginData?.token) {
      dispatch(
        getOrderDetailsRequest(
          loginData.token,
          orderId,
          setIsLoading,
          navigate,
          dispatch
        )
      );
    }
  }, [orderId, loginData?.token]);
  let currencyCode;

  if (orderProducts) {
    currencyCode = Object.values(orderProducts)[0].currency_iso_code;
  }

  if (orderInvoiceData) {
    orderInvoiceData.currencyCode = currencyCode;
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <section className={isShownAll ? "my-cart" : "my-cart pt-0"}>
      {isShownAll ? (
        <>
          <div className="container">
            <div className="row justify-content-center mt-3">
              <div className="section-titlee">
                <div className="back-arrow mb-4" style={{ cursor: "pointer" }}>
                  <IoIosArrowBack
                    size={24}
                    onClick={() => {
                      navigate(-1);
                    }}
                  />
                </div>
                <h1 className="mb-4">Order History</h1>
              </div>

              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <div className="profile-sec-middle cart-left">
                  {isLoading ? (
                    <div
                      style={{
                        backgroundColor: "",
                        height: 500,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: ".5px solid #cccccc",
                      }}
                    >
                      <PropagateLoader size={16} color="#2e3192" />
                    </div>
                  ) : (
                    <>
                      {orderProducts &&
                        Object.values(orderProducts).map((order) => {
                          return (
                            <AccountCart
                              tooltipId={order?.product_id}
                              salePrice={symbolAmount(
                                order?.sale_price,
                                order?.currency_iso_code
                              )}
                              actualPrice={symbolAmount(
                                order?.price,
                                order?.currency_iso_code
                              )}
                              cartItemName={
                                order?.product_name +
                                  (order?.variant_name_combo
                                    ? "(" + order?.variant_name_combo + ")"
                                    : "") || null
                              }
                              dicountedPrice={"Save " + order?.discount}
                              cartProductImage={order?.image_path}
                              isCartRight={true}
                              orderType={"inProgress"}
                              head={1}
                              qty={order?.product_quantity}
                            />
                          );
                        })}
                    </>
                  )}
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                {isLoading ? (
                  <div
                    style={{
                      backgroundColor: "",
                      height: 500,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: ".5px solid #cccccc",
                    }}
                  >
                    <PropagateLoader size={16} color="#2e3192" />
                  </div>
                ) : (
                  <OrderConfirmationCheckout
                    {...orderInvoiceData}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="container">
          <div className="row justify-content-center mt-3">
            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <img src={empty} alt="Empty Cart" />
              <p>Your cart is empty.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ConfirmOrder;
