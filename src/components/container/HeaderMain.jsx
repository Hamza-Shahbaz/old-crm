import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
// import "../css/globalStyle.css";
import { BounceLoader } from "react-spinners";
import { Link, NavLink, useNavigate } from "react-router-dom";

function HeaderMain({
  bgColor,
  txtColor,
  categories,
  flag,
  transform,
  megaMenu,
  categoryMargin,
  container,
}) {
  const navigate = useNavigate();
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleHoverLeave = () => {
    setIsHovered(false);
  };

  function categoryIdHandler(id) {
    navigate("/subCategory/" + id, { state: { id: id } });
    handleHoverLeave();
  }

  return (
    <header
      className="header d-none d-lg-block"
      style={{
        backgroundColor: bgColor,
        boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.06) ",
      }}
    >
      <nav className="navbar navbar-expand-lg stroke bg-transparent">
        <div className={`${container ? "container" : "container-fluid "}`}>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className={flag ? "navbar-nav" : "edited-hover navbar-nav "}>
              <li
                style={
                  isTransitionEnabled
                    ? { transition: "width 0.3s ease 0s, left 0.3s ease 0s" }
                    : null
                }
                onMouseLeave={handleHoverLeave}
                className={`nav-item dropdown  megamenu-li mx-2  ${
                  isHovered ? "show" : ""
                }`}
              >
                <Link
                  style={{
                    color: txtColor,
                    fontSize: 14,
                    textTransform: transform,
                    width: "100%",
                    padding:'10px 0px',

                  }}
                  className={`nav-link  ${isHovered ? "show" : ""}`}
                  role="button"
                  onMouseEnter={megaMenu ? handleHover : null}
                >
                  {megaMenu ? "ALL CATEGORY" : null}
                  {megaMenu ? (
                    <IoIosArrowDown
                      className="fa fa-angle-down"
                      size={14}
                      style={{ marginLeft: "3px" }}
                    />
                  ) : null}
                </Link>
                <div
                  className={`dropdown-menu megamenu   ${
                    isHovered ? "show" : ""
                  }`}
                  style={{
                    maxHeight: "315px",
                    overflowY: "auto",
                  }}
                >
                  <div className="container ">
                    <div className="row">
                      <p>All Category</p>
                      <hr />
                    </div>
                    {categories != "" ? (
                      <div className="row ">
                        {categories?.map((item, index) => (
                          <div
                            className="col-lg-3"
                            key={index}
                            onClick={categoryIdHandler.bind(
                              this,
                              item.category_id
                            )}
                          >
                            <Link
                              className="dropdown-item "
                              style={{
                                textAlign: "left",
                                backgroundColor: "red",
                              }}
                            >
                              {item?.category_title}
                            </Link>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <BounceLoader size={35} color="#2e3192" />
                        </div>
                        <div style={{ padding: 10 }}></div>
                      </div>
                    )}
                  </div>
                </div>
              </li>

              {categories !== "" ? (
                categories.slice(0, 7).map((category, index) => (
                  <li
                    key={index}
                    className={`nav-item ${categoryMargin ? "mx-2" : ""}`}
                    style={{
                      // backgroundColor:"grey"
                      margin:"0px 6px"

                    }}
                  >
                    <NavLink
                      to={`/subCategory/${category?.category_id}`}
                      className="nav-link"
                      activeclassname="active"
                      style={{
                        color: txtColor,
                        fontSize: 14,
                        textTransform: transform,
                        width: "100%",
                        // backgroundColor:"tomato",
                        // color:"white",
                        padding:'10px 0px',
                      }}
                    >
                      {category?.category_title}
                    </NavLink>
                  </li>
                ))
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <BounceLoader size={30} color="#fff" />
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default HeaderMain;
