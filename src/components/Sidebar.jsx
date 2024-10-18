import jwtDecode from "jwt-decode";
import "../styles/Sidebar.css";
import { useNavigate } from "react-router-dom";

// 토큰 디코딩 함수
function decodeToken(token) {
  try {
    const claims = jwtDecode(token);
    return claims;
  } catch (err) {
    console.error("토큰 디코딩 실패:", err.message);
    return null;
  }
}

const Sidebar = ({ token, currentPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const claims = decodeToken(token);

  if (!claims) {
    return <div>Error decoding token</div>;
  }

  const handleNavigation = (page) => {
    //setCurrentPage(page);
    navigate(`${page}`);
  };

  const { sub, email } = claims;

  return (
    <div className="sidebar">
      <div className="top-spacing" />
      <div className="profile">
        <div className="profile-picture"></div>
        <p className="name">{sub}</p>
        <p className="email">{email}</p>
        <hr className="divider" />
      </div>
      <div className="nav-buttons">
        <button
          className={`nav-button ${
            currentPage === "dashboard" ? "active" : ""
          }`}
          onClick={() => handleNavigation("dashboard")}
        >
          <span className="icon">🏠</span> 대시보드
        </button>
        <button
          className={`nav-button ${currentPage === "course" ? "active" : ""}`}
          onClick={() => handleNavigation("course")}
        >
          <span className="icon">📚</span> 코스 목록
        </button>
        <button
          className={`nav-button ${currentPage === "qa" ? "active" : ""}`}
          onClick={() => handleNavigation("qa")}
        >
          <span className="icon">❓</span> Q&A
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
