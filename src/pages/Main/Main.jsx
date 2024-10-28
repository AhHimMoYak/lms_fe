import MainCourseCardList from "../../components/Main/MainCourseCardList";
import NoticeList from "../../components/Main/NoticeList";

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
