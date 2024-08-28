import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Title.css";

function Title(){

    const [name, setName] = useState("대시보드");
    const params = useParams();
    console.log(params);

    useEffect(() => {
        console.log(location.pathname);
        if(location.pathname === "/mypage" || location.pathname === "/mypage/dashboard"){
            setName("대시보드");
        }
        if(location.pathname === "/mypage/course"){
            setName("코스목록");
        }
        if(location.pathname === "/mypage/qna"){
            setName("QnA");
        }
        if(location.pathname === `/mypage/course/${params.courseId}`){
            setName("강의상세");
        }
    },[location.pathname]);

    return(
        <div className="title-content">
            <h3>아힘모약</h3>
            <h1>{name}</h1>
        </div>
    )
}

export default Title;