import React, { Fragment, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Title from "../components/Title";

function Mypage() {
  const token = localStorage.getItem("access");

  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <Fragment>
      <Header/>
      <div className="app-container">
      <Sidebar
        token={token}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="main-content"><Title/><Outlet/></div>
    </div>
    <Footer/>
    </Fragment>
    
  );
}

export default Mypage;
