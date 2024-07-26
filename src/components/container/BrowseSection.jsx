import React from "react";
import boyImage from "../../assets/images/boy-anime.png"
// import "../../responsive/responsive.css"

const BrowseSection = () => {
  return (
    <section className="browse">
      <div className="container">
        <div className="browse-bg">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="browse-right">
                <h3>Browse our collection of 50+ Online Store</h3>
                <a href="#" className="btn btn-browse-all">
                  Browse All
                </a>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="browse-left text-center animate-up">
                <img src={boyImage} alt="Man Shopping" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowseSection;
