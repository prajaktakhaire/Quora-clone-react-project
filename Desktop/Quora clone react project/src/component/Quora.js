import React, {useState} from "react";
import "../Css/Quora.css";
import Feed from "./Feed";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Widget from "./Widget";



const Loader = () => {
  return (
    <div className="load-container">
      <img style={{margin : "200px auto",display : "block"}} src="/Spinner.svg"  alt="loading"/>      
    </div>
  )
}


function Quora() {
  const [currentLink, setCurrentLink] = useState("HomeIcon");
  const [loading, setLoading] = useState(false);
  return (
    <div className="quora">
      <Navbar setLoading={setLoading} currentLink={currentLink} setCurrentLink={setCurrentLink}/>
      <div className="quora__content">
        <Sidebar setLoading={setLoading}/>
        {
          (currentLink === "HomeIcon" && !loading) ? <Feed /> : <Loader/>
        }
        <Widget setLoading={setLoading}/>
      </div>
    </div>
  );
}

export default Quora;
