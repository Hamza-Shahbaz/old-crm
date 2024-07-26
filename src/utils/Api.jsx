// export const BaseUrl = "https://ecommerce.ohiobizz.com/api/";
export const BaseUrl = "https://ecommerce.sourcecodeemployees.com/api/";
// export const BaseUrl = "https://ecommerce.sourcecodeemployees.com/api/"

export const EndPoints = {
  login: "login", // login user
  registerUser: "register", //Register
  forgotPassword: "user/send-password-reset-email", //forgot password
  resetPassword: "reset-password", //reset password
  updateProfile: "update-customer-profile", //update profile data
  product: "products/category/", // get products by category
  productReview: "create-product-review", //productReview
  product_by_category: "products/category/", // get products by category
  products: "products", // get products by category
  singleproduct: "product/",
  product_review_permission: "check-if-product-can-be-reviewed/", //get permission for user review insertion
  main_category: "main-category", // get categories
  banner: "banners", //for main page banners
  filtered_products_of_category: "products/category-products-filtered/", //for getting filtered products in any category
  posters: "get-posters", //for main page posters
  latest_products: "get-latest-products", //for latest products
  similar_products: "get-similar-products/", //for similar products
  cart: "cart/update", //for cart
  order_data: "get-order-data", //for main page banners
  add_card: "add-card", //for checkout
  register_address: "register-address", //checkout
  store_order: "store-order", //checkout
  remove_card: "remove-card", //checkout
  work_queue: "work-queue", // for work queue
  siteSettings: "settings/get-site-settings", // site setting
  filter: "filters/get-filters-for-category/", // filter
  best_selling_products: "get-best-selling-products", //category
  search_product: "search-products?text=",
  guest_login: "guest-login",
  featured_category: "featured-category/", //category
  featured_products: "featured-products/", //products
  lightening_products: "get-lightening-products/", //category
  coupon: "coupon/", //coupon
  update_order_to_pending: "update-order-to-pending",
  user_orders_status: "get-orders-for-customer", //order status
  user_order_details: "get-order-details-for-customer/", //order Detail
  getFakePhotos1: "https://jsonplaceholder.typicode.com/photos", //fake photos api 1 for check
  getFakePhotos2: "https://fakestoreapi.com/products?limit=20", //fake photos api 2 for check
};

import axios from "axios";

export async function getData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error in get Product", error);
  }
}

export async function postDatahandler(url, postData) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  const resData = await response.json();
  return resData;
}
