import InputField from "../../components/user/InputField.jsx";
import {useState} from "react";

const CompanyRegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    representative: '',
    businessNumber: '',
    email: '',
    phoneNumber: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // 회사 등록 로직 구현
    console.log('Company registration:', formData);
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            회사 등록
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            회사 정보를 입력해주세요
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                label="회사명"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />

              <InputField
                label="대표자명"
                value={formData.representative}
                onChange={(e) => setFormData({...formData, representative: e.target.value})}
                required
              />

              <InputField
                label="사업자등록번호"
                placeholder="'-' 없이 입력해주세요"
                value={formData.businessNumber}
                onChange={(e) => setFormData({...formData, businessNumber: e.target.value})}
                required
              />

              <InputField
                label="대표 이메일"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />

              <InputField
                label="대표 전화번호"
                type="tel"
                placeholder="'-' 없이 입력해주세요"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                required
              />

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                등록하기
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistrationPage