import React, { useEffect } from "react";
import { Carousel, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handleBannersData } from "../../redux/actions/CategoryActions";
import { RingLoader } from "react-spinners";
import { BaseUrl } from "../../utils/Api";

const SliderSection = () => {
  const dispatch = useDispatch();

  const bannerData = useSelector((state) => state?.bannerReducerData?.banner);

  useEffect(() => {
    if (!bannerData || bannerData?.length === 0) {
      dispatch(handleBannersData());
    }
  }, [bannerData, dispatch]);

  return (
    <Container className="topSection" fluid>
      {bannerData?.length ? (
        <>
          <Carousel
            interval={5000}
            pause={false}
            style={{
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            {bannerData.map((item, key) => {
              return (
                <Carousel.Item key={key} className="">
                  <img
                    className="d-block w-100 bannerImageStyle"
                    src={item?.banner_images}
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div>
            <RingLoader size={60} color="#2e3192" />
          </div>
        </div>
      )}
    </Container>
  );
};

export default SliderSection;
