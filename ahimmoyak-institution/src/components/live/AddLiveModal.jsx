import {X, Upload} from 'lucide-react'
import {useState} from "react";
import {getCategory} from "../../utils/getCategory.js";
import {useParams} from "react-router-dom";

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

const AddLiveModal = ({ onClose, onAdd, newLive, setNewLive }) => {


  return(
    <Modal title="라이브 방송 예약" onClose={onClose}>
      <div className="space-y-4">
        <div>
          <label className="block mb-1">제목</label>
          <input type="text" className="w-full border rounded p-2" value={newLive.title}
                 onChange={(e) => setNewLive({...newLive, title: e.target.value})}/>
        </div>
        <div>
          <label className="block mb-1">강사명</label>
          <input type="text" className="w-full border rounded p-2" value={newLive.instructor}
                 onChange={(e) => setNewLive({...newLive, instructor: e.target.value})}/>
        </div>
        <div>
          <label className="block mb-1">시작 시간</label>
          <input type="datetime-local" className="w-full border rounded p-2" value={newLive.startTime}
                 onChange={(e) => setNewLive({...newLive, startTime: e.target.value})}/>
        </div>
        <div>
          <label className="block mb-1">종료 시간</label>
          <input type="datetime-local" className="w-full border rounded p-2" value={newLive.endTime}
                 onChange={(e) => setNewLive({...newLive, endTime: e.target.value})}/>
        </div>

        <button onClick={() => onAdd(newLive)} className="w-full bg-blue-600 text-white py-2 rounded-lg">
          추가
        </button>
      </div>
    </Modal>
  );
}

export default AddLiveModal;