import { useState } from "react";
import MainCourseCardList from "../../components/MainCourseCardList";

function Main() {
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      main page 구성요소
      <MainCourseCardList category={1} />
    </div>
  );
}

export default Main;
