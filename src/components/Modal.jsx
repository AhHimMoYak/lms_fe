import Body from "../pages/Body";
import "../styles/Modal.css";

const Modal = ({ closeModal, buttonId }) => {
    let modalContent;

    switch (buttonId) {
        case "send":
            modalContent = <Body />;
            {
                /* 통신해서 서로 받는 기능에 대한 컴포넌트 넣기*/
            }
            break;
        case "participation":
            modalContent = <Body />;
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
