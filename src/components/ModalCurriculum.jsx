import "../styles/Modal.css";

import ModifyCurriculum from "../pages/Mypage/ModifyCurriculum.jsx"

const ModalCurriculum = ({ closeModal, buttonId, curriculumId }) => {
    let modalContent;

    switch (buttonId) {
        case "modifyCurriculum":
            modalContent = <ModifyCurriculum curriculumId={curriculumId}/>
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

export default ModalCurriculum;
