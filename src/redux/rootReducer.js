import { combineReducers } from "redux";
import { AuthReducerData } from "../redux/reducers/AuthReducer";
import {siteSettingReducerData, iconId, updateProfileReducerData} from "../redux/reducers/AuthReducer";

import {
  categoryReducerData,
  productReducerData,
  handleCartItem,
  bannerReducerData,
  latestProductsReducerData,
  postersReducerData,
  filterReducerData,
  reviewReducerData,
  setProductReviewPermission
} from "./reducers/CategoryReducer";
import { SliderReducerData } from "./reducers/SliderReducer";
import { singleProductReducer } from "./reducers/ProductReducer";
import OrderReducerData from "./reducers/OrderReducer";
import { BreadcrumbReducerData } from "./reducers/BreadcrumbsReducer";

export default combineReducers({
  AuthReducerData,
  categoryReducerData,
  reviewReducerData,
  SliderReducerData,
  productReducerData,
  handleCartItem,
  bannerReducerData,
  latestProductsReducerData,
  singleProductReducer,
  setProductReviewPermission,
  OrderReducerData,
  postersReducerData,
  filterReducerData,
  siteSettingReducerData,
  BreadcrumbReducerData,
  iconId,
  updateProfileReducerData
});
