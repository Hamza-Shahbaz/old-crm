import React, { useEffect, useState } from "react";
import AccountCart from "../../components/account/AccountCart";
import men1 from "../../assets/images/men-1.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderStatusRequest } from "../../redux/actions/OrderAction";
import { useNavigate } from "react-router-dom";
import OrderStatusList from "./OrderStatusList";
import {} from "@ant-design/icons";
import { ReloadOutlined, SyncOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { symbolAmount } from "../../utils/Helper";

function OrderStatus() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currencyRate = useSelector((state) => state.siteSettingReducerData?.currentCurrency?.conversion_rate) || 1
  const currencyCode = useSelector((state) => state.siteSettingReducerData?.currentCurrency?.currency_iso_code) || "USD"
  const [isLoading, setIsLoading] = useState(false);

  const ordersByStatus = {};

  const loginData = useSelector((state) => state.AuthReducerData.loginUser);
  const orderStatusData = useSelector((state) => state.OrderReducerData.orders);
  
  if (orderStatusData && orderStatusData.order_data) {
    Object.values(orderStatusData?.order_data).forEach((order) => {
      if (!ordersByStatus[order.order_status_title]) {
        ordersByStatus[order.order_status_title] = [];
      }
      ordersByStatus[order.order_status_title].push(order);
    });
  }

  useEffect(() => {
    if (loginData?.token) {
      dispatch(
        fetchOrderStatusRequest(
          loginData?.token,
          setIsLoading,
          navigate,
          dispatch
        )
      );
    }
  }, [loginData?.token]);

  // function orderDetailHandler(orderId) {
  //   alert(orderId);
  //   dispatch;
  // }

  function orderDetailHandler(orderId) {
    navigate("/order-confirmation/" + "orderid=" + orderId, {
      state: { id: orderId },
    });
  }

  return (
    <div
      className="tab-pane"
      id="history"
      role="tabpanel"
      aria-labelledby="v-pills-history-tab"
    >
      {/* {isLoading ? <SyncOutlined spin /> : <ReloadOutlined onClick={()=>{
           dispatch(
            fetchOrderStatusRequest(
              loginData?.token,
              setIsLoading,
              navigate,
              dispatch
            )
          );
      }} />} */}

      <div className="account-sec-body">
        <div className="profile-sec-middle bg-pimary ">
          {ordersByStatus &&
            Object.keys(ordersByStatus).map((status) => (
              <div key={status}>
                <div
                  className="card card-edited mb-5"
                  style={{
                    border: "1px solid rgb(232, 223, 223)",
                    backgroundColor: "",
                  }}
                >
                  <div className="profile-sec-middle profile-sec-middle-edited mt-3 mb-3 mx-1 bg-inf ">
                    <p className="text-center text-sm-start">{status}</p>
                  </div>
                  {ordersByStatus[status].map((order) => {
                    return (
                      <OrderStatusList
                        key={order.order_id}
                        cartItemName={order.products || ""}
                        dicountedPrice={symbolAmount(order?.net_total, order?.currency_iso_code)}
                        expectedDeliveryTime={"02 Nov"}
                        isCartRight={true}
                        deliveryDate={order?.created_at}
                        orderType={order.order_status_title}
                        headingName={order.order_status_title}
                        isImage={false}
                        isShowButton={true}
                        orderId={order.order_serial_no}
                        onOrderDetailClick={orderDetailHandler.bind(
                          this,
                          order.order_id
                        )}
                        created_at={order.created_at}
                      />
                    );
                  })}

                  {ordersByStatus[status].length === 0 && (
                    <div className="profile-sec-middle">
                      <div className="border py-2 px-2">
                        <p className="orderHistoryText">No order history yet</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          {Object.values(ordersByStatus)?.length === 0 && (
            <div className="profile-sec-middle">
              <div className="border py-2 px-2 orderHistoryText">No order history yet</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderStatus;
