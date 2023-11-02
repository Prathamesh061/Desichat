import React from "react";
import LoadIcon from "../../assets/loading_snail.gif";

const Loading = () => {
  return (
    <div
      className="position-fixed w-100 h-100 text-center loading"
      style={{
        background: "#0008",
        color: "white",
        top: 0,
        left: 0,
        zIndex: 50,
      }}
    >
      <div className="d-flex justify-content-center">
        <img
          className="loading"
          style={{ width: "10rem", height: "10rem" }}
          src={LoadIcon}
          alt="loading"
        />
      </div>
    </div>
  );
};

export default Loading;
