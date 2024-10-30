import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useAxios from '/src/hooks/api/useAxios';
import '/src/styles/Mypage/PasswordPrompt.css';

function PasswordPrompt() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {passwordData, passwordError, fetchData} = useAxios();

    const handleChange = (e) => {
        setPassword(e.target.value);
        setError(''); // 입력 시 에러 초기화
    };

    const handleSubmit = () => {
        if (!password) {
            setError('비밀번호를 입력해 주세요');
            return;
        }

        fetchData('/user/verification', "post", {password});
    };

    useEffect(() => {
        if (passwordData) {
            navigate('/mypage/user/update');
        } else if (passwordError) {
            setError('비밀번호가 일치하지 않습니다.');
        }
    }, [passwordData, passwordError]);

    return (
        <div className="password-prompt-page">
            <div className="password-prompt-container">
                <h2 className="password-prompt-title">비밀번호 확인</h2>
                <form className="password-prompt-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="password-prompt-field">
                        <label>비밀번호:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="비밀번호를 입력해 주세요"
                            value={password}
                            onChange={handleChange}
                            className={`password-input ${error ? 'error' : ''}`}
                        />
                        {error && (
                            <div className="password-error-container">
                                <p className="password-error">{error}</p>
                            </div>
                        )}
                    </div>
                    <button type="button" onClick={handleSubmit} className="password-prompt-button">
                        확인
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PasswordPrompt;
