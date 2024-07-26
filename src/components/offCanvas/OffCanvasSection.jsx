import Offcanvas from "react-bootstrap/Offcanvas";
import CategoryButton from "../button/CategoryButton";
import HeaderDropdown from "./HeaderDropdown";
import { useDispatch, useSelector } from "react-redux";
import { handleIconId, openModal } from "../../redux/actions/AuthAction";
import { Link, useNavigate } from "react-router-dom";
import LocalSiteLogo from "../../assets/images/localsitelogo.png";

function OffCanvasSection({ show, onHide, buttonOnClick, modalFalse }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginData = useSelector((state) => state.AuthReducerData.loginUser);

  const siteSettingsData = useSelector(
    (state) => state?.siteSettingReducerData?.siteSettings?.settings
  );

  return (
    <>
      <Offcanvas show={show} onHide={onHide}>
        <Offcanvas.Header className="mt-2 mx-1">
          <div className="navbar-brand">
            <Link to="/">
              {siteSettingsData ? (
                <img
                  src={siteSettingsData?.site_logo || LocalSiteLogo}
                  onError={(event) => {
                    event.target.src = LocalSiteLogo;
                    event.onerror = null;
                  }}
                  style={{ height: "50px", width: "120px" }}
                  alt="Site Logo"
                />
              ) : null}
            </Link>
          </div>
          <div className="d-flex mt-2">
            <button
              className="btn-close"
              onClick={buttonOnClick}
              type="button"
            ></button>
          </div>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <HeaderDropdown
            flag={true}
            transform={"uppercase"}
            megaMenu={true}
            container={true}
            buttonOnClick={buttonOnClick}
          />

          <div className="mb-3 mx-1 mt-3">
            <CategoryButton
              buttonName={"Contact Us"}
              className={"btn btn-offCanvas w-100"}
              type={"submit"}
              onClick={() => {
                if (true) {
                  navigate("/myaccount");
                  dispatch(handleIconId("list-contact"));
                  dispatch(modalFalse(false));
                }
              }}
            />
          </div>

          <div className="mx-1">
            <CategoryButton
              buttonName={
                loginData && loginData?.token ? "My Account" : "Sign In"
              }
              className={"btn btn-offCanvas w-100"}
              type={"submit"}
              onClick={() => {
                if (loginData && loginData?.token) {
                  navigate("/myaccount");
                  dispatch(handleIconId("list-profile"));
                  dispatch(modalFalse(false));
                } else {
                  dispatch(openModal(true));
                  dispatch(modalFalse(false));
                }
              }}
            />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvasSection;
