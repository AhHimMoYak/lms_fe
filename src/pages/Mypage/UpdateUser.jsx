import React, { useState } from 'react';
import '/src/styles/UpdateUser.css';

function UpdateUser() {
    const [userInfo, setUserInfo] = useState({
        id: 'user123',
        password: '',
        email: 'user@example.com',
        phone: '010-1234-5678',
        gender: '남',
        birthDate: '1990-01-01',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // 입력 시 에러 초기화
    };

    const handleSubmit = () => {
        const newErrors = {};

        if (!userInfo.password) newErrors.password = '비밀번호를 입력해 주세요';
        if (!userInfo.email) newErrors.email = '이메일을 입력해 주세요';
        if (!userInfo.phone) newErrors.phone = '전화번호를 입력해 주세요';

        if (Object.keys(newErrors).length === 0) {
            alert('회원정보가 수정되었습니다.');
        } else {
            setErrors(newErrors);
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
                            value={userInfo.id}
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
                            value={userInfo.password}
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
                            value={userInfo.email}
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
                            value={userInfo.phone}
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
                            value={userInfo.gender}
                            disabled
                            className="update-input disabled"
                        />
                    </div>
                    {/* 생년월일 (수정 불가, 회색 처리) */}
                    <div className="update-field">
                        <label>생년월일:</label>
                        <input
                            type="text"
                            value={userInfo.birthDate}
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
