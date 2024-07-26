import React from "react";
import LoginInformatiionSection from "./LoginInformatiionSection";
import CartBody from "../cart/CartBody";

function MyProfile({ isShown }) {
  return (
    <section>
      {isShown === 1 && (
        <LoginInformatiionSection
          sectionHeading={"Personal Information"}
          formindex={2}
        />
      )}
      {isShown === 2 && (
        <div className="log-info border px-4">
          <div className="log-head-text border-bottom">
            <h4>Favourite Items</h4>
            <CartBody isShownAll={false} />
          </div>
        </div>
      )}
      {isShown === 3 && (
        <LoginInformatiionSection
          sectionHeading={"Change Password"}
          formindex={1}
        />
      )}
    </section>
  );
}

export default MyProfile;
