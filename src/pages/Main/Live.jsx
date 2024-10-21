import { useLocation } from "react-router-dom";

// 쿼리 파라미터로 받는다
// type, page 값이 존재하고 default로 type = total, page = 1 이다
// 다른 값은 type = categoryName, page = 이동 페이지 수 이다

function Live() {
  const query = new URLSearchParams(useLocation().search);
  const type = query.get("type") || "total";

  return (
    <div
      style={{
        flex: 1,
        width: "70%",
        height: "100vh",
        backgroundColor: "purple",
      }}
    >
      <h3>type : {type} </h3>
    </div>
  );
}

export default Live;
