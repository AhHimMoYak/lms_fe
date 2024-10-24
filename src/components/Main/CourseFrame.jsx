import { Outlet } from "react-router-dom";
import CourseSidebar from "./CourseSidebar";

function CourseFrame() {
  const containerStyle = {
    display: "flex",
    height: "100vh",
  };

  return (
    <div style={containerStyle}>
      <Outlet />
    </div>
  );
}

export default CourseFrame;
