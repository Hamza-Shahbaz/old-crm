// reducers/categoryReducer.js
import { MyToast, toast } from "../../components/toast/MyToast";
import {
  CATEGORIES_SUCCESS,
  CATEGORIES_FAILURE,
} from "../actions/CategoryActions";
import {
  ADD_QUANTITY,
  ADD_TO_CART,
  ADD_TO_FAVORITES,
  CALCULATE_FINAL_TOTAL,
  CALCULATE_TOTAL_DISCOUNT,
  CALCULATE_TOTAL_PRICE,
  CLEAR_CART,
  PRODUCT_SUCCESS,
  REMOVE_FROM_CART,
  REMOVE_FROM_FAVORITES,
  REMOVE_QUANTITY,
  RESET_PRODUCTS,
  RESET_REVIEW_PERMISSION,
  SET_BANNER_DATA,
  SET_FILTER_DATA,
  SET_LATESTPRODUCTS_DATA,
  SET_POSTERS_DATA,
  SET_REVIEW_DATA,
  SET_REVIEW_PERMISSION,
} from "../constant/constants";

//initial state for all reducer
const initialState = {
  categories: [],
  product: [],
  filteredProducts: {},
  totalPrice: 0,
  totalDiscount: 0,
  finalTotal: 0,
  addToCart: [],
  favorites: [],
  banner: [],
  posters: [],
  latestProducts: [],
  filterData: [],
  reviews: [],
  reviewPermission: false,
};

//Reducer for Main Category API
export const categoryReducerData = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload };
    case CATEGORIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

//Reducer for Products API
export const productReducerData = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_SUCCESS:
      return { ...state, product: action.payload };

    case RESET_PRODUCTS:
      return { ...state, product: [] };

    default:
      return state;
  }
};

//////////REDUCER FOR CREATE-PRODUCT-REVIEW API//////////
export const reviewReducerData = (state = initialState, action) => {
  switch (action.type) {
    case SET_REVIEW_DATA:
      return { ...state, reviews: action.payload };

    default:
      return state;
  }
};

export const setProductReviewPermission = (state = initialState, action) => {
  switch (action.type) {
    case SET_REVIEW_PERMISSION:
      return { ...state, reviewPermission: action.payload }; // Setting reviewPermission based on payload
    case RESET_REVIEW_PERMISSION:
      return { ...state, reviewPermission: false };
    default:
      return state;
  }
};

//Reducer for Banners API
export const bannerReducerData = (state = initialState, action) => {
  switch (action.type) {
    case SET_BANNER_DATA:
      return { ...state, banner: action.payload };

    default:
      return state;
  }
};

//Reducer for POSTERS API
export const postersReducerData = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTERS_DATA:
      return { ...state, posters: action.payload };

    default:
      return state;
  }
};

//Reducer for Latest Products API

export const latestProductsReducerData = (state = initialState, action) => {
  switch (action.type) {
    case SET_LATESTPRODUCTS_DATA:
      return {
        ...state,
        latestProducts: action.payload,
      };

    default:
      return state;
  }
};

//Reducer for FILTER API

export const filterReducerData = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER_DATA:
      return {
        ...state,
        filterData: action.payload,
      };

    default:
      return state;
  }
};

