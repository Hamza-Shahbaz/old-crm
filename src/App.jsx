import React, { useCallback, useState, useEffect} from "react";
import AppRoutes from "./router/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../src/responsive/responsive.css";
import { useSelector } from "react-redux";
import NoInternet from "./pages/No-internet/NoInternet";

function App() {
  const [status, setStatus] = useState(true);
  const siteSettingsData = useSelector(
    (state) => state?.siteSettingReducerData?.siteSettings?.settings
  );

  useEffect(() => {
    const favicon = document.getElementById("favicon-icon");
    if (favicon && siteSettingsData) {
      favicon.setAttribute("href", siteSettingsData?.site_favicon);
    }
  }, [siteSettingsData?.site_favicon]);

  useEffect(() => {
    listeners();
  }, []);

  const listeners = useCallback(() => {
    window.addEventListener("online", () => setStatus(true));
    window.addEventListener("offline", () => setStatus(false));
    return () => {
      window.removeEventListener("online", () => setStatus(true));
      window.removeEventListener("offline", () => setStatus(false));
    };
  });

  return (
    <>
      {status ? <AppRoutes /> : <NoInternet/>}
      <ToastContainer limit={1} />
    </>
  );
}

export default App;
