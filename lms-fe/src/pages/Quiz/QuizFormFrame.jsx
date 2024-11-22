import { Outlet } from "react-router-dom";

function QuizFormFrame() {
    return (
        <div className="quiz-container">
            <Outlet />
        </div>
    );
}

export default QuizFormFrame;
