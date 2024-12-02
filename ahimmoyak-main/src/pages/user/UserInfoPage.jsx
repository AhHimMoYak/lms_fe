import InputField from "../../components/user/InputField.jsx";
import {useState} from "react";
import {User, Mail, Phone, Building2, GraduationCap, Briefcase} from "lucide-react";

const UserInfoPage = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '홍길동',
    email: 'example@company.com',
    phone: '01012345678',
    role: 'employee', // employee, institute, company
    affiliation: '삼성전자',
  });

  const roles = {
    employee: { label: '회사원', icon: Briefcase },
    institute: { label: '교육기관 관리자', icon: GraduationCap },
    company: { label: '회사 관리자', icon: Building2 },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
  };

  const InfoField = ({ label, value, icon: Icon }) => (
    <div className="flex items-center py-3 border-b">
      <Icon className="w-5 h-5 text-gray-400 mr-3" />
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );

  return (
    <div>
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">내 정보</h2>
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  수정
                </button>
              )}
            </div>

            <div className="p-6">
              {editMode ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <InputField
                    label="이름"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <InputField
                    label="이메일"
                    type="email"
                    value={formData.email}
                    disabled
                  />
                  <InputField
                    label="전화번호"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      저장
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-1">
                  <InfoField label="이름" value={formData.name} icon={User} />
                  <InfoField label="이메일" value={formData.email} icon={Mail} />
                  <InfoField label="전화번호" value={formData.phone} icon={Phone} />
                  <InfoField
                    label="역할"
                    value={`${roles[formData.role].label} (${formData.affiliation})`}
                    icon={roles[formData.role].icon}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoPage;