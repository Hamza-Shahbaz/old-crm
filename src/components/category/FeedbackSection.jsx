import React from "react";
import CategoryButton from "../button/CategoryButton";
import { ProgressBar } from "react-bootstrap";

function FeedbackSection({viewed}) {
  const now = 90;
  return (
    <>
      <div className="row mt-3">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="give-feedback">
            <div className="give-left">
              <h4>We'd love to hear from you</h4>
              <p>This will just take 2 minutes of your time</p>
            </div>
            <div className="f-top give-link">
              <CategoryButton
                buttonName={"Give Feedback"}
                className={"btn btn-category-button aa"}
                type={"button"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="viewed">
            <div className="viewed-left">
              <p>You've viewed {viewed} products</p>

              <ProgressBar variant="grey" now={now} label={`${now}%`} />
            </div>
            <div className="viewed-link">
              <span className="f-top">
                <CategoryButton
                  buttonName={"Show More Products"}
                  className={"btn btn-clear mt-2"}
                  type={"button"}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeedbackSection;
