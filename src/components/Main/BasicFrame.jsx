import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

function BasicFrame() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default BasicFrame;
