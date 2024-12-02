import {useState} from "react";
import InputField from "../../components/user/InputField.jsx";
import {ArrowLeft} from "lucide-react";

const AdditionalInfoPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 추가 정보 저장 로직 구현
    console.log('Additional info submission:', formData);
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            추가 정보 입력
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            서비스 이용을 위한 추가 정보를 입력해주세요
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6">

              <InputField
                label="이름"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                error={errors.name}
                required
              />

              <InputField
                label="이메일 주소"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                error={errors.email}
                required
              />

              <InputField
                label="휴대폰 번호"
                type="tel"
                placeholder="'-' 없이 입력해주세요"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                error={errors.phoneNumber}
                required
              />



              <div className="flex items-center justify-between space-x-4">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  이전
                </button>
                <button
                  type="submit"
                  className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  완료
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdditionalInfoPage;