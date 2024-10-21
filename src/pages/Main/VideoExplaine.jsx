import { useParams } from "react-router-dom";

// 쿼리 파라미터로 받는다
// type, page 값이 존재하고 default로 type = total, page = 1 이다
// 다른 값은 type = categoryName, page = 이동 페이지 수 이다

function VideoExplaine() {
  const { courseId } = useParams(); // URL에서 courseId를 가져옴

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "purple",
      }}
    >
      <h3>강좌 ID: {courseId} </h3>
    </div>
  );
}

export default VideoExplaine;
