import {X, Upload} from 'lucide-react'

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

const AddContentModal = ({ chapterId, onClose, onAdd }) => (
  <Modal title="콘텐츠 추가" onClose={onClose}>
    <div className="space-y-4">
      <div>
        <label className="block mb-1">제목</label>
        <input type="text" className="w-full border rounded p-2" />
      </div>
      <div>
        <label className="block mb-1">타입</label>
        <select className="w-full border rounded p-2">
          <option value="동영상">동영상</option>
          <option value="자료">자료</option>
        </select>
      </div>
      <div>
        <label className="block mb-1">파일</label>
        <div className="border-2 border-dashed rounded-lg p-4 text-center">
          <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-500">파일을 드래그하거나 클릭하여 업로드</p>
          <input type="file" className="hidden" />
        </div>
      </div>
      <button onClick={onAdd} className="w-full bg-blue-600 text-white py-2 rounded-lg">
        추가
      </button>
    </div>
  </Modal>
);

export default AddContentModal;