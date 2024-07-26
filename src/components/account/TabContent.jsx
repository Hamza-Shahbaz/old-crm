import React from "react";

const TabContent = ({ id, content, onClick , isShow}) => {
  return (
    <div
      onClick={onClick}
      // className={`tab-pane fade ${label === "My Profile" ? "show active" : ""}`}
      // className={`tab-pane fade ${label === "My Profile" || label === "My Favorite" ? "show active" : ""}`}
      className={`tab-pane fade ${isShow ? "show active" : ""}`}
      id={id}
      role="tabpanel"
      aria-labelledby={`${id}-tab`}
    >
      {content}
    </div>
  );
};

export default TabContent;