export const handleCartItem = (state = initialState, action) => {
  const selectedProduct = state.addToCart.find((product) => {
    if (
      product?.id === action?.payload?.id &&
      product?.variant_combo_string === action?.payload?.variant_combo_string
    ) {
      return true;
    }
    return false;
  });

  switch (action.type) {
    case ADD_TO_CART:
      if (selectedProduct) {
        const newCart = state.addToCart.filter((product) => {
          if (
            product?.id === selectedProduct?.id &&
            product?.variant_combo_string ===
              selectedProduct?.variant_combo_string
          ) {
            return false;
          } else {
            return true;
          }
        });
        if (selectedProduct?.quantity < selectedProduct.stock) {
          selectedProduct.quantity += 1;
        }
        return {
          ...state,
          addToCart: [...newCart, selectedProduct],
        };
      }
      return {
        ...state,
        addToCart: [
          ...state.addToCart,
          { ...action.payload, quantity: 1, stock: action.stock },
        ],
      };

    case ADD_QUANTITY:
      const existingProductIndexx = state.addToCart.findIndex((product) => {
        if (product?.id === action?.payload.id) {
          if (action.payload.variant_combo_string !== undefined) {
            return (
              action.payload.variant_combo_string ===
              product?.variant_combo_string
            );
          }
          return true;
        }
        return false;
      });

      if (existingProductIndexx !== -1) {
        const existingProduct = state?.addToCart[existingProductIndexx];

        const updatedCart = state?.addToCart.map((product, index) => {
          if (index === existingProductIndexx) {
            if (product?.quantity < product?.stock) {
              return { ...product, quantity: product.quantity + 1 };
            } 
            else {
              MyToast(
                "The current Stock available is " + (existingProduct?.stock || "0" ) + '.',
                "error"
              );
              toast.clearWaitingQueue();
            }
            return product;
          } else {
            return product;
          }
        });

        return {
          ...state,
          addToCart: updatedCart,
        };
      }

      return {
        ...state,
        addToCart: [...state.addToCart, newProduct],
      };

    case REMOVE_FROM_CART:
      const newCart = state?.addToCart?.filter((product) => {
        if (product?.id === action?.payload.id) {
          if (action?.payload.variant_combo_string !== undefined) {
            return (
              product.variant_combo_string !==
              action?.payload.variant_combo_string
            );
          }
          return false;
        }
        return true;
      });
      return {
        ...state,
        addToCart: newCart,
      };

    case CALCULATE_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: action.payload,
      };

    case CALCULATE_TOTAL_DISCOUNT:
      return {
        ...state,
        totalDiscount: action.payload,
      };

    case CALCULATE_FINAL_TOTAL:
      return {
        ...state,
        finalTotal: action.payload,
      };

    case REMOVE_QUANTITY:
      const existingProductIndex = state.addToCart.findIndex((product) => {
        if (product?.id === action?.payload.id) {
          if (action.payload.variant_combo_string !== undefined) {
            return (
              action.payload.variant_combo_string ===
              product?.variant_combo_string
            );
          }
          return true;
        }
        return false;
      });

      if (existingProductIndex !== -1) {
        const existingProduct = state.addToCart[existingProductIndex];

        if (existingProduct.quantity > 1) {
          // If product has multiple quantities, decrement the quantity
          const newCart = [...state.addToCart];
          newCart[existingProductIndex] = {
            ...existingProduct,
            quantity: existingProduct.quantity - 1,
          };

          return {
            ...state,
            addToCart: newCart,
          };
        } else {
          // If product has a single quantity, remove it from the cart
          const newCart = state.addToCart
            .slice(0, existingProductIndex)
            .concat(state.addToCart.slice(existingProductIndex + 1));
          return {
            ...state,
            addToCart: newCart,
          };
        }
      }

    case CLEAR_CART:
      return {
        ...state,
        addToCart: [],
      };
    case ADD_TO_FAVORITES:
      const productId = action.payload.id;
      const isProductInFavorites = state.favorites.some((product) => {
        if (product?.id === productId) {
          if (action.payload.variant_combo_string !== undefined) {
            return (
              action.payload.variant_combo_string ===
              product?.variant_combo_string
            );
          }
          return true;
        }
        return false;
      });
      if (!isProductInFavorites) {
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
      } else {
        return state;
      }
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter((product) => {
          if (product.id === action.payload.productId) {
            if (action.payload.variant_combo_string !== undefined) {
              return (
                action?.payload?.variant_combo_string !==
                product.variant_combo_string
              );
            }
            return false;
          }
          return true;
        }),
      };
    default:
      return state;
  }
};
