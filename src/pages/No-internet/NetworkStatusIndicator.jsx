import * as React from "react";
import { MyToast } from "../../components/toast/MyToast";

const getOnLineStatus = () => {
  return typeof navigator !== "undefined" &&
    typeof navigator.onLine === "boolean"
    ? navigator.onLine
    : true;
};

const useNavigatorOnLine = () => {
  const [status, setStatus] = React.useState(getOnLineStatus());

  React.useEffect(() => {
    const setOnline = () => setStatus(true);
    const setOffline = () => setStatus(false);

    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);

  return status;
};

const NetworkStatusIndicator = () => {
  const isOnline = useNavigatorOnLine();
  const firstUpdate = React.useRef(true);

  React.useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    isOnline
      ? MyToast("You are back online!", "success")
      : MyToast("You are currently offline", "error");
  }, [isOnline]);

  return <div>Check</div>;
};

export default NetworkStatusIndicator;
