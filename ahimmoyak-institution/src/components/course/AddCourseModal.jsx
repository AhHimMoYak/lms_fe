import {X, Upload} from 'lucide-react'
import {useEffect, useState} from "react";
import {getCategory} from "../../utils/getCategory.js";

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <button onClick={onClose}><X className="w-5 h-5" /></button>
      </div>
      {children}
    </div>
  </div>
);

const AddCourseModal = ({ chapterId, onClose, onAdd }) => {

  const [newCourse, setNewCourse] = useState({
    title: "",
    period: "",
    instructor: "",
    description: "",
    category: "",
  });

  const [categorys, setCategorys] = useState([]);

  useEffect(() => {
    getCategory().then(category => setCategorys(category));
  }, []);

  return(
    <Modal title="코스 추가" onClose={onClose}>
      <div className="space-y-4">
        <div>
          <label className="block mb-1">제목</label>
          <input type="text" className="w-full border rounded p-2" value={newCourse.title} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} />
        </div>
        <div>
          <label className="block mb-1">강사명</label>
          <input type="text" className="w-full border rounded p-2" value={newCourse.instructor} onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })} />
        </div>
        <div>
          <label className="block mb-1">기간 (일)</label>
          <input type="text" className="w-full border rounded p-2" value={newCourse.period} onChange={(e) => setNewCourse({...newCourse, period: e.target.value })} />
        </div>
        <div>
          <label className="block mb-1">소개글</label>
          <input type="text" className="w-full border rounded p-2" value={newCourse.description} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} />
        </div>
        <div>
          <label className="block mb-1">카테고리</label>
          <select className="w-full border rounded p-2" onChange={e => setNewCourse({ ...newCourse, category: e.target.value })}>
            {categorys.map(category => <option key={category.value} value={category.value}>{category.title}</option>)}
          </select>
        </div>

        <button onClick={() => onAdd(newCourse)} className="w-full bg-blue-600 text-white py-2 rounded-lg">
          추가
        </button>
      </div>
    </Modal>
  );
}

export default AddCourseModal;