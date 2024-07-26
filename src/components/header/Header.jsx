import React, { useEffect } from "react";
import HeaderTop from "../container/HeaderTop";
import HeaderMain from "../container/HeaderMain";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesRequest } from "../../redux/actions/CategoryActions";
import { CustomBreadcrumb } from "../../router/routes";
import { RESET_BREADCRUMBS } from "../../redux/constant/constants";

function Header() {
  const headerData = useSelector(
    (state) => state?.categoryReducerData.categories
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: RESET_BREADCRUMBS})
  },[])

  useEffect(() => {
    if (!headerData || headerData.length === 0) {
      dispatch(fetchCategoriesRequest());
    }
  }, [headerData, dispatch]);

  return (
    <>
      <HeaderTop />
      <HeaderMain
        txtColor={"white"}
        bgColor={"#2e3192"}
        categories={headerData}
        flag={true}
        transform={"uppercase"}
        megaMenu={true}
        container={true}
      />

      <div style={{ margin: "20px" }}>
        <CustomBreadcrumb />
      </div>
    </>
  );
}

export default Header;
