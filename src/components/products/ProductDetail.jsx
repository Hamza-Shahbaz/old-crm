import React, { useEffect, useState } from "react";
import ProductDescription from "./ProductDescription";
import CategoryButton from "../button/CategoryButton";
import ReactStars from "react-rating-stars-component";
import { useNavigate, useParams } from "react-router-dom";
import { ImageMagnifier } from "../cart/ImageMagnifier";
import "react-medium-image-zoom/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import dummmyImage from "../../assets/images/no-image1.png";
import dummmyImage1 from "../../assets/images/no-image02.png";

import {
  addToCart,
  addToFavorites,
  fetchSingleProductRequest,
  removeFromFavorites,
} from "../../redux/actions/CategoryActions";
import { MyToast, toast } from "../toast/MyToast";
import VariantSelector from "./VariantSelector";
import { BounceLoader } from "react-spinners";
import { productBreadcrumbsHandler } from "../../redux/actions/BreadcrumbActions";
import { RESET_BREADCRUMBS } from "../../redux/constant/constants";
import { amoutRateConversion } from "../../utils/Helper";
import { Tooltip } from "antd";

function ProductDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const singleProductDetail = useSelector(
    (state) => state.singleProductReducer
  );

  let selectedProduct;

  const favourites = useSelector((state) => state?.handleCartItem?.favorites);

  const [activeIndex, setActiveIndex] = useState(0);
  const [filteredVariants, setFilteredVariants] = useState([]);
  const [variantComboId, setVariantComboId] = useState([]);
  const [LoadingStatus, setLoadingStatus] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const currencyRate =
    useSelector(
      (state) => state.siteSettingReducerData?.currentCurrency?.conversion_rate
    ) || 1;
  const currencyCode =
    useSelector(
      (state) =>
        state.siteSettingReducerData?.currentCurrency?.currency_iso_code
    ) || "USD";

  const updateFilteredVariants = (filteredVariants) => {
    setFilteredVariants(filteredVariants);
  };
  const variantComboIdHandler = (combo_id) => {
    setVariantComboId(combo_id);
  };

  useEffect(() => {}, [filteredVariants, variantComboId]);

  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);

  // Other code...

  useEffect(() => {
    if (
      filteredVariants &&
      variantComboId &&
      filteredVariants[variantComboId]
    ) {
      const { price, product_quantity } = filteredVariants[variantComboId];
      setPrice(price);
      setQuantity(product_quantity);
    }
  }, [filteredVariants, variantComboId]);

  const handleSlideChange = (index) => {
    setActiveIndex(index);
  };

  const productId = Number(params?.id.slice(10));

  useEffect(() => {
    if (params.id) {
      dispatch(fetchSingleProductRequest(productId)); //here
      setLoadingStatus(false);
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
      setTimeout(() => {
        setLoadingStatus(true);
      }, 1000);
    }
  }, [params.id, dispatch]);

  const isProductGet = singleProductDetail && singleProductDetail?.product;
  const Product = singleProductDetail?.product;
  let selectedCategory = useSelector(
    (state) => state?.categoryReducerData.categories
  );

  useEffect(() => {
    if (favourites.length == 0) {
      setFavorite(false);
    }
    for (let i = 0; i < favourites.length; i++) {
      if (favourites[i].id === productId) {
        if (favourites[i].variant_combo_string !== undefined) {
          if (favourites[i].variant_combo_string == variantComboId) {
            setFavorite(true);
            break;
          }
        } else {
          setFavorite(true);
          break;
        }
      }
      setFavorite(false);
    }
  }, [productId, variantComboId, favourites]);

  useEffect(() => {
    if (Product && LoadingStatus && selectedCategory) {
      dispatch(
        productBreadcrumbsHandler(
          selectedCategory,
          singleProductDetail?.product?.product_head[0]
        )
      );
    } else {
      dispatch({ type: RESET_BREADCRUMBS });
    }
  }, [LoadingStatus]);

  const handleImageError = (e) => {
    e.target.onerror = null; // prevent infinite loop
    e.target.src = dummmyImage;
  };

  const handleImageError1 = (e) => {
    e.target.onerror = null; // prevent infinite loop
    e.target.src = dummmyImage1;
  };

  return (
    <section className="product-page" style={{ position: "relative" }}>
      <div className="container">
        {Product && LoadingStatus ? (
          <div className="row justify-content-between mt-4">
            <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12 col-xs-12">
              <div className="product-image-sec">
                <div
                  id="carouselExampleControlsNoTouching"
                  className="carousel slide"
                  data-bs-ride="carousel"
                  data-bs-touch="false"
                  data-bs-interval={2000}
                  data-bs-pause="hover"
                >
                  <div className="row justify-content-between">
                    <div className="col-md-2">
                      <ol className="carousel-indicators list-unstyled">
                        {isProductGet
                          ? singleProductDetail.product.product_images.map(
                              (item, index) => (
                                <li
                                  key={index}
                                  data-bs-slide-to={index + 1}
                                  className={
                                    index === activeIndex ? "active" : ""
                                  }
                                  onClick={() => handleSlideChange(index)}
                                >
                                  <img
                                    onError={handleImageError}
                                    src={
                                      item?.image_path
                                        ? item?.image_path
                                        : dummmyImage
                                    }
                                    alt={`Thumbnail Image ${index + 1} `}
                                    className="img-thumbnail"
                                    style={{
                                      width: 100,
                                      height: 70,
                                      backgroundColor: "#f7f5f5",
                                      objectFit: "contain",
                                    }}
                                  />
                                </li>
                              )
                            )
                          : ""}
                      </ol>
                    </div>

                    <div className="col-md-10 position-relative">
                      <div className="carousel-inner">
                        {isProductGet
                          ? singleProductDetail?.product.product_images.map(
                              (item, index) => (
                                <div
                                  className={`carousel-item ${
                                    index === activeIndex ? "active" : ""
                                  }`}
                                  key={index}
                                >
                                  <div
                                    className="productdetailimage"
                                    style={{
                                      display: "flex",
                                      border: "1px solid #ede4e1",
                                      boxShadow:
                                        "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px", // Apply a box shadow
                                    }}
                                  >
                                    <ImageMagnifier
                                      containerWidth={500}
                                      containerHeight={400}
                                      src={
                                        item?.image_path
                                          ? item?.image_path
                                          : dummmyImage1
                                      }
                                      onError={handleImageError1}
                                    />
                                  </div>
                                </div>
                              )
                            )
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-7 col-lg-7 col-md-6 col-sm-12 col-xs-12">
              <div className="p-right-sec">
                <div className="p-title-sec ">
                  <div className="title productStyleWidth ">
                    {Product?.product_head[0]?.product_name?.length > 65 ? (
                      <Tooltip
                        title={Product?.product_head[0]?.product_name}
                        color="#77878f"
                        placement="bottom"
                      >
                        <h1>
                          {Product?.product_head[0]?.product_name.substring(
                            0,
                            65
                          ) + "...."}
                        </h1>
                      </Tooltip>
                    ) : (
                      <h1>{Product?.product_head[0]?.product_name}</h1>
                    )}

                    <div className="d-flex align-items-center p-1">
                      <ReactStars
                        className="me-2 rating"
                        count={5}
                        size={13}
                        value={Product.product_head[0].product_rating}
                        edit={false}
                        char={<i className="fa-solid fa-star"></i>}
                        activeColor="#FD5F12"
                      />
                      <span className="rating pt-1 px-1">
                        {"(" +
                          (Product.product_head[0].no_of_reviews || "0") +
                          ")"}
                      </span>
                    </div>
                  </div>

                  <div className="p-price-sec">
                    {Product.has_variants_selected === 0 ? (
                      <>
                        <p>
                          {amoutRateConversion(
                            Product.offer_data[0].price,
                            currencyRate,
                            currencyCode
                          )}
                        </p>
                        <p style={{ marginBottom: "5px", fontWeight: "100" }}>
                          {Product.offer_data[0].product_quantity}
                          <span
                            style={{
                              display: "inline-block",
                              marginLeft: "5px",
                            }}
                          >
                            in stock
                          </span>
                        </p>
                      </>
                    ) : Product.has_variants_selected === 1 && price ? (
                      <>
                        <p>
                          {amoutRateConversion(
                            price,
                            currencyRate,
                            currencyCode
                          )}
                        </p>
                        <p style={{ marginBottom: "5px", fontWeight: "100" }}>
                          {quantity}
                          <span
                            style={{
                              display: "inline-block",
                              marginLeft: "5px",
                            }}
                          >
                            in stock
                          </span>
                        </p>
                      </>
                    ) : (
                      <BounceLoader size={12} color="#2e3192" />
                    )}
                  </div>
                </div>

                <ProductDescription>
                  {Product.product_head[0].sdesc}
                </ProductDescription>

                <div className="product-filter-sec">
                  {Product.has_variants_selected === 0 ? (
                    <div className="d-flex align-items-center mb-4">
                      <h5>
                        {/* Quantity: {Product.offer_data[0].product_quantity} */}
                      </h5>
                    </div>
                  ) : (
                    <div className="align-items-center justify-content-between mb-4">
                      <VariantSelector
                        variant_types={
                          singleProductDetail.product.variant_types
                        }
                        variant_combo_reference={
                          singleProductDetail.product.variant_combo_reference
                        }
                        setFilteredVariantsforParent={updateFilteredVariants}
                        onGetVariantComboReferenceId={variantComboIdHandler}
                      />
                    </div>
                  )}

                  <div className="row ">
                    <div className="col-md-6">
                      <CategoryButton
                        onClick={() => {
                          let stock = 0;
                          if (Product?.has_variants_selected) {
                            //when 1
                            if (quantity < 1) {
                              MyToast("Product is out of stock", "error");
                              return;
                            }
                            stock = quantity;
                            selectedProduct = {
                              has_variants_selected:
                                Product?.has_variants_selected,
                              productName: Product.product_head[0].product_name,
                              id: productId,
                              quantity: 0,
                              productimageurl:
                                Product?.product_images[0].image_path,
                              variant_combo_string: variantComboId,
                              ...filteredVariants,
                              rating: Product.product_head[0].product_rating,
                              discount: Product.product_head[0].discount,
                              otherData: { ...Product?.product_head },
                            };
                          } else if (!Product?.has_variants_selected) {
                            //when 0
                            if (Product.offer_data[0].product_quantity < 1) {
                              MyToast(`Product is out of stock`, "error");
                              return;
                            }
                            stock = Product.offer_data[0].product_quantity;
                            selectedProduct = {
                              has_variants_selected:
                                Product?.has_variants_selected,
                              productName: Product.product_head[0].product_name,
                              rating: Product.product_head[0].product_rating,
                              discount: Product.offer_data[0].discount,
                              id: productId,
                              quantity: 0,
                              productimageurl:
                                Product?.product_images[0].image_path,
                              ...Product?.offer_data,
                              otherData: { ...Product?.product_head },
                            };
                          }

                          navigate("/mycart", {
                            state: { selectedProduct: selectedProduct },
                          });

                          dispatch(addToCart(selectedProduct, stock));
                          toast.clearWaitingQueue();
                        }}
                        buttonName={"ADD TO BAG"}
                        className={"btn btn-add-to-bag w-100 mb-3"}
                        type={"button"}
                      />
                    </div>

                    <div className="col-md-6">
                      <CategoryButton
                        buttonName={
                          favorite
                            ? "ALREADY ADDED TO WISHLIST"
                            : "SAVE IT TO WISHLIST"
                        }
                        className={"btn btn-black-outline w-100 mb-3"}
                        type={"button"}
                        onClick={() => {
                          if (favorite) {
                            if (Product?.has_variants_selected) {
                              dispatch(
                                removeFromFavorites(productId, variantComboId)
                              );
                            } else {
                              dispatch(removeFromFavorites(productId));
                            }
                          } else {
                            if (Product?.has_variants_selected) {
                              //when 1
                              selectedProduct = {
                                has_variants_selected:
                                  Product?.has_variants_selected,
                                productName:
                                  Product.product_head[0].product_name,
                                id: productId,
                                quantity: 0,
                                rating: Product.product_head[0]?.product_rating,
                                discount: Product.offer_data[0]?.discount,
                                productimageurl:
                                  Product?.product_images[0].image_path,
                                variant_combo_string: variantComboId,
                                ...filteredVariants,
                                otherData: { ...Product?.product_head },
                                stock: quantity,
                              };
                            } else if (!Product?.has_variants_selected) {
                              //when 0
                              selectedProduct = {
                                has_variants_selected:
                                  Product?.has_variants_selected,
                                productName:
                                  Product.product_head[0].product_name,

                                id: productId,
                                rating: Product.product_head[0].product_rating,
                                discount: Product.offer_data[0].discount,
                                quantity: 0,
                                productimageurl:
                                  Product?.product_images[0].image_path,
                                ...Product?.offer_data,
                                otherData: { ...Product?.product_head },
                                stock: Product.offer_data[0].product_quantity,
                              };
                            }
                            dispatch(addToFavorites(selectedProduct));
                            toast.clearWaitingQueue();
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
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
            <BounceLoader size={35} color="#2e3192" />
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductDetail;
