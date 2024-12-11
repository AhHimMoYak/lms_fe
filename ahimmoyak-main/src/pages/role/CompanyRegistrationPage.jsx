import InputField from "../../components/user/InputField.jsx";
import { useState } from "react";
import axios from "axios";

const CompanyRegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    ownerName: "",
    businessNumber: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const API_URL = "http://localhost:8080";

  const createCompany = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
          `${API_URL}/v1/students/visitor/companies`,
          formData,
          {
            params: {
              userId: 17,
            },
            withCredentials: true,
          }
      );
      alert("회사 등록이 완료되었습니다!");
      window.location.href = import.meta.env.VITE_COMPANY_API_URL;
    } catch (e) {
      console.error("Error creating company:", e);
      alert("회사 등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneNumberSave = (phone) => {
    const cleanNumber = phone.replace(/[^0-9]/g, "");

    if (cleanNumber.length === 10) {
      return cleanNumber.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
    } else if (cleanNumber.length === 11) {
      return cleanNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    } else if (cleanNumber.length === 9) {
      return cleanNumber.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3");
    }
    return cleanNumber;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "businessNumber") {
      const number = value.replace(/[^0-9]/g, "");
      setFormData((prevState) => ({
        ...prevState,
        [name]: number,
      }));
    } else if (name === "phone") {
      const formattedPhone = handlePhoneNumberSave(value);
      setFormData((prevState) => ({
        ...prevState,
        [name]: formattedPhone,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.businessNumber) {
      alert("사업자 번호를 입력해주세요.");
      return;
    }
    const businessNumberRegex = /^\d{10}$/;
    if (!businessNumberRegex.test(formData.businessNumber)) {
      alert("사업자 번호는 10자리 숫자여야 합니다.");
      return;
    }
    createCompany();
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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <InputField
                    label="대표자명"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    required
                />

                <InputField
                    label="사업자등록번호"
                    name="businessNumber"
                    placeholder="'-' 없이 입력해주세요"
                    value={formData.businessNumber}
                    onChange={handleChange}
                    required
                />

                <InputField
                    label="대표 이메일"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <InputField
                    label="대표 전화번호"
                    type="tel"
                    name="phone"
                    placeholder="'-' 없이 입력해주세요"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                        isSubmitting
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                  {isSubmitting ? "등록 중..." : "등록하기"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CompanyRegistrationPage;
