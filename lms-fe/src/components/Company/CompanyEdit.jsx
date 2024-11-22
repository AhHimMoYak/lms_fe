import useAxios from "../../hooks/api/useAxios.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import "/src/styles/Company/CompanyEdit.css"
import CompanyDetach from "./CompanyDetach.jsx";

const CompanyEdit = (companyName) => {

    const navigate = useNavigate();
    const [detachComponent, setDetachComponent] = useState(null);
    const {data: company, err, fetchData: fetchCompany} = useAxios();
    const {data: updateCompany, fetchData: fetchUpdateCompany} = useAxios();
    const [formData, setFormData] = useState({
        companyName: '',
        ownerName: '',
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

    useEffect(() => {
        fetchCompany('/company/info',"GET")
    }, []);

    useEffect(() => {
        if (company) {
            setFormData({
                companyName: company.companyName || '',
                ownerName: company.ownerName || '',
                email: company.email || '',
                phone: company.phone || ''
            })
        }
    }, [company]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        if (name === "phone") {
            const formattedPhone = handlePhoneNumberSave(value);
            setFormData((prevState) => ({
                ...prevState,
                [name]: formattedPhone,
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }

    const handleDetachCompany = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            setDetachComponent(<CompanyDetach/>);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const formDataWithName = {
                ...formData,
                name: formData.companyName
            };
            console.log("Sending PATCH request to:", `/company?name=${company.companyName}`);
            const response = await fetchUpdateCompany(`/company?name=${company.companyName}`, "PATCH", formDataWithName);
            alert('회사 정보가 수정되었습니다.');
            navigate('/company/info');
        } catch (err){
            alert('수정 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="company-edit-page">
            <div className="company-edit-container">
                <h2 className="company-edit-title">회사 정보 수정</h2>
                <form className="company-edit-form" onSubmit={handleSubmit}>
                    <div className="company-edit-form-group">
                        <label htmlFor="companyName">회사명</label>
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="company-edit-form-group">
                        <label htmlFor="ownerName">대표자</label>
                        <input
                            type="text"
                            id="ownerName"
                            name="ownerName"
                            value={formData.ownerName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="company-edit-form-group">
                        <label htmlFor="businessNumber">사업자 번호</label>
                        <input
                            type="text"
                            id="businessNumber"
                            name="businessNumber"
                            value={company?.businessNumber || ''}
                            disabled
                        />
                    </div>
                    <div className="company-edit-form-group">
                        <label htmlFor="email">이메일</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="company-edit-form-group">
                        <label htmlFor="phone">전화번호</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="company-edit-form-actions">
                        <button className="company-edit-form-actions-button" type="submit">수정하기</button>
                    </div>
                </form>
                <div>
                    <button className="company-delete-actions-button"
                            onClick={()=>handleDetachCompany()}>
                        {detachComponent}
                        회사 탈퇴</button>

                </div>
            </div>
        </div>
    )
};

export default CompanyEdit;