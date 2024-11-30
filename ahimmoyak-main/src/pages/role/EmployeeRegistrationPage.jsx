import {useState} from "react";
import {ArrowRight, X} from 'lucide-react'
import InputField from "../../components/user/InputField.jsx";

const EmployeeRegistrationPage = () => {
  const [companySearch, setCompanySearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyEmail, setCompanyEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const searchCompanies = () => {
    if (!companySearch) return [];
    return [
      { id: 1, name: '아힘모약', domain: 'ahimmoyak.click' },
      { id: 2, name: '메가존클라우드', domain: 'mz.co.kr' },
      { id: 3, name: '오지랖토끼', domain: 'tiktokki.com' },
    ].filter(company =>
      company.name.toLowerCase().includes(companySearch.toLowerCase())
    );
  };

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setCompanySearch(company.name);
    setShowDropdown(false);
    setIsEmailSent(false);
    setEmailVerified(false);
    setCompanyEmail('');
    setVerificationCode('');
  };

  const clearSelection = () => {
    setCompanySearch('');
    setSelectedCompany(null);
    setIsEmailSent(false);
    setEmailVerified(false);
    setCompanyEmail('');
    setVerificationCode('');
  };

  const handleSendVerification = (e) => {
    e.preventDefault();
    setIsEmailSent(true);
    // 이메일 전송 로직
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    setEmailVerified(true);
    // 인증번호 확인 로직
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            회사원 등록
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            소속 회사를 검색하고 인증해주세요
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  회사명
                </label>
                <div className="flex">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={companySearch}
                      onChange={(e) => {
                        setCompanySearch(e.target.value);
                        setShowDropdown(true);
                      }}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="회사명을 입력하세요"
                    />
                    {companySearch && (
                      <button
                        type="button"
                        onClick={clearSelection}
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                      >
                        <X className="h-4 w-4 text-gray-400" />
                      </button>
                    )}
                  </div>
                </div>

                {showDropdown && companySearch && (
                  <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md py-1 border border-gray-200">
                    {searchCompanies().map((company) => (
                      <button
                        key={company.id}
                        type="button"
                        onClick={() => handleCompanySelect(company)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        <p className="font-medium">{company.name}</p>
                        <p className="text-sm text-gray-500">{company.domain}</p>
                      </button>
                    ))}
                    {searchCompanies().length === 0 && (
                      <p className="px-4 py-2 text-sm text-gray-500">검색 결과가 없습니다</p>
                    )}
                  </div>
                )}
              </div>

              {selectedCompany && !isEmailSent && (
                <form onSubmit={handleSendVerification}>
                  <div className='flex'>
                    <InputField
                      label="회사 이메일"
                      type="text"
                      value={companyEmail}
                      onChange={(e) => setCompanyEmail(e.target.value)}
                      required
                    />
                    <span className='my-7'>@</span>
                    <input
                      value={selectedCompany.domain}
                      disabled
                      className='block w-1/2 px-3 py-2 h-1/2 my-6 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 bg-gray-300'
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    인증번호 전송
                  </button>
                </form>
              )}

              {isEmailSent && !emailVerified && (
                <form onSubmit={handleVerifyCode} className="space-y-4">
                  <div className="rounded-md bg-blue-50 p-4">
                    <p className="text-sm text-blue-700">
                      {companyEmail}로 인증번호가 전송되었습니다.
                    </p>
                  </div>
                  <InputField
                    label="인증번호"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                  />
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleSendVerification}
                      className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      인증번호 재전송
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      확인
                    </button>
                  </div>
                </form>
              )}

              {emailVerified && (
                <div className="rounded-md bg-green-50 p-4">
                  <p className="text-sm text-green-700">
                    이메일 인증이 완료되었습니다.
                  </p>
                  <button
                    type="button"
                    onClick={() => {/* 다음 단계로 이동 */}}
                    className="mt-4 w-full inline-flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    다음 단계로
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRegistrationPage;