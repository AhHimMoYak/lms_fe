import React, { Fragment, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Title from "../components/Title";
import "../styles/Mypage.css";

function Mypage() {
  const token = localStorage.getItem("access");

  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <Fragment>
      <Header/>
      <Outlet/>
    </Fragment>
    
  );
}

export default Mypage;
