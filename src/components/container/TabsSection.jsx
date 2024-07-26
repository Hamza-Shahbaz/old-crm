import React, { useState } from "react";
import Tabs_ImageSection from "./Tabs_ImageSection";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const TabsSection = ({ name }) => {
  const [fewCategory, setFewCategory] = useState([]);

  const [activeTab, setActiveTab] = useState("tab1");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // //for main category
  const categorydata = useSelector(
    (state) => state?.categoryReducerData?.categories
  );

  useEffect(() => {
    const subset = categorydata.slice(0, 16);
    setFewCategory(subset);
  }, [categorydata]);

  return (
    <section className="tabs-section mb-4 mt-2">
      <div className="container">
        <div className="row">
          <div className="col-12"></div>
          <div className="col-12 mt-3">
            <div className="tab-content">
              <div className="section-title mb-3 mt-2">
                <h2 className="mb-2 headingStyle1">
                  {name || "Featured Categories"}
                </h2>
                <Tabs_ImageSection
                  data={fewCategory}
                  divClassName={"tab-sec mt-3"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TabsSection;
