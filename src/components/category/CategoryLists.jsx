import React, { useEffect, useState } from "react";
// import "../css/globalStyle.css";
import AccordionList from "./AccordionList";
import AccordionListCheckbox from "./AccordionListCheckbox";
import CategoryItem from "./CategoryItem";
import CategoryButton from "../button/CategoryButton";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineAppstore, AiOutlineUnorderedList } from "react-icons/ai";
import {
  addToCart,
  addToFavorites,
  handleFilterData,
  handleProductsData,
  handleFilteredProducts,
  removeFromCart,
  removeFromFavorites,
  resetSubProductData,
} from "../../redux/actions/CategoryActions";
import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader, RingLoader } from "react-spinners";
import { Pagination } from "antd";
import FeaturedCategory from "./subCategories/FeaturedCategory";
import { Alert } from "react-bootstrap";
import { CATEGORY_BREADCRUMB } from "../../redux/constant/constants";
import { categoryBreadcrumbHandler } from "../../redux/actions/BreadcrumbActions";
import { MyToast, toast } from "../toast/MyToast";
import { resetSpecificSliderData } from "../../redux/actions/SliderActions";
import {
  amoutRateConversion,
  reconvertAmount,
  symbolAmount,
  valueRateConversion,
} from "../../utils/Helper";

function removeCountBracket(string) {
  let newStr = string.split("(");
  newStr.pop();
  return newStr.join("(").trim();
}

