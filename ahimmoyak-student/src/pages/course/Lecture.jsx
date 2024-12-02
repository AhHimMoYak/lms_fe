import {CheckCircle, ChevronDown, ChevronRight, PlayCircle, FileText, Clock} from "lucide-react";
import {useState} from "react";
import {NavLink, useParams} from "react-router-dom";

const Lecture = () => {

  const {courseId} = useParams();

  const [openSections, setOpenSections] = useState([0]);
  const curriculum = [
    {
      id: 1,
      title: '1. React 기초',
      completed: true,
      contents: [
        { id: "111", idx: 1, title: 'React 소개', type: 'video', duration: '15:30', completed: true },
        { id: "222", idx: 2, title: 'Node.js 설치 및 설정', type: 'video', duration: '23:15', completed: true },
        { id: "333", idx: 3, title: 'React 예시 코드 강의자료', type: 'file', completed: true }
      ]
    },
    {
      id: 2,
      title: '2. React Hooks',
      completed: false,
      contents: [
        { id: "444", idx: 1, title: 'useState 완벽 가이드', type: 'video', duration: '28:45', completed: true },
        { id: "555", idx: 2, title: 'useEffect 심화', type: 'video', duration: '32:10', completed: false }
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-bold">강좌 목록</h1>
      {curriculum.map((section, index) => (
        <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
          <button
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
            onClick={() => setOpenSections(prev =>
              prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
            )}
          >
            <div className="flex items-center space-x-3">
              {section.completed ?
                <CheckCircle className="w-5 h-5 text-green-500" /> :
                <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
              }
              <span className="font-medium">{section.title}</span>
            </div>
            {openSections.includes(index) ?
              <ChevronDown className="w-5 h-5" /> :
              <ChevronRight className="w-5 h-5" />
            }
          </button>
          {openSections.includes(index) && (
            <div className="divide-y">
              {section.contents.map((content) => (
                <NavLink
                  to={`/course/${courseId}/curriculum/${section.id}/content/${content.id}`}
                  key={content.idx} className="px-4 py-3 flex items-center hover:bg-gray-50">
                  <div className="w-5 h-5 ml-8 mr-3">
                    {content.completed ?
                      <CheckCircle className="w-5 h-5 text-green-500" /> :
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                    }
                  </div>
                  <div className="flex items-center flex-1">
                    {content.type === 'video' ?
                      <PlayCircle className="w-5 h-5 mr-3 text-gray-400" /> :
                      <FileText className="w-5 h-5 mr-3 text-gray-400" />
                    }
                    <span className="flex-1">{content.title}</span>
                    {content.duration && (
                      <span className="text-sm text-gray-500">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {content.duration}
                      </span>
                    )}
                  </div>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Lecture;