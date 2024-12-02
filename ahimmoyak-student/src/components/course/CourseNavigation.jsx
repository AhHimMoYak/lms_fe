import {ArrowLeft} from "lucide-react";
import {NavLink, useParams} from "react-router-dom";

const CourseNavigation = ({ currentPath, setCurrentPath, }) => {

  const {courseId} = useParams();

  return (
    <div className="fixed top-0 left-56 h-full w-48 bg-gray-100  z-20 shadow-xl rounded-r-3xl">
      <div className="h-16 flex items-center px-6 border-b bg-white shadow-md">
        <div className="mb-6 mt-6">
          <div className="relative group">
            <h3 className="text-md font-bold text-gray-900 truncate w-36">
              React 기초 마스터하기
            </h3>
            <span
              className="absolute left-0 top-full mt-1 hidden w-max max-w-xs rounded-md bg-gray-800 p-2 text-sm text-white shadow-md group-hover:block"
            >
              React 기초 마스터하기
            </span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <nav>
          <ul className="space-y-1">
            {[
              {path: `/course/${courseId}/curriculum`, label: '강의'},
              {path: `/course/${courseId}/live`, label: '라이브'},
              {path: `/course/${courseId}/notice`, label: '공지사항' },
              { path: `/course/${courseId}/qna`, label: '질문게시판' },
              { path: `/course/${courseId}/exam`, label: '평가' }
            ].map(item => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `block p-3 rounded ${
                      isActive
                        ? 'bg-gray-400'
                        : 'hover:bg-gray-500'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CourseNavigation