import React, {useEffect, useState} from 'react';
import {Building2, Mail, Phone, MapPin, Globe, Edit2, BriefcaseBusiness, UserCheck, UserPen, User} from 'lucide-react';
import axios from "axios";

const CompanyManagement = () => {

  const [isEditing, setIsEditing] = useState(false);
  const [companyData, setCompanyData] = useState({
    companyName: '',
    businessNumber: '',
    email: '',
    phone: '',
    ownerName: ''
  });

  const API_URL = "http://localhost:8080"

  const fetchCompanyData = async () => {
    try {
      const response = await axios.get(`${API_URL}/v1/companies/info?userId=2`, {
        withCredentials: true,
      });
      setCompanyData(response.data)
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
          `${API_URL}/v1/companies?name=${companyData.companyName}`,
          companyData,
          {
            withCredentials: true,
          }
      );
      console.log("수정 성공:", response.data);
      setIsEditing(false);
    } catch (e) {
      console.error("수정 중 오류 발생:", e.response || e.message);
    }
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
                label="회사명"
                name="name"
                value={companyData.companyName}
                isEditing={isEditing}
                onChange={(e) => setCompanyData({...companyData, companyName: e.target.value})}
              />

              <Field
                icon={<BriefcaseBusiness />}
                label="사업자등록번호"
                name="businessNumber"
                value={companyData.businessNumber}
                //isEditing={isEditing}
                onChange={(e) => setCompanyData({...companyData, businessNumber: e.target.value})}
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
                icon={<User />}
                label="대표자"
                name="ownerName"
                value={companyData.ownerName}
                isEditing={isEditing}
                onChange={(e) => setCompanyData({...companyData, ownerName: e.target.value})}
              />
            </div>

            {/*<div>*/}
            {/*  <label className="block text-sm font-medium text-gray-700 mb-2">*/}
            {/*    회사 소개*/}
            {/*  </label>*/}
            {/*  {isEditing ? (*/}
            {/*    <textarea*/}
            {/*      className="w-full p-2 border rounded-lg"*/}
            {/*      rows={4}*/}
            {/*      value={companyData.description}*/}
            {/*      onChange={(e) => setCompanyData({...companyData, description: e.target.value})}*/}
            {/*    />*/}
            {/*  ) : (*/}
            {/*    <p className="text-gray-600">{companyData.description}</p>*/}
            {/*  )}*/}
            {/*</div>*/}

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

export default CompanyManagement;