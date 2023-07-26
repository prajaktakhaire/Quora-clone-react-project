import React from "react";
import SidebarOptions from "./SidebarOptions";
import "../Css/Sidebar.css";

function Sidebar({setLoading}) {
  return (
    <div className="sidebar">
      <SidebarOptions setLoading={setLoading} />
    </div>
  );
}

export default Sidebar;
