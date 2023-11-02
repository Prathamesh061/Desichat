import React, { useEffect } from "react";

import Status from "../components/home/Status";
import Posts from "../components/home/Posts";
import RightSideBar from "../components/home/RightSideBar";

import { useSelector } from "react-redux";
import LoadIcon from "../assets/loading.gif";

const Home = () => {
  const { homePosts } = useSelector((state) => state);

  return (
    <div className="home row mx-0">
      <div className="col-md-8">
        <Status />

        {homePosts.loading ? (
          <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
        ) : homePosts.result === 0 && homePosts.posts.length === 0 ? (
          <h3 className="text-center text-secondary">
            There are no posts to show
          </h3>
        ) : (
          <Posts />
        )}
      </div>

      <div className="col-md-4">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
