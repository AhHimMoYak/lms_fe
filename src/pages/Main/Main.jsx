import MainCourseCardList from "../../components/Main/MainCourseCardList";
import MainBanner from "../../components/Main/MainBanner.jsx";

function Main() {
    return (
        <div
            style={{
                height: "100vh",
            }}
        >
            <MainBanner/>
            <MainCourseCardList/>
        </div>
    );
}

export default Main;
