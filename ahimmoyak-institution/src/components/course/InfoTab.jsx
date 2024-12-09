import {Edit2} from "lucide-react";

const InfoTab = ({ course, isEditing, editedCourse, onEdit, onSave, onCancel, onEditChange }) => (
  <div className="bg-white rounded-lg shadow p-6 space-y-4">
    {isEditing ? (
      <>
        <div className="space-y-4">
          <div>
            <label className="block mb-1">코스명</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={editedCourse.title}
              onChange={e => onEditChange({...editedCourse, title: e.target.value})}
            />
          </div>
          {/*<div>*/}
          {/*  <label className="block mb-1">기간 (일)</label>*/}
          {/*  <input*/}
          {/*    type="number"*/}
          {/*    className="w-full border rounded p-2"*/}
          {/*    value={editedCourse.period}*/}
          {/*    onChange={e => onEditChange({...editedCourse, period: e.target.value})}*/}
          {/*  />*/}
          {/*</div>*/}
          <div>
            <label className="block mb-1">강사명</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={editedCourse.instructor}
              onChange={e => onEditChange({...editedCourse, instructor: e.target.value})}
            />
          </div>
          <div>
            <label className="block mb-1">소개글</label>
            <textarea
              className="w-full border rounded p-2 h-32"
              value={editedCourse.introduction}
              onChange={e => onEditChange({...editedCourse, introduction: e.target.value})}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onSave()} className="bg-blue-600 text-white px-4 py-2 rounded-lg">저장</button>
          <button onClick={onCancel} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">취소</button>
        </div>
      </>
    ) : (
      <>
        <button onClick={onEdit} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Edit2 className="w-4 h-4" /> 코스 정보 수정
        </button>
        <div>
          <h3 className="font-medium mb-2">코스 소개</h3>
          <p className="text-gray-600">{course.introduction}</p>
        </div>
        <div>
          <h3 className="font-medium mb-2">상세 정보</h3>
          <div className="space-y-2">
            <div className="flex gap-2">
              <span className="text-gray-500">총 기간:</span>
              <span>{course.period}일</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500">강사:</span>
              <span>{course.instructor}</span>
            </div>
          </div>
        </div>
      </>
    )}
  </div>
);

export default InfoTab;