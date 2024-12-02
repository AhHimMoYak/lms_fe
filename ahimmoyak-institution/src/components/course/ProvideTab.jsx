import {Edit2, Trash2, Building2} from "lucide-react";
import {useNavigate} from "react-router-dom";

const ProvideTab = ({ provides }) => {
  const navigate = useNavigate();

  return(
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-medium">코스제공 현황</h2>
      </div>

      <div className="divide-y">
        {provides.map((provide) => (
          <div key={provide.id} className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/provide/${provide.id}`)}>
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <h3 className="font-medium">{provide.company}</h3>
                  <span className={`text-sm px-2 py-1 rounded ${
                    provide.status === '진행중'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                  {provide.status}
                </span>
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  {provide.startDate} ~ {provide.endDate}
                  <span className="ml-3">수강생 {provide.students}명</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-gray-500 hover:text-gray-700">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ProvideTab;