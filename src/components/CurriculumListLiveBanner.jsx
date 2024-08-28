import {useState} from "react";
import {useNavigate} from "react-router-dom";

import '../styles/CurriculumListLiveBanner.css'

function CurriculumListLiveBanner() {

    const [liveStatus, setLiveStatus] = useState('off')
    const navigate = useNavigate();

    const handleEnterClick = () => {
        navigate('/stream');
    }

    return (
        <div className="livebanner">
            <div className="liveTitle">Figma 2024 가이드</div>
            <div className="livebuttons">
                <button
                    className={`btn ${liveStatus === "off" ? "btn-off" : "btn-on-air"}`}
                >
                    Live 강의 상태 : {liveStatus}
                </button>
                <button className="btn btn-enter" onClick={handleEnterClick}>Live 강의 입장</button>
            </div>
        </div>
    )
}

export default CurriculumListLiveBanner;