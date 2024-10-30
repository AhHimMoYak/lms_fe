import { useState, useEffect } from 'react';
import useAxios from '/src/hooks/api/useAxios';
import '/src/styles/UpdateUser.css';

function UpdateUser() {
    const { data, error, fetchData } = useAxios();
    const [userInfo, setUserInfo] = useState({
        id: '',
        password: '',
        email: '',
        phone: '',
        gender: '',
        birth: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        // 서버에서 사용자 정보를 가져와서 userInfo를 업데이트합니다.
        fetchData('/user/info', 'GET');
    }, []);

    useEffect(() => {
        if (data) {
            setUserInfo(data);
        }
    }, [data]);

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
            // 서버와 통신하여 회원정보 업데이트 요청
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
                        <label className="update-label">아이디:</label>
                        <input
                            type="text"
                            value={userInfo.id || '로딩 중...'}
                            disabled
                            className="update-input disabled"
                        />
                    </div>
                    {/* 비밀번호 */}
                    <div className="update-field">
                        <label className="update-label">비밀번호:</label>
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
                        <label className="update-label">이메일:</label>
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
                        <label className="update-label">전화번호:</label>
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
                        <label className="update-label">성별:</label>
                        <input
                            type="text"
                            value={userInfo.gender}
                            disabled
                            className="update-input disabled"
                        />
                    </div>
                    {/* 생년월일 (수정 불가, 회색 처리) */}
                    <div className="update-field">
                        <label className="update-label">생년월일:</label>
                        <input
                            type="text"
                            value={userInfo.birth}
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