function CategoryList({
  categoryButton,
  category,
  totalProducts,
  topSection,
  middleSection,
  headingShow,
  headingName,
  className,
  data,
  isButtonShow,
  FeaturedFlag,
  allowSorting,
  allowListView = true,
  renderOnlyWhenProducts,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setIsLoading] = useState(false);
  const [isloading, setLoading] = useState(false); //for root loading of jsx

  const [selectedDiscount, setSelectedDiscount] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedFilterBy, setSelectedFilterBy] = useState({
    variants: {},
    attributes: {},
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [listView, setListView] = useState(false);
  const [enableApplyFilters, setEnableApplyFilters] = useState(false);
  const [enableClearFilters, setEnableClearFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const currencyRate =
    useSelector(
      (state) => state.siteSettingReducerData?.currentCurrency?.conversion_rate
    ) || 1;
  const currencyCode =
    useSelector(
      (state) =>
        state.siteSettingReducerData?.currentCurrency?.currency_iso_code
    ) || "USD";
  let cardClassName =
    "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 col-12 pb-3 cardHover paddingStyle";
  let listClassName =
    "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 pb-3 cardHover paddingStyle";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (filteredProducts !== null) {
    data = filteredProducts;
  }

  const productId = Number(params?.id);

  // Event handler to update selected discount state
  const subProductData = useSelector(
    (state) => state?.productReducerData?.product
  );

  const categories = useSelector(
    (state) => state?.categoryReducerData.categories
  );
  let breadcrumbs = categoryBreadcrumbHandler(categories, params?.id);
  if (
    (category == null || category == "" || category == undefined) &&
    breadcrumbs.length > 1
  ) {
    category = breadcrumbs[breadcrumbs.length - 1].name;
  }

  useEffect(() => {
    if (params?.id) {
      setEnableClearFilters(false);
      dispatch({ type: CATEGORY_BREADCRUMB, payload: breadcrumbs });
    }
  }, [params.id, categories]);

  const favourites = useSelector((state) => state?.handleCartItem?.favorites);
  const cartData = useSelector((state) => state?.handleCartItem?.addToCart);

  const filterData = useSelector(
    (state) => state?.filterReducerData?.filterData?.filters
  );

  const makePricingBrackets = (min, max) => {
    if (min === max) {
      return [
        `0 - ${symbolAmount(
          Math.ceil(valueRateConversion(max, currencyRate)),
          currencyCode
        )}`,
      ];
    }
    min = valueRateConversion(min, currencyRate);
    max = valueRateConversion(max, currencyRate);
    const lowerMultipleOfMin = Math.floor(min / 100) * 100;
    const upperMultipleOfMax = Math.ceil(max / 100) * 100;
    const interval = (upperMultipleOfMax - lowerMultipleOfMin) / 4;

    const options = [];
    for (let i = 0; i < 4; i++) {
      options.push(
        symbolAmount(
          `${lowerMultipleOfMin + interval * i} - ${
            lowerMultipleOfMin + interval * (i + 1)
          }`,
          currencyCode
        )
      );
    }
    return options;
  };

  const handleBrandChange = (event) => {
    if (selectedBrands.includes(event)) {
      let temp = selectedBrands.filter((elem) => elem != event);
      setSelectedBrands(temp);
    } else {
      let temp = selectedBrands.concat(event);
      setSelectedBrands(temp);
    }
    setEnableApplyFilters(true);
  };

  useEffect(() => {
    if (!isNaN(productId)) {
      dispatch(handleFilterData(productId));
      setFilteredProducts(null);
      setSelectedPrice([]);
      setSelectedDiscount([]);
      setSelectedBrands([]);
      setSelectedFilterBy({
        variants: {},
        attributes: {},
      });
    } else {
    }
  }, [productId]);

  // Event handler to update selected discount state
  const handleDiscountChange = (event) => {
    if (selectedDiscount.includes(event)) {
      let tempresults = selectedDiscount.filter(
        (discount) => discount != event
      );
      setSelectedDiscount(tempresults);
    } else {
      let tempresults = selectedDiscount.concat(event);
      setSelectedDiscount(tempresults);
    }
    setEnableApplyFilters(true);
  };
  const handleSortSelect = (e) => {
    let items = null;
    if (!data) {
      items = Object.values(subProductData?.data?.products_data);
    } else {
      items = Object.values(data);
    }
    if (items !== null) {
      if (e.target.value === "LowToHigh") {
        setFilteredProducts(items.sort((a, b) => a.price - b.price));
      }
      if (e.target.value === "HighToLow") {
        setFilteredProducts(items.sort((a, b) => b.price - a.price));
      }
      if (e.target.value === "Newest") {
        setFilteredProducts(
          items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        );
      }
      if (e.target.value === "Oldest") {
        setFilteredProducts(
          items.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        );
      }
    }
  };

  const handleSelectFilteredBy = {
    handleVariantChanged: (event, item) => {
      let trueEvent = removeCountBracket(event);
      let variantId = item.records.filter((elem) => elem.title === trueEvent)[0]
        .variant_id;
      if (
        selectedFilterBy.variants &&
        selectedFilterBy.variants.hasOwnProperty(variantId)
      ) {
        let temp = { ...selectedFilterBy.variants };
        delete temp[variantId];
        setSelectedFilterBy({ ...selectedFilterBy, variants: temp });
      } else {
        let temp = { ...selectedFilterBy.variants };
        temp[variantId] = event;
        setSelectedFilterBy({ ...selectedFilterBy, variants: temp });
      }
      setEnableApplyFilters(true);
    },
    handleAttributeChange: (event, item) => {
      let trueEvent = removeCountBracket(event);
      let attributeId = item.records.filter(
        (elem) => elem.title === trueEvent
      )[0].sub_attribute_id;
      if (
        selectedFilterBy.attributes &&
        selectedFilterBy.attributes.hasOwnProperty(attributeId)
      ) {
        let temp = { ...selectedFilterBy.attributes };
        delete temp[attributeId];
        setSelectedFilterBy({ ...selectedFilterBy, attributes: temp });
      } else {
        let temp = { ...selectedFilterBy.attributes };
        temp[attributeId] = event;
        setSelectedFilterBy({ ...selectedFilterBy, attributes: temp });
      }
      setEnableApplyFilters(true);
    },
  };

  function handlePageChange(page, pageSize, event) {
    if (enableClearFilters) {
      handleApplyFilter(event, page, pageSize);
      setFilteredProducts(null);
      setPage(page);
      setPageSize(pageSize);
    } else {
      dispatch(
        handleProductsData(
          productId,
          setIsLoading,
          true, // pageflag
          page,
          pageSize
        )
      );
      setFilteredProducts(null);
      setPage(page);
      setPageSize(pageSize);
    }
  }

  const handleApplyFilter = (e, newPage, newPageSize) => {
    if (e !== undefined) {
      e.preventDefault();
    }
    let discounts = selectedDiscount.map(
      (item) => `${parseInt(item)}-${parseInt(item.split("-")[1])}`
    );
    let prices = selectedPrice.map(
      (item) =>
        `${reconvertAmount(parseFloat(item), currencyRate)}-${reconvertAmount(
          parseFloat(item.split("-")[1]),
          currencyRate
        )}`
    );
    let brand_names = selectedBrands.map((item) => removeCountBracket(item));
    let variant_ids = Object.keys(selectedFilterBy.variants).map((item) =>
      parseInt(item)
    );
    let sub_attribute_ids = Object.keys(selectedFilterBy.attributes).map(
      (item) => parseInt(item)
    );
    if (
      selectedDiscount.length == 0 &&
      selectedPrice.length == 0 &&
      selectedBrands.length == 0 &&
      Object.keys(selectedFilterBy.variants).length == 0 &&
      Object.keys(selectedFilterBy.attributes).length == 0
    ) {
      if (enableClearFilters) {
        setEnableApplyFilters(false);
        setEnableClearFilters(false);
        setTimeout(() => setEnableApplyFilters(true), 3000);
        dispatch(
          handleProductsData(
            productId,
            setIsLoading,
            true, // pageflag
            newPage || page,
            newPageSize,
            pageSize
          )
        );
        setFilteredProducts(null);
      }
      return;
    }
    setEnableApplyFilters(false);
    setEnableClearFilters(true);
    setTimeout(() => setEnableApplyFilters(true), 3000);
    let filterData = {
      discounts,
      prices,
      brand_names,
      variant_ids,
      sub_attribute_ids,
      page: newPage || page,
      limit: newPageSize || pageSize,
    };
    dispatch(
      handleFilteredProducts(productId, setIsLoading, true, 1, 50, filterData)
    );
    setFilteredProducts(null);
  };

  useEffect(() => {
    setSelectedPrice([]);
  }, [currencyCode]);

  const handleClearAll = (e) => {
    e.preventDefault();
    setSelectedPrice([]);
    setSelectedDiscount([]);
    setSelectedBrands([]);
    setSelectedFilterBy({
      variants: {},
      attributes: {},
    });
    setEnableApplyFilters(false);
    setEnableClearFilters(false);
    dispatch(
      handleProductsData(
        productId,
        setIsLoading,
        true, // pageflag
        page,
        pageSize
      )
    );
    setFilteredProducts(null);
  };

  // Event handler to update selected price state
  const handlePriceChange = (event) => {
    if (selectedPrice.includes(event)) {
      let temp = selectedPrice.filter((elem) => elem != event);
      setSelectedPrice(temp);
    } else {
      let temp = selectedPrice.concat(event);
      setSelectedPrice(temp);
    }
    setEnableApplyFilters(true);
  };

  useEffect(() => {
    if (params?.id) {
      dispatch(resetSubProductData());
      dispatch(resetSpecificSliderData("FEATURED_DEALS"));
      dispatch(resetSpecificSliderData("LIGHTENINIG_DEALS"));
      dispatch(handleProductsData(productId, setLoading));
    }
  }, [productId]);

  const discountItems = ["0% - 25%", "26% - 50%", "51% - 75%", "76% - 100%"];

  const filtered = subProductData?.data?.category_data
    ? Object.values(subProductData?.data?.category_data)
    : [];

  function fetchProductData([id, name]) {
    navigate("/category/" + id, { state: { id: id, name: name } });
  }

  const FavoriteHandler = async (favoriteProduct, event) => {
    event.stopPropagation();
    event.preventDefault();
    let selectedProduct = {
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

  if (
    renderOnlyWhenProducts &&
    !Object.keys(subProductData?.data?.products_data || {}).length &&
    !filteredProducts?.length &&
    !data?.length &&
    !enableClearFilters
  ) {
    return;
    <></>;
  }

  return (
    <>
      {isloading ? (
        <div
          style={{
            backgroundColor: "",
            height: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // border: ".5px solid #cccccc",
          }}
        >
          <PropagateLoader size={16} color="#2e3192" />
        </div>
      ) : (
        <section className={`product-category ${className}`}>
          <div className="container">
            {topSection || allowSorting ? (
              <>
                {topSection && (
                  <div className="row">
                    <div className=" col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="section-title text-center">
                        <h1
                          className="mb-2 text-theme"
                          // style={{ color: "#2e3192" }}
                        >
                          {category}
                        </h1>
                        <p className="text-black fw-500">{totalProducts}</p>
                      </div>
                      <div>
                        {FeaturedFlag && (
                          <FeaturedCategory
                            divClassName={"tab-sec styleTabSec mt-3"}
                            productIdHandler={fetchProductData}
                            filtered={filtered}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {(topSection || allowSorting) && (
                  <div className="row justify-content-end mb-4">
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 ">
                      <div className="sort">
                        <form
                          className="d-flex align-items-center aa"
                          onChange={(e) => handleSortSelect(e)}
                        >
                          <select className="form-select bb">
                            <option value={"Newest"} className="textStyle">
                              Newest
                            </option>
                            <option value={"Oldest"} className="textStyle">
                              Oldest
                            </option>
                            <option value={"LowToHigh"} className="textStyle">
                              Low To High
                            </option>
                            <option value={"HighToLow"} className="textStyle">
                              High To Low
                            </option>
                          </select>
                          {allowListView && (
                            <button
                              onClick={(e) => {
                                e.preventDefault(); // Prevent form submission
                                setListView(!listView);
                              }}
                              className="border-0 bg-white"
                            >
                              {!listView && !isMobile ? (
                                <AiOutlineAppstore
                                  fontSize={"26px"}
                                  color="#808080"
                                />
                              ) : (
                                <AiOutlineUnorderedList
                                  fontSize={"26px"}
                                  color="#808080"
                                />
                              )}
                            </button>
                          )}
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : null}

            <div className="row mt-2">
              {middleSection ? (
                <>
                  <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-12">
                    <div className="category-filter">
                      <div
                        className="f-top"
                        style={{ borderBottom: "2px solid #ececec" }}
                      >
                        <h2>FILTERS</h2>

                        <div>
                          <CategoryButton
                            buttonName={"Clear Filters"}
                            className={"btn-clear"}
                            onClick={(e) => handleClearAll(e)}
                            type={"button"}
                            disabled={!enableClearFilters}
                          />
                        </div>
                      </div>
                      <div className="f-bottom">
                        <h3>CATEGORY</h3>
                        <button
                          type="button"
                          className="btn btn-category-button mt-1"
                        >
                          {category}
                        </button>
                      </div>

                      <div
                        className="filter-accordian mt-3"
                        style={{
                          maxHeight: "400px",
                          overflowY: "auto",
                          position: "relative",
                        }}
                      >
                        <div
                          className="accordion"
                          id={`${"accordionHeadingName"}-accordion`}
                        >
                          <AccordionListCheckbox
                            accordionHeadingName={"DISCOUNT"}
                            items={discountItems}
                            onChange={handleDiscountChange}
                            checked={selectedDiscount}
                          />

                          {filterData && !filterData?.length == 0
                            ? Object.values(filterData).map((item, index) => {
                                if (item.title == "PRICING") {
                                  return (
                                    <AccordionListCheckbox
                                      key={`pricing-${index}`}
                                      accordionHeadingName={item?.title}
                                      items={makePricingBrackets(
                                        item.records[0].min_price,
                                        item.records[0].max_price
                                      )}
                                      onChange={handlePriceChange}
                                      checked={selectedPrice}
                                    />
                                  );
                                }
                                if (item.title == "BRANDS") {
                                  return (
                                    <AccordionListCheckbox
                                      key={`brands-${index}`}
                                      accordionHeadingName={item?.title}
                                      items={item.records.map(
                                        (elem, i) =>
                                          elem.brand_name +
                                          " ( " +
                                          elem.no_of_products +
                                          " )"
                                      )}
                                      onChange={handleBrandChange}
                                      checked={selectedBrands}
                                    />
                                  );
                                }
                                if (
                                  item.records[0].variant_types ||
                                  item.records[0].attributes
                                ) {
                                  return (
                                    <AccordionListCheckbox
                                      key={`filters-${index}`}
                                      accordionHeadingName={"FILTERS BY"}
                                      items={item.records}
                                      type={item.type}
                                      onChange={handleSelectFilteredBy}
                                      checked={selectedFilterBy}
                                    />
                                  );
                                }
                              })
                            : null}

                          <div className="col-12 d-flex justify-content-center mt-3">
                            <CategoryButton
                              buttonName={"Apply Filters"}
                              className={"btn-clear btn-category-button"}
                              onClick={(e) => handleApplyFilter(e)}
                              type={"button"}
                              disabled={!enableApplyFilters}
                            />
                          </div>

                          {/* <AccordionList
                      accordionHeadingName={"Category"}
                      items={categoryItems}
                    /> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  {subProductData?.data && loading ? (
                    <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-xs-12 ">
                      <div className="row">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "20px",
                          }}
                        >
                          <RingLoader size={60} color="#2e3192" />
                        </div>
                      </div>
                    </div>
                  ) : subProductData?.data?.products_data &&
                    Object.values(subProductData?.data?.products_data)
                      ?.length === 0 ? (
                    <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-xs-12 ">
                      <div className="row">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "20px",
                          }}
                        >
                          <Alert variant="info">No Products found.</Alert>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-xs-12 ">
                      <div className="row">
                        {filteredProducts && filteredProducts !== null
                          ? filteredProducts.map((item, index) => (
                              <CategoryItem
                                key={index}
                                starRating={item?.product_rating}
                                prodImage={item?.image_path}
                                productName={item?.product_name}
                                id={item?.product_id}
                                truncatedDescription={
                                  item?.product_name
                                    ? item?.product_name
                                    : "no name"
                                }
                                productDiscount={item?.discount}
                                productPrice={item?.price + "$"}
                                className={
                                  listView ? listClassName : cardClassName
                                }
                                isEndIcon={true}
                                isFavouriteIcon={true}
                                listView={listView}
                                isCartIcon={true}
                                styles={{ borderRadius: "15px" }}
                                cardClassName="curveStyle"
                                onAddtoFavorite={FavoriteHandler.bind(this, {
                                  id: item?.product_id,
                                  productName: item?.product_name,
                                  quantity: 0,
                                  productimageurl: item?.image_path,
                                  otherData: { ...item },
                                })}
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
                            ))
                          : subProductData?.data?.products_data &&
                            Object.values(
                              subProductData?.data?.products_data
                            ).map((item, index) => {
                              return (
                                <CategoryItem
                                  key={index}
                                  prodImage={item?.image_path}
                                  productName={item?.product_name}
                                  id={item?.product_id}
                                  truncatedDescription={
                                    item?.product_name
                                      ? item?.product_name
                                      : "no name"
                                  }
                                  productDiscount={item?.discount}
                                  productPrice={item?.price + "$"}
                                  className={
                                    listView ? listClassName : cardClassName
                                  }
                                  listView={
                                    window.innerWidth > 1000 ? listView : false
                                  }
                                  isEndIcon={true}
                                  isFavouriteIcon={true}
                                  isCartIcon={true}
                                  starRating={item?.product_rating}
                                  styles={{ borderRadius: "15px" }}
                                  cardClassName="curveStyle"
                                  onAddtoFavorite={FavoriteHandler.bind(this, {
                                    id: item?.product_id,
                                    productName: item?.product_name,
                                    quantity: 0,
                                    productimageurl: item?.image_path,
                                    otherData: { ...item },
                                  })}
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
                      </div>
                    </div>
                  )}

                  <div className="d-flex justify-content-center ant-pagination align-items-center ">
                    {subProductData?.data?.products_data &&
                      Object.values(subProductData?.data?.products_data)
                        ?.length > 0 && (
                        <Pagination
                          defaultCurrent={subProductData?.current_page}
                          pageSize={subProductData?.per_page || 50}
                          total={subProductData?.total}
                          hideOnSinglePage={true}
                          pageSizeOptions={[10, 20, 30, 40, 50]}
                          className="paginationStyle ant-pagination-item ant-select-selection-item ant-select-selector ant-pagination-options"
                          onChange={(page, pageSize, event) =>
                            handlePageChange(page, pageSize, event)
                          }
                        />
                      )}
                  </div>
                </>
              ) : (
                <>
                  {headingShow ? (
                    <div className="d-flex align-content-center">
                      <span className="section-title mb-3 mt-2">
                        <h2 className="mb-2 headingStyle1">{headingName}</h2>
                      </span>

                      {isButtonShow ? (
                        <span>
                          <CategoryButton
                            buttonName={"See More"}
                            className={"btn btn-category-button mx-4"}
                            type={"button"}
                            style={{ fontSize: 16 }}
                          />
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    {data ? (
                      <div className="row">
                        {Object.values(data)?.map((item, index) => {
                          // console.log('item', item)
                          return (
                            <CategoryItem
                              key={index}
                              prodImage={item?.image_path}
                              truncatedDescription={
                                item?.product_name
                                  ? item?.product_name
                                  : "no name"
                              }
                              productPrice={item?.price + "$"}
                              productDiscount={item?.discount}
                              starRating={item?.product_rating}
                              prodReviews={item?.reviews}
                              className={
                                "col-xl-3 col-lg-3 col-md-4 col-sm-4 col-12 pb-3 px-3 py-2 "
                              }
                              productName={item?.product_name}
                              cardClassName={"curveStyle"}
                              headingShow={true}
                              iconClass={"pb-0"}
                              id={item?.product_id}
                              isEndIcon={true}
                              isFavouriteIcon={true}
                              isCartIcon={true}
                              onAddtoFavorite={FavoriteHandler.bind(this, {
                                id: item.product_id,
                                productName: item.product_name,
                                quantity: 0,
                                productimageurl: item.image_path,
                                otherData: { ...item },
                              })}
                              isFavorite={
                                favourites?.findIndex(
                                  (fav) => fav.id === item.product_id
                                ) !== -1
                              }
                              onRemoveCart={cartHandler.bind(this, {
                                id: item.product_id,
                                productName: item.product_name,
                                quantity: 0,
                                productimageurl: item.image_path,
                                otherData: { ...item },
                              })}
                              isCart={
                                cartData?.findIndex(
                                  (cart) => cart.id === item.product_id
                                ) !== -1
                              }
                              showDetailsIcon={item?.variant_combo_id}
                            />
                          );
                        })}
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: "20px",
                        }}
                      >
                        {loading ? (
                          <RingLoader size={60} color="#2e3192" />
                        ) : (
                          "No Products in this category"
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default CategoryList;
