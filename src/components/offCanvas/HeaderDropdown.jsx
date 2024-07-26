import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { BounceLoader } from "react-spinners";
import { getData, BaseUrl, EndPoints } from "../../utils/Api";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function HeaderDropdown({
  flag,
  transform,
  megaMenu,
  buttonOnClick,
  modalFalse,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [mainData, setMainData] = useState([]);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  const handleHoverLeave = () => {
    setIsHovered(false);
  };

  const getCategories = `${BaseUrl}${EndPoints.main_category}`;

  useEffect(() => {
    getData(getCategories).then((res) => setMainData(res.data));
  }, []);

  function categoryIdHandler(id) {
    buttonOnClick();
    navigate("/subCategory/" + id, { state: { id: id } });
  }

  return (
    <div
      style={{
        backgroundColor: "#fafbfd",
      }}
    >
      <div className="justify-content-center mx-2">
        <ul className={flag ? "navbar-nav" : "edited-hover navbar-nav "}>
          <li
            // onMouseLeave={handleHoverLeave}
            className={`mx-2 ${isHovered ? "show" : ""}`}
          >
            <a
              style={{
                textTransform: transform,
                width: "100%",
                fontSize: "16px",
                textAlign: "initial",
                cursor: "pointer",
              }}
              className={`nav-link  ${isHovered ? "show" : ""}`}
              onClick={megaMenu ? handleHover : null}
            >
              All Category
              {megaMenu ? (
                <IoIosArrowDown
                  className="fa fa-angle-down"
                  size={14}
                  style={{ marginLeft: "10px" }}
                />
              ) : null}
            </a>
            <div className={`dropdown-menu ${isHovered ? "show" : ""}`}>
              <div className="container">
                {mainData != "" ? (
                  <div className="col">
                    {mainData.map((item, index) => (
                      <div
                        className="col-lg-3"
                        key={index}
                        // onClick={categoryIdHandler.bind(this, item.category_id)}
                      >
                        {/* <a
                          className="dropdown-item "
                          style={{
                            textAlign: "left",
                            cursor: "pointer",
                          }}
                        >
                          {item?.category_title}
                        </a> */}

                        <NavLink
                          to={`/subCategory/${item.category_id}`}
                          onClick={() => {
                            dispatch(modalFalse(false));
                          }}
                          className="nav-link offcanvasActive" 
                          activeclassname="active"
                          style={{
                            textAlign: "left",
                            cursor: "pointer",
                          }}
                        >
                          {item?.category_title}
                        </NavLink>
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
                  </div>
                )}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HeaderDropdown;
