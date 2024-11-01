import Body from "../pages/Body";
import "../styles/Modal.css";

import QuizList from "./Main/QuizList.jsx";
import QuizResult from "./QuizResult.jsx";
import Quiz from "./Main/Quiz.jsx";
import UserQuizList from "./Main/UserQuizList.jsx";

const UserModal = ({ closeModal, liveId, buttonId, stompClient, quiz, addHistory, history}) => {
    let modalContent;

    switch (buttonId) {
      case "solve":
        modalContent = <Quiz closeModal={closeModal} quiz={quiz} stompClient={stompClient} liveId={liveId} addHistory={addHistory}/>;
        break;
      case "history":
        modalContent = <UserQuizList quizData={history} />
        break;
    }
    return (
        <div className="modal-overlay">
            <div className="modal-content">
              {buttonId === "history" && <button className="close-button" onClick={closeModal}>
                &times;
              </button>}

              {modalContent}
            </div>
        </div>
    );
};

export default UserModal;
