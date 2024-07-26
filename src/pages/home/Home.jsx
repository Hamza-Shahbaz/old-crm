// src/components/Home.js
import React, { useState } from "react";
import Header from "../../components/header/Header";
import MainBody from "../../components/main/MainBody";
import Footer from "../../components/footer/Footer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch } from "react-redux";
import { SET_HOME_BREADCRUMB } from "../../redux/constant/constants";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  let dispatch = useDispatch();
  dispatch({ type: SET_HOME_BREADCRUMB });

  const skeletons = Array.from({ length: 20 }).map((_, index) => (
    <Skeleton
      key={index}
      highlightColor="#e0dfdc"
      circle={true}
      style={{
        height: 120,
        width: 120,
        margin: 20,
      }}
    />
  ));

  return (
    <div className="">
      {!isLoading ? (
        <>
          <Header />
          <MainBody />
          <Footer />
        </>
      ) : (
        <div className="container">
          <Skeleton
            baseColor=""
            highlightColor="#e0dfdc"
            style={{
              height: 70,
            }}
          />
          <Skeleton
            highlightColor="#e0dfdc"
            style={{
              height: 50,
            }}
          />
          <Skeleton
            highlightColor="#e0dfdc"
            style={{
              height: 400,
            }}
          />

          <Skeleton
            highlightColor="#e0dfdc"
            style={{
              height: 80,
            }}
          />
          <div className=" d-flex flex-wrap justify-content-center">
            <>{skeletons}</>;
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
