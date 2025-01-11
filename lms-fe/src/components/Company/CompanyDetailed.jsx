import {useEffect} from "react";
import useAxios from "../../hooks/api/useAxios.jsx";

import "/src/styles/Company/CompanyDetailed.css"
import {useNavigate} from "react-router-dom";

const CompanyDetailed = () => {

    const navigate = useNavigate();
    const {data, fetchData} = useAxios();

    useEffect(() => {
        fetchData('http://localhost:8083/api/v1/companies/info', "GET")
    }, []);

    const handleUpdate = (name) => {
        navigate('/company/edit', {state: {companyName: name}});
    }

    const handleCreate = () => {
        if (window.confirm("회사를 등록하시겠습니까?")) {
            navigate('/company/create');
        }
    }

    return (
        <div className="companyDetailed-page">
            <div className="companyDetailed-container">
                <h2 className="companyDetailed-title">회사 정보</h2>

                {data ? (
                    <div className="companyDetailed-info">
                        <table className="companyDetailed-info-table">
                            <tbody>
                            <tr>
                                <th>회사명</th>
                                <td>{data.companyName}</td>
                            </tr>
                            <tr>
                                <th>대표자</th>
                                <td>{data.ownerName}</td>
                            </tr>
                            <tr>
                                <th>사업자 번호</th>
                                <td>{data.businessNumber}</td>
                            </tr>
                            <tr>
                                <th>이메일</th>
                                <td>{data.email}</td>
                            </tr>
                            <tr>
                                <th>전화번호</th>
                                <td>{data.phone}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}

                {data ? (
                    <div className="companyDetailed-edit">
                        <button className="companyDetailed-edit-button"
                                onClick={() => handleUpdate(data.companyName)}>
                            수정
                        </button>
                    </div>
                ) : (
                    <div className="company-post">
                        <button className="company-post-button"
                        onClick={handleCreate}>
                            회사 등록
                        </button>
                    </div>
                )}

            </div>
        </div>
    )
}
export default CompanyDetailed;