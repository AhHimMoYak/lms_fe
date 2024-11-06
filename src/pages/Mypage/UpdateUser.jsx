import React, {useEffect, useState} from 'react';
import '/src/styles/UpdateUser.css';
import useAxios from "../../hooks/api/useAxios.jsx";
import {useNavigate} from "react-router-dom";
import { decodeTokenTutor } from '../../authentication/decodeTokenTutor.jsx';

function UpdateUser() {
    const [formData, setFormData] = useState({
        id: '',
        password: '',
        email: '',
        phone: '',
        gender: '',
        birthday: ''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const {data: userInfo, error, fetchData: fetchUserInfo} = useAxios();
    const {data: updateUser, fetchData: updateUserData} = useAxios();


    useEffect(() => {
        fetchUserInfo(`/user/detail`, "GET");
    }, []);

    useEffect(()=>{
        if (userInfo) {
            setFormData({
                id: userInfo.username || '',
                password: '',
                email: userInfo.email || '',
                phone: userInfo.phone || '',
                gender: userInfo.gender || '',
                birthday: userInfo.birthday || ''
            })
        }
    },[userInfo])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // 입력 시 에러 초기화
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.password) newErrors.password = '비밀번호를 입력해 주세요';
        if (!formData.email) newErrors.email = '이메일을 입력해 주세요';
        if (!formData.phone) newErrors.phone = '전화번호를 입력해 주세요';

        if (Object.keys(newErrors).length === 0) {
            updateUserData(`/user/update`,"POST",formData);
            alert("회원정보수정이 완료되었습니다.")
            if(decodeTokenTutor()){
                navigate(`/education/dashboard`);
            }
            else{
                navigate(`/mypage/dashboard`);    
            }
            
        } else {
            setErrors(newErrors);
            alert("필수정보를 입력해주세요.")
        }
    };

    return (
        <div className="update-page">
            <div className="update-container">
                <h2 className="update-title">회원정보 수정</h2>
                <form className="update-form" onSubmit={(e) => e.preventDefault()}>
                    {/* 아이디 (수정 불가, 회색 처리) */}
                    <div className="update-field">
                        <label>아이디:</label>
                        <input
                            type="text"
                            value={formData.id}
                            disabled
                            className="update-input disabled"
                        />
                    </div>
                    {/* 비밀번호 */}
                    <div className="update-field">
                        <label>비밀번호:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="비밀번호를 입력해 주세요"
                            value={formData.password}
                            onChange={handleChange}
                            className={`update-input ${errors.password ? 'error' : ''}`}
                        />
                        {errors.password && (
                            <div className="update-error-container">
                                <p className="update-error">{errors.password}</p>
                            </div>
                        )}
                    </div>
                    {/* 이메일 */}
                    <div className="update-field">
                        <label>이메일:</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="example@domain.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={`update-input ${errors.email ? 'error' : ''}`}
                        />
                        {errors.email && (
                            <div className="update-error-container">
                                <p className="update-error">{errors.email}</p>
                            </div>
                        )}
                    </div>
                    {/* 전화번호 */}
                    <div className="update-field">
                        <label>전화번호:</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="010-1234-5678"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`update-input ${errors.phone ? 'error' : ''}`}
                        />
                        {errors.phone && (
                            <div className="update-error-container">
                                <p className="update-error">{errors.phone}</p>
                            </div>
                        )}
                    </div>
                    {/* 성별 (수정 불가, 회색 처리) */}
                    <div className="update-field">
                        <label>성별:</label>
                        <input
                            type="text"
                            value={formData.gender}
                            disabled
                            className="update-input disabled"
                        />
                    </div>
                    {/* 생년월일 (수정 불가, 회색 처리) */}
                    <div className="update-field">
                        <label>생년월일:</label>
                        <input
                            type="text"
                            value={formData.birthday}
                            disabled
                            className="update-input disabled"
                        />
                    </div>
                    {/* 버튼 */}
                    <button type="button" onClick={handleSubmit} className="update-button">
                        수정 완료
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;
