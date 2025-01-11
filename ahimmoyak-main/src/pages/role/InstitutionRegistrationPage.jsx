import {useState} from "react";
import InputField from "../../components/user/InputField.jsx";
import axios from 'axios';

import {useNavigate} from "react-router-dom";

const InstitutionRegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    ownerName: '',
    businessNumber: '',
    certifiedNumber: '',
    email: '',
    phone: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("handleSubmit invoked with data:", formData);

    try {
      const response = await axios.post(
        'http://localhost:8080/v1/students/visitor/institutions?userId=6',
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        }
      );
      console.log("Request successful:", response.data);
      alert('교육기관이 등록되었습니다.');

      navigate("/services");
    } catch (error) {
      console.error("Request failed:", error.response?.data || error.message);
      alert('교육기관 등록 중 오류 발생');
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            교육기관 등록
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            교육기관 정보를 입력해주세요
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                label="교육기관명"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />

              <InputField
                label="대표자명"
                value={formData.ownerName}
                onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
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
                label="기관인증번호"
                value={formData.certifiedNumber}
                onChange={(e) => setFormData({...formData, certifiedNumber: e.target.value})}
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
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
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

export default InstitutionRegistrationPage;