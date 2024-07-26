import React, { useState } from "react";

export function ImageMagnifier({
  src,
  containerWidth,
  containerHeight,
  magnifierHeight = 200,
  magnifieWidth = 200,
  zoomLevel = 2,
  onError
}) {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: containerWidth,
        height: containerHeight,
      }}
    >
      <img
        className="imgMagnifier"
        onError={onError}
        src={src}
        style={{
          // Set image size to fill the container while maintaining aspect ratio
          width: "100%",
          height: "100%",
          objectFit: "fill",
        }}
        onMouseEnter={(e) => {
          // Update image size and turn on magnifier
          const elem = e.currentTarget;
          const { width, height } = elem.getBoundingClientRect();
          setSize([width, height]);
          setShowMagnifier(true);
        }}
        onMouseMove={(e) => {
          // Update cursor position
          const elem = e.currentTarget;
          const { top, left } = elem.getBoundingClientRect();
          const x = e.pageX - left - window.pageXOffset;
          const y = e.pageY - top - window.pageYOffset;
          setXY([x, y]);
        }}
        onMouseLeave={() => {
          // Close magnifier
          setShowMagnifier(false);
        }}
        alt={"img"}
      />

      <div
        style={{
          display: showMagnifier ? "" : "none",
          position: "absolute",
          pointerEvents: "none",
          height: `${magnifierHeight}px`,
          width: `${magnifieWidth}px`,
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifieWidth / 2}px`,
          opacity: "1",
          border: "1px solid lightgray",
          backgroundColor: "white",
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,
          backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}
      ></div>
    </div>
  );
}
