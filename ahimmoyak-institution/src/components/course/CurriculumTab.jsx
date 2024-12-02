import {Edit2, Trash2, Plus, ChevronUp, ChevronDown} from "lucide-react";
import {useState} from "react";

const CurriculumTab = ({ chapters, expandedChapter, onExpand, onAddChapter, onAddContent }) => {
  const [isAddingChapter, setIsAddingChapter] = useState(false);
  const [newChapter, setNewChapter] = useState({ title: ''});

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-medium">커리큘럼</h2>
        <button
          onClick={() => setIsAddingChapter(true)}
          className="bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> 챕터 추가
        </button>
      </div>

      <div className="divide-y">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium">{chapter.title}</h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-gray-500 hover:text-gray-700">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <Trash2 className="w-4 h-4" />
                </button>
                <button onClick={() => onExpand(chapter.id)} className="ml-2">
                  {expandedChapter === chapter.id ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {expandedChapter === chapter.id && (
              <div className="mt-4 pl-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium text-gray-500">콘텐츠</h4>
                  <button
                    onClick={() => onAddContent(chapter.id)}
                    className="text-sm text-blue-600 flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> 콘텐츠 추가
                  </button>
                </div>
                <div className="space-y-2">
                  {chapter.contents.map((content) => (
                    <ContentItem key={content.id} content={content} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {isAddingChapter && (
        <div className="p-4 border-t">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="챕터명"
              className="w-full border rounded p-2"
              value={newChapter.title}
              onChange={e => setNewChapter({...newChapter, title: e.target.value})}
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onAddChapter(newChapter);
                  setIsAddingChapter(false);
                  setNewChapter({ title: '', duration: '' });
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                확인
              </button>
              <button
                onClick={() => setIsAddingChapter(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ContentItem component
const ContentItem = ({ content }) => (
  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
    <div>
      <p className="text-sm font-medium">{content.title}</p>
      <p className="text-xs text-gray-500">
        {content.type} · {content.duration}
      </p>
    </div>
    <div className="flex gap-2">
      <button className="text-gray-400 hover:text-gray-600">
        <Edit2 className="w-4 h-4" />
      </button>
      <button className="text-gray-400 hover:text-gray-600">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default CurriculumTab;