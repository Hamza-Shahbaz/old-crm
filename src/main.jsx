// import React from "react";
// import ReactDOM from "react-dom/client";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "@fortawesome/fontawesome-free/css/all.css";
// import "../src/components/css/globalStyle.css";
// import App from "./App";
// import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";
// import Modal from "react-modal";
// import store from "./redux/store";

// Modal.setAppElement("#root");

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <BrowserRouter>
//         <App />
//     </BrowserRouter>
//   </Provider>
// );

////////////////dont delete redux persist work////////////////
import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.css";
import "../src/components/css/globalStyle.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Modal from "react-modal";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import '../src/i18n/i18n'

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
