
import React from "react";
import { Link } from "react-router-dom";

const TabLink = ({ id, to, label, isActive, onClick }) => {
  return (
    <Link
      className={`list-group-item list-group-item-action bg-bg-secondary 
       ${isActive ? 'active' : ''}`}
      id={`${id}-tab`}
      data-bs-toggle="list"
      to={to}
      role="tab"
      aria-controls={id}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default TabLink;
