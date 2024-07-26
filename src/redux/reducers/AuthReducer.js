import {
  CLEAR_UPDATE_INFO,
  GET_ICON_ID,
  GUEST_LOGIN_FAILURE,
  GUEST_LOGIN_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_GUEST,
  LOGOUT_USER,
  NULLIFY_LAST_NAME,
  OPEN_MODAL,
  SET_CURRENT_CURRENCY,
  SET_FORGOT_PASSWORD,
  SET_REGISTER_USER,
  SET_RESET_PASSWORD,
  SET_SITESETTINGS,
  SET_UPDATE_INFO,
  UPDATING_CART_SUCCESS,
} from "../constant/constants";

const initialState = () => ({
  ///to persist data initial state should be function
  loginUser: [],
  loginGuest: [],
  registerUser: [],
  forgotPassword: [],
  resetPassword: [],
  updateCart: [],
  updateProfileData: {},
  iconId: "list-profile",
  isModalOpen: {
    status: false,
    path: "",
    data: {},
    activeSectionFunction: () => {},
  },
  siteSettings: [],
  currentCurrency: "",
});

export const AuthReducerData = (state = initialState(), action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginUser: action.payload,
      };
    case NULLIFY_LAST_NAME:
      return {
        ...state,
        loginUser: {
          ...state.loginUser,
          last_name: [],
        },
      };
    case GUEST_LOGIN_SUCCESS:
      return {
        ...state,
        loginGuest: action.payload,
      };
    case GUEST_LOGIN_FAILURE:
      return {
        ...state,
        loginUser: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        loginUser: null,
      };
    case LOGOUT_GUEST:
      return {
        ...state,
        loginGuest: null,
      };

    case SET_REGISTER_USER:
      return {
        ...state,
        registerUser: action.payload,
      };

    case SET_FORGOT_PASSWORD:
      return {
        ...state,
        forgotPassword: action.payload,
      };

    case SET_RESET_PASSWORD:
      return {
        ...state,
        resetPassword: action.payload,
      };
    case UPDATING_CART_SUCCESS:
      return {
        ...state,
        updateCart: action.payload,
      };

    case OPEN_MODAL:
      return {
        ...state,
        isModalOpen: { ...action.payload },
      };

    default:
      return state;
  }
};

//Reducer for SITE SETTING API

export const siteSettingReducerData = (state = initialState(), action) => {
  switch (action.type) {
    case SET_SITESETTINGS:
      return {
        ...state,
        siteSettings: action.payload,
      };
    case SET_CURRENT_CURRENCY:
      return {
        ...state,
        currentCurrency: action.payload,
      };
    default:
      return state;
  }
};

//Reducer for HEADER TOP ICON ID

export const iconId = (state = initialState, action) => {
  switch (action.type) {
    case GET_ICON_ID:
      return {
        ...state,
        iconId: action.divId,
      };

    default:
      return state;
  }
};

//Reducer for UPDATE PROFILE TOP ICON ID

export const updateProfileReducerData = (state = initialState, action) => {
  switch (action.type) {
    case SET_UPDATE_INFO:
      return {
        ...state,
        updateProfileData: action.payload,
      };
    case CLEAR_UPDATE_INFO:
      return {
        ...state,
        updateProfileData: {},
      };

    default:
      return state;
  }
};

// export const nullLastNameReducerData = (state = initialState, action) => {
//   switch (action.type) {
//     case NULLIFY_LAST_NAME:
//       console.log("first", state);
//       return {
//         ...state,
//         loginUser: [],
//           // ...state.loginUser,
//           // last_name: [],
//       };
//     default:
//       return state;
//   }
// };
