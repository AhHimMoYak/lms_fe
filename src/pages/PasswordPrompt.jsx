import React, { useState } from 'react';
import '/src/styles/PasswordPrompt.css';

function PasswordPrompt({ onSuccess }) {
    const [password, setPassword] = useState('');

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === '1234') {  // 임시 비밀번호 확인 로직
            onSuccess();
        } else {
            alert('비밀번호가 올바르지 않습니다.');
        }
    };

    return (
        <div className="password-prompt-page">
            <div className="password-prompt-container">
                <h2 className="password-prompt-title">비밀번호 입력</h2>
                <form onSubmit={handlePasswordSubmit} className="password-prompt-form">
                    <div className="password-prompt-field">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호 입력"
                            className="password-prompt-input"
                        />
                    </div>
                    <button type="submit" className="password-prompt-button">확인</button>
                </form>
            </div>
        </div>
    );
}

export default PasswordPrompt;
