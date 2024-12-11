import useAxios from "../../hooks/api/useAxios.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import "/src/styles/Mypage/CreateCompany.css"

const CreateCompany = () => {

    const navigate = useNavigate();
    const {data: company, error, fetchData: fetchCompany} = useAxios();

    const [formData, setFormData] = useState({
        name: '',
        ownerName: '',
        businessNumber: '',
        email: '',
        phone: ''
    })

    const handlePhoneNumberSave = (phone) => {
        const cleanNumber = phone.replace (/[^0-9]/g, '');

        if (cleanNumber.length === 10) {
            return cleanNumber.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
        } else if (cleanNumber.length === 11) {
            return cleanNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
        } else if (cleanNumber.length === 9) {
            return cleanNumber.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3");
        }
        return cleanNumber;
    }


    const handleChange = (e) => {
        const {name, value} = e.target;

        if (name === "businessNumber") {
            const number = value.replace(/[^0-9]/g, "");
            setFormData(prevState => ({
                ...prevState,
                [name]: number
            }));
        } else if(name === "phone") {
            const formattedPhone = handlePhoneNumberSave(value);
            setFormData((prevState) => ({
                ...prevState,
                [name]: formattedPhone,
            }))
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
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
            alert("사업자 번호는 10자리 숫자여야 합니다.")
            return;
        }
        const updatedFormData = {
            ...formData
        };
        fetchCompany('/companies', "POST", updatedFormData);

    }

    useEffect(() => {
        if (company) {
            alert("회사등록이 완료되었습니다");
            navigate("/companys/info")
        }
    }, [company]);

    useEffect(() => {
        if (error) {
            alert(error.response?.data || "오류가 발생했습니다.");
        }
    }, [error]);


    return (
        <div className="company-post-page">
            <div className="company-post-container">
                <h2 className="company-post-title">회사 등록</h2>
                <form onSubmit={handleSubmit} className="company-post-form">
                    <div className="company-post-form-group">
                        <label htmlFor="name">회사명</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="company-post-form-group">
                        <label htmlFor="ownerName">대표자</label>
                        <input
                            type="text"
                            id="ownerName"
                            name="ownerName"
                            value={formData.ownerName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="company-post-form-group">
                        <label htmlFor="businessNumber">사업자 번호</label>
                        <input
                            type="text"
                            id="businessNumber"
                            name="businessNumber"
                            value={formData.businessNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="company-post-form-group">
                        <label htmlFor="email">이메일</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="company-post-form-group">
                        <label htmlFor="phone">전화번호</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="company-post-form-actions">
                        <button className="company-post-form-actions-button" type="submit">등록하기</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default CreateCompany;