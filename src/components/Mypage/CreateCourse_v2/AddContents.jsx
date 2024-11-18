import { FaPlus } from "react-icons/fa6";
import "../../../styles/Mypage/CreateCourse_v2/AddContents.css";

function AddContents({ onAdd }) {
  return (
    <div className="create-course-card">
      <div className="x-icon"></div>
      <FaPlus className="plus-icon" onClick={onAdd} />
    </div>
  );
}

export default AddContents;
