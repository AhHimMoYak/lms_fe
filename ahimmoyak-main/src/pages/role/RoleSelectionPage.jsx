import {Briefcase, GraduationCap, Building2} from "lucide-react";
import {useNavigate} from "react-router-dom";

const RoleSelectionPage = () => {
  const roles = [
    {
      id: 'employee',
      title: '회사원(학생)',
      icon: <Briefcase className="w-12 h-12 text-blue-500" />,
      description: '회사 소속 임직원으로 등록하여 교육을 수강하세요.'
    },
    {
      id: 'institution',
      title: '교육기관 관리자',
      icon: <GraduationCap className="w-12 h-12 text-blue-500" />,
      description: '교육기관을 등록하고 교육과정을 운영하세요.'
    },
    {
      id: 'company',
      title: '회사 관리자',
      icon: <Building2 className="w-12 h-12 text-blue-500" />,
      description: '회사를 등록하고 임직원 교육을 관리하세요.'
    }
  ];

  const navigate = useNavigate();

  const handleRoleSelect = (roleId) => {
    // 선택된 역할에 따른 페이지 이동 처리
    navigate(`/register/${roleId}`);
    console.log('Selected role:', roleId);
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            역할 선택
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            서비스에서 사용할 역할을 선택해주세요
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl md:w-4/5">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className="p-6 border rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    {role.icon}
                    <h3 className="text-lg font-medium text-gray-900">{role.title}</h3>
                    <p className="text-sm text-gray-500">{role.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;