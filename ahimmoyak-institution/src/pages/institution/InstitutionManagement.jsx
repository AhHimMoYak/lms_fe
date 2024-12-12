import React, {useEffect, useState} from 'react';
import { Building2, Mail, Phone, MapPin, Globe, Edit2 } from 'lucide-react';
import axios from 'axios';

const InstitutionManagement = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [companyData, setCompanyData] = useState({
    // name: '에듀컴퍼니',
    // businessNumber: '123-45-67890',
    // certificateNumber: '111-22-33-456',
    // address: '서울시 강남구 테헤란로 123',
    // email: 'contact@techsolution.com',
    // phone: '02-1234-5678',
    // website: 'www.techsolution.com',
    // employees: 128,
    // description: '혁신적인 IT 솔루션을 제공하는 기업'
  });
  useEffect(() => {
    axios.get('http://localhost:8080/v1/institutions/details?userId=3')
        .then(response => {
          setCompanyData(response.data);
        })
        .catch(error => {
          console.log('오류', error)
        })

  }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.patch('http://localhost:8080/v1/institutions?userId=3', {
            ...companyData,
        })
            .then((response) => {
                console.log('업데이트 성공:', response.data);
                setIsEditing(false);
            })
            .catch((error) => {
                console.error('업데이트 실패:', error);
            });
    };

  return (
    <>
      <header className="bg-white shadow">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">회사 정보</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            {isEditing ? '취소' : '수정'}
          </button>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field
                icon={<Building2 />}
                label="교육기관명"
                name="name"
                value={companyData.institutionName}
                isEditing={isEditing}
                onChange={(e) => setCompanyData({...companyData, institutionName: e.target.value})}
              />

              <Field
                icon={<MapPin />}
                label="주소"
                name="address"
                value={companyData.address}
                isEditing={isEditing}
                onChange={(e) => setCompanyData({...companyData, address: e.target.value})}
              />

              <Field
                label="사업자등록번호"
                name="businessNumber"
                value={companyData.businessNumber}
                //isEditing={isEditing}
                onChange={(e) => setCompanyData({...companyData, businessNumber: e.target.value})}
              />

              <Field
                label="교육사업자인증번호"
                name="businessNumber"
                value={companyData.certifiedNumber}
                //isEditing={isEditing}
                onChange={(e) => setCompanyData({...companyData, certifiedNumber: e.target.value})}
              />

              <Field
                icon={<Mail />}
                label="이메일"
                name="email"
                type="email"
                value={companyData.email}
                isEditing={isEditing}
                onChange={(e) => setCompanyData({...companyData, email: e.target.value})}
              />

              <Field
                icon={<Phone />}
                label="전화번호"
                name="phone"
                value={companyData.phone}
                isEditing={isEditing}
                onChange={(e) => setCompanyData({...companyData, phone: e.target.value})}
              />

              <Field
                icon={<Globe />}
                label="웹사이트"
                name="webSite"
                value={companyData.webSite}
                isEditing={isEditing}
                onChange={(e) => setCompanyData({...companyData, webSite: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                회사 소개
              </label>
              {isEditing ? (
                <textarea
                  className="w-full p-2 border rounded-lg"
                  rows={4}
                  value={companyData.description}
                  onChange={(e) => setCompanyData({...companyData, description: e.target.value})}
                />
              ) : (
                <p className="text-gray-600">{companyData.description}</p>
              )}
            </div>

            {isEditing && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  저장하기
                </button>
              </div>
            )}
          </form>
        </div>
      </main>
    </>
  );
};

const Field = ({ icon, label, name, type = 'text', value, isEditing, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    {isEditing ? (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded-lg"
      />
    ) : (
      <div className="flex items-center text-gray-600">
        {icon && <span className="mr-2">{icon}</span>}
        {value}
      </div>
    )}
  </div>
);

export default InstitutionManagement;