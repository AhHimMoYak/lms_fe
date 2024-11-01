import Body from "../pages/Body";
import "../styles/Modal.css";

import QuizList from "./Main/QuizList.jsx";
import QuizResult from "./QuizResult.jsx";

const Modal = ({ closeModal, buttonId, liveId, stompClient, quizData, quizState}) => {
    let modalContent;

    switch (buttonId) {
        case "send":
            modalContent = <QuizList liveId={liveId} quizData={quizData} stompClient={stompClient} />;
            {
                /* 통신해서 서로 받는 기능에 대한 컴포넌트 넣기*/
            }
            break;
        case "participation":
            modalContent = <QuizResult liveId={liveId} quizData={quizData} quizState={quizState}/>;
            {
                /* 통신해서 서로 받는 기능에 대한 컴포넌트 넣기*/
            }
            break;
    }
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={closeModal}>
                    &times;
                </button>
                {modalContent}
            </div>
        </div>
    );
};

export default Modal;
