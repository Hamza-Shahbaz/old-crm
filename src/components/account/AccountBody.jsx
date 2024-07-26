import React, { useEffect, useState } from "react";
import TabLink from "./TabLink";
import TabContent from "./TabContent";
import MyProfile from "./MyProfile";
import FormSection from "../checkoutForm/FormSection";
import PaymentMethod from "../checkoutForm/address/PaymentMethod";
import Contact from "./Contact";
import OrderStatus from "./OrderStatus";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { handleIconId } from "../../redux/actions/AuthAction";
import CategoryButton from "../button/CategoryButton";
import { fetchOrderStatusRequest } from "../../redux/actions/OrderAction";
import { ReloadOutlined, SyncOutlined } from "@ant-design/icons";

const AccountBody = ({ logoutHandler }) => {
  // const [activeTab, setActiveTab] = useState("");
  // console.log("active tab", activeTab);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const loginData = useSelector((state) => state.AuthReducerData.loginUser);
  const location = useLocation();

  const iconID = useSelector((state) => state.iconId?.iconId);
  // console.log("iconID------->", iconID);

  // const a = iconID ? iconID : null;
  // console.log('a',a)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    if(iconID === "list-history" && loginData?.token) {
      dispatch(
        fetchOrderStatusRequest(
          loginData?.token,
          setIsLoading,
          navigate,
          dispatch
        )
      );
    }
  }, [iconID])

  const handleTabClick = (id) => {
    dispatch(handleIconId(id));
  };

  return (
    <section className="profile-options">
      {loginData && loginData?.token ? (
        <div className="container my-lg-5 my-3">
          <div className="d-flex justify-content-between">
            <div className="d-inline pb-2 px-3">
              <h3> My Account </h3>
            </div>
            {iconID === "list-history" && (
              <div className="d-inline pb-2 px-3">
                <CategoryButton
                  disabled={isLoading}
                  onClick={() => {
                    dispatch(
                      fetchOrderStatusRequest(
                        loginData?.token,
                        setIsLoading,
                        navigate,
                        dispatch
                      )
                    );
                  }}
                  buttonName={
                    <div className="d-flex">
                      <div className="px-1"> Refresh</div>
                      <div className="px-1">
                        {isLoading ? <SyncOutlined spin /> : <ReloadOutlined />}
                      </div>
                    </div>
                  }
                  className={"btn btn-warning reload-edit"}
                />
              </div>
            )}
          </div>
          {/* </div> */}
          <div className="row">
            <div className="col-lg-3 table-area">
              <div className="list-group" id="list-tab" role="tablist">
                <TabLink
                  id="list-profile"
                  to="#list-profile"
                  label="My Profile"
                  isActive={iconID === "list-profile"}
                  onClick={() => handleTabClick("list-profile")}
                />

                <TabLink
                  id="list-password"
                  to="#list-password"
                  label="Change Password"
                  isActive={iconID === "list-password"}
                  onClick={() => handleTabClick("list-password")}
                />

                {/* <TabLink
                  id="list-address"
                  to="#list-address"
                  label="My Address Book"
                /> */}
                {/* <TabLink id="list-wallet" to="#list-wallet" label="My Wallet" /> */}

                <TabLink
                  id="list-favorite"
                  to="#list-favorite"
                  label="My Favorite"
                  isActive={iconID === "list-favorite"}
                  onClick={() => handleTabClick("list-favorite")}
                />
                <TabLink
                  id="list-history"
                  to="#list-history"
                  label="Order History"
                  isActive={iconID === "list-history"}
                  onClick={() => handleTabClick("list-history")}
                />
                <TabLink
                  id="list-contact"
                  to="#list-contact"
                  label="Contact us"
                  isActive={iconID === "list-contact"}
                  onClick={() => handleTabClick("list-contact")}
                />
                <TabLink
                  onClick={logoutHandler}
                  id="list-logout"
                  to="#list-logout"
                  label="Log out"
                />
              </div>
            </div>
            <div className="col-lg-9">
              <div className="tab-content" id="nav-tabContent">
                <TabContent
                  id="list-profile"
                  label="My Profile"
                  content={<MyProfile isShown={1} />}
                  isShow={iconID === "list-profile"}
                />

                <TabContent
                  id="list-password"
                  label="Change Password"
                  content={<MyProfile isShown={3} />}
                  isShow={iconID === "list-password"}
                />

                {/* <TabContent
                  id="list-address"
                  label="My Address Book"
                  content={
                    <FormSection
                      headType={2}
                      className={"btn btn-theme-blue log-info-btn w-100 "}
                      btnName={"Save Changes"}
                      isBottomButtonCentered={true}
                    />
                  }
                /> */}
                {/* <TabContent
                  id="list-wallet"
                  label="My Wallet"
                  content={
                    <PaymentMethod
                      className={
                        "btn btn-theme-blue  log-info-btn mt-4 accordion-flush w-100 "
                      }
                      btnName={"Save Changes"}
                      headType={2}
                      isBottomButtonCentered={true}
                    />
                  }
                /> */}
                <TabContent
                  id="list-favorite"
                  label="My Favorite"
                  content={<MyProfile isShown={2} />}
                  isShow={iconID === "list-favorite"}
                />
                <TabContent
                  id="list-history"
                  label="Order History"
                  content={<OrderStatus />}
                  isShow={iconID === "list-history"}
                />
                <TabContent
                  id="list-contact"
                  label="Contact us"
                  isShow={iconID === "list-contact"}
                  content={<Contact />}
                />
                <TabContent id="list-logout" label="Log out" />
              </div>
            </div>
          </div>
        </div>
      ) : iconID === "list-contact" ? (
        <div className="container my-lg-5 my-3">
          <div className="row ">
            <h3 className="d-inline pb-2 px-3"> My Account </h3>
          </div>
          <div className="row">
            <div className="col-lg-3 table-area">
              <div className="list-group" id="list-tab" role="tablist">
                <TabLink
                  id="list-contact"
                  to="#list-contact"
                  label="Contact us"
                  isActive={iconID === "list-contact"}
                  onClick={() => handleTabClick("list-contact")}
                />
              </div>
            </div>
            <div className="col-lg-9">
              <div className="tab-content" id="nav-tabContent">
                <TabContent
                  id="list-contact"
                  label="Contact us"
                  isShow={iconID === "list-contact"}
                  content={<Contact />}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container my-lg-5 my-3">
          <div className="row ">
            <h3 className="d-inline pb-2 px-3"> My Account </h3>
          </div>
          <div className="row">
            <div className="col-lg-3 table-area">
              <div className="list-group" id="list-tab" role="tablist">
                <TabLink
                  to="#list-favorite"
                  label="My Favorite"
                  isActive={true}
                />
              </div>
            </div>
            <div className="col-lg-9">
              <div className="tab-content" id="nav-tabContent">
                <MyProfile isShown={2} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AccountBody;
