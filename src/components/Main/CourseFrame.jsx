import { NavLink, Outlet } from "react-router-dom";
import CourseSidebar from "./CourseSidebar";

function CourseFrame() {
  const containerStyle = {
    display: "flex",
    height: "100vh",
  };

  return (
    <div style={containerStyle}>
      <h2>나의 코스</h2>
      <div className="tabs">
        <NavLink to="contents" className={({ isActive }) => (isActive ? 'active' : '')}>탭 1</NavLink>
        <NavLink to="tab2" className={({ isActive }) => (isActive ? 'active' : '')}>탭 2</NavLink>
        <NavLink to="tab3" className={({ isActive }) => (isActive ? 'active' : '')}>탭 3</NavLink>
      </div>

      {/* 중첩된 경로의 컴포넌트를 렌더링할 Outlet */}
      <div className="tab-content">
        <Outlet />
      </div>
    </div>
  );
}

export default CourseFrame;
