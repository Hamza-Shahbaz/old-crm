import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Products from "../pages/products/Products";
import PublicRoutes from "./PublicRoutes";
import MyCart from "../pages/cart/MyCart";
import Checkout from "../pages/checkOut/Checkout";
import OrderConfirm from "../pages/orderconfirm/OrderConfirm";
import MyAccount from "../pages/myaccount/MyAccount";
import SubCategory from "../pages/subCategory/SubCategory";
import PrivateRoutes from "./PrivateRoutes";
import ResetPassModal from "../components/modal/ResetPassModal";
import Category from "../pages/category/Category";
import PageNotFound from "../pages/Not found/PageNotFound";
import UnAuthorize from "../pages/Not found/Unauthorize";
import Viewall from "../pages/ViewAll/Viewall";
import { Breadcrumb } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { TRUNCATE_BREADCRUMBS } from "../redux/constant/constants";
import Policy from "../pages/policy/policy";
import ReturnPolicy from "../pages/policy/ReturnPolicy";
import OrderConfirmation from "../pages/orderConfirmation/OrderConfirmation";
import AboutUs from "../pages/policy/AboutUs";

export const CustomBreadcrumb = () => {
  const breadcrumbs = useSelector(
    (state) => state.BreadcrumbReducerData.breadcrumbs
  );

  let dispatch = useDispatch();

  const handleBreadcrumbClick = (index) => {
    dispatch({ type: TRUNCATE_BREADCRUMBS, payload: index });
  };

  let newBread = breadcrumbs.filter((item) => item.name != null);

  return (
    newBread.length > 1 && (
      <div className="container breadcrumbStyle g-0">
        <Breadcrumb separator={<span className="">{">"}</span>}>
          {newBread.map((breadcrumb, index) => {
            const isLastItem = index === newBread.length - 1;
            return (
              <Breadcrumb.Item key={index}>
                <Link
                  to={breadcrumb.path}
                  onClick={() => handleBreadcrumbClick(index)}
                  style={{
                    textDecoration: "none",
                    color: isLastItem ? "rgb(117, 119, 189)" : "#959595",
                  }}
                  className="breadcrumbTextStyle"
                >
                  {breadcrumb.name}
                </Link>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </div>
    )
  );
};

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route
            path="/order-confirmation/:id"
            element={<OrderConfirmation />}
          />
          {/* <Route path="/myaccount" element={<MyAccount />} /> */}
        </Route>

        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          <Route path="/login-required" element={<UnAuthorize />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="all-products" element={<Viewall />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Products />} />
          <Route path="/mycart" element={<MyCart />} />
          <Route path="/myaccount" element={<MyAccount />} />

          <Route path="/category/:id" element={<Category />} />
          <Route path="/subcategory/:id" element={<SubCategory />} />
          <Route path="/orderconfirm" element={<OrderConfirm />} />
          <Route path="/reset-password/*" element={<ResetPassModal />} />
          <Route path="/privacy-policy" element={<Policy />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
