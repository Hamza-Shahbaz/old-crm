import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LatestSectionItem from "./LatestSectionItem";
// import "../css/globalStyle.css";
import { breakPoints } from "../../config/data";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CategoryButton from "../button/CategoryButton";
import { PulseLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToFavorites,
  fetchSingleProductRequest,
  removeFromCart,
  removeFromFavorites,
} from "../../redux/actions/CategoryActions";
import { MyToast, toast } from "../toast/MyToast";

function LatestSection({
  head,
  tag,
  isLoading,
  viewButton,
  className,
  isRating,
  classPara,
  txtStyle,
  isEndIcon,
  isDiscount,
  data,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const singleProductDetail = useSelector(
    (state) => state.singleProductReducer
  );
  const Product = singleProductDetail?.product;
  let selectedProduct; // for favorite
  const favourites = useSelector((state) => state?.handleCartItem?.favorites);
  const cartData = useSelector((state) => state?.handleCartItem?.addToCart);

  const settings = {
    arrows: false,
    infinite: true,
    speed: 3200,
    autoplay: true,
    autoplaySpeed: 1700,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [...breakPoints],
    slidesToShow: data
      ? Object.values(data)?.length > 5
        ? 5
        : Object.values(data)?.length
      : 0,
    slidesToScroll: 1,
  };

  function SampleNextArrow(props) {
    const { className, onClick, style } = props;
    return (
      <div
        className={className}
        onClick={onClick}
        style={{
          ...style,
          border: "2px solid #FFE17E",
          overflow: "hidden",
          backgroundColor: "white",
          width: 42,
          borderRadius: 21,
          height: 42,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FaArrowRight color="#070707" size={18} />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, onClick, style } = props;
    return (
      <div
        className={className}
        onClick={onClick}
        style={{
          ...style,
          border: "2px solid #FFE17E",
          overflow: "hidden",
          width: 42,
          borderRadius: 21,
          height: 42,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FaArrowLeft color="#070707" size={18} />
      </div>
    );
  }

  function getIdHandler(id, product_name) {
    navigate("/product/" + "productid=" + id, {
      state: { id: id, title: product_name },
    });
  }

  const FavoriteHandler = async (favoriteProduct, event) => {
    event.stopPropagation();

    selectedProduct = {
      ...favoriteProduct,
    };

    let checkFavoriteProduct = favourites.findIndex(
      (fav) => fav.id === selectedProduct.id
    );

    if (checkFavoriteProduct !== -1) {
      dispatch(removeFromFavorites(selectedProduct.id));
    } else {
      selectedProduct.stock = selectedProduct?.otherData?.product_quantity;
      dispatch(addToFavorites(selectedProduct));
    }
  };

  function cartHandler(cartProduct, event) {
    event.stopPropagation();
    event.preventDefault();

    if (
      cartProduct?.otherData?.product_quantity !== undefined &&
      cartProduct?.otherData?.product_quantity < 1
    ) {
      MyToast(`Product is out of stock`, "error");
      toast.clearWaitingQueue();
      return;
    }
    let stock = cartProduct?.otherData?.product_quantity;

    let selectedProduct = {
      ...cartProduct,
    };
    let checkCartedProduct = cartData.findIndex(
      (cart) => cart.id === selectedProduct.id
    );

    if (checkCartedProduct !== -1) {
      dispatch(
        removeFromCart(selectedProduct.id, selectedProduct.variant_combo_string)
      );
    } else {
      dispatch(addToCart(selectedProduct, stock));
    }
  }

  return (
    <div className="best-selling">
      {data && (
        <div className="container ">
          <div className="row align-items-center new-class">
            <div className="col-xl-8 col-lg-8 col-md-7 col-8">
              <div className="section-title">
                <h1 className={`mb-2 fs-sm ${txtStyle}`}>{head}</h1>
                <p className="mb-3 d-none d-xxl-block">{tag}</p>
              </div>
            </div>
            {viewButton ? (
              <>
                <div className="col-xl-4 col-lg-4 col-md-5 text-end col-4">
                  <CategoryButton
                    className={"btn btn-view-all"}
                    buttonName={"View All"}
                    onClick={() => {
                      navigate("/all-products");
                    }}
                  />
                </div>
              </>
            ) : null}
          </div>

          <div className="row d-flex align-items-center justify-content-center my-2">
            {!data ? (
              <div style={{ width: 100, height: 100 }}>
                <PulseLoader color={"green"} />
              </div>
            ) : (
              <Slider swipeToSlide = {true} {...settings}>
                {Object.values(data)?.map((item, index) => {
                  return (
                    <LatestSectionItem
                      productName={item?.product_name}
                      starRating={item?.product_rating}
                      key={item?.product_id}
                      onClick={() => {
                        navigate(`/product/${item?.product_id}`);
                      }}
                      onIdGet={getIdHandler}
                      title={
                        item?.product_name ? item?.product_name : "no name"
                      }
                      images={item?.image_path}
                      description=""
                      isFavouriteIcon={true}
                      isEndIcon={true}
                      isCartIcon={true}
                      price={item?.price}
                      className={className}
                      isRating={isRating}
                      // classPara={classPara}
                      isDiscount={false}
                      id={item.product_id}
                      onAddtoFavorite={FavoriteHandler.bind(this, {
                        id: item?.product_id,
                        productName: item?.product_name,
                        quantity: 0,
                        productimageurl: item?.image_path,
                        otherData: { ...item },
                      })}
                      discount={item?.discount}
                      isFavorite={
                        favourites?.findIndex(
                          (fav) => fav.id === item?.product_id
                        ) !== -1
                      }
                      onRemoveCart={cartHandler.bind(this, {
                        id: item?.product_id,
                        productName: item?.product_name,
                        quantity: 0,
                        productimageurl: item?.image_path,
                        otherData: { ...item },
                      })}
                      isCart={
                        cartData?.findIndex(
                          (cart) => cart.id === item?.product_id
                        ) !== -1
                      }
                      showDetailsIcon={item?.variant_combo_id}
                    />
                  );
                })}
              </Slider>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default LatestSection;
