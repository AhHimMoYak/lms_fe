import getFixedColorByText from "../../utils/getFixedColorByText.js";
import {NavLink} from "react-router-dom";

const CourseCard = ({ course }) => (
  <div className="bg-white rounded-lg shadow overflow-hidden h-80 w-64 min-w-64">
  <NavLink to={`/course/${course.id}/curriculum`}>
    <div
      className={`w-full h-32 object-cover ${getFixedColorByText(course.title)}`}
    />
    <div className="p-3 flex flex-col h-48">
      <h4 className="font-semibold text-sm mb-2 line-clamp-2">{course.title}</h4>
      <div className="mt-auto">
        <div className="mb-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{width: `${course.progress}%`}}
            />
          </div>
          <p className="text-right text-xs text-gray-600 mt-1">
            {course.progress}%
          </p>
        </div>
        {course.deadline && (
          <p className="text-gray-600 text-xs mb-2">마감일: {course.deadline}</p>
        )}
        <button className="w-full bg-blue-500 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-600 transition-colors">
          바로가기
        </button>
      </div>
    </div>
  </NavLink>
  </div>
);

export default CourseCard;