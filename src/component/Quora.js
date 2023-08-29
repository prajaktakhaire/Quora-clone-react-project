import React, { useState } from "react";
import "../Css/Quora.css";
import Feed from "./Feed";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Widget from "./Widget";
import data from "../data/data.json";

const Loader = () => {
  return (
    <div className="load-container">
      <img
        style={{ margin: "200px auto", display: "block" }}
        src="/Spinner.svg"
        alt="loading"
      />
    </div>
  );
};

function Quora() {
  const [posts, setPosts] = useState([]);
  const [IsmodalOpen, setIsModalOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState("HomeIcon");
  const [loading, setLoading] = useState(false);

  return (
    <div className="quora">
      <Navbar
        IsmodalOpen={IsmodalOpen}
        setIsModalOpen={setIsModalOpen}
        setPosts={setPosts}
        setLoading={setLoading}
        currentLink={currentLink}
        setCurrentLink={setCurrentLink}
      />
      <div className="quora__content">
        <Sidebar
          setCurrentLink={setCurrentLink}
          currentLink={currentLink}
          setLoading={setLoading}
        />
        {currentLink === "HomeIcon" && !loading ? (
          <Feed
            currentLink={null}
            posts={posts}
            setPosts={setPosts}
            setIsModalOpen={setIsModalOpen}
          />
        ) : currentLink === "FeaturedPlayListOutlinedIcon" ? (
          <img
            className="coming__soon"
            src="/feedimg.JPG"
            alt="user feed space"
          />
        ) : currentLink === "AssignmentTurnedInOutlinedIcon" ? (
          <img
            className="coming__soon under__construction"
            src="https://img.freepik.com/premium-vector/construction-design_24877-44621.jpg"
            alt="user feed space"
          />
        ) : currentLink === "PeopleAltOutlinedIcon" ? (
          <img
            className="coming__soon"
            src="/coming_soon_.jpg"
            alt="user feed space"
          />
        ) : currentLink === "NotificationsOutlinedIcon" ? (
          <img
            className="coming__soon notifications_i"
            src="data:image/png;base64,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"
            alt="user feed space"
          />
        ) : (
          <Feed
            currentLink={currentLink}
            posts={posts}
            setPosts={setPosts}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>
    </div>
  );
}

export default Quora;

// FeaturedPlayListOutlinedIcon
// AssignmentTurnedInOutlinedIcon
// PeopleAltOutlinedIcon
// NotificationsOutlinedIcon
