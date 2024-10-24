import MainCourseCardList from "../../components/MainCourseCardList";
import NoticeList from "../../components/NoticeList";

function Main() {
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      main page 구성요소
      <MainCourseCardList />
      <NoticeList />
    </div>
  );
}

export default Main;
