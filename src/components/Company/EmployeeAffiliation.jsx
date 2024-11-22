import { useEffect, useState } from "react";
import useAxios from "../../hooks/api/useAxios.jsx";



const EmployeeAffiliation = () => {
    const { data: companyName, fetchData: fetchCompanyName } = useAxios();
    const [company, setCompany] = useState({ companyName: "" });
    const [searchResults, setSearchResults] = useState([]);
    const [hasError, setHasError] = useState(false);

    const handleInputChange = (e) => {
        setCompany({ ...company, [e.target.name]: e.target.value });
        setSearchResults([]);
        setHasError(false);
    };

    const handleSearchCompany = async () => {
        if (company.companyName.trim() === "") {
            setSearchResults([]);
            return;
        }

        try {
             await fetchCompanyName(`/company?name=${encodeURIComponent(company.companyName.toLowerCase())}`,
            "GET"
        );
            setHasError(false);
        } catch (error) {
            console.error("Error fetching company data:", error);
            setSearchResults([]);
            setHasError(true);
        }
    };

    useEffect(() => {
        if (companyName && Array.isArray(companyName)) {
            const filteredResults = companyName.filter((result) =>
                result.companyName.toLowerCase().includes(company.companyName.toLowerCase())
            );
            setSearchResults(filteredResults);
        } else {
            setSearchResults([]);
        }
    }, [companyName]);

    return (
        <div className="affiliation-post-page">
            <div className="affiliation-post-container">
                <h2 className="affiliation-post-title">회사 등록</h2>
                <form className="affiliation-post-form">
                    <div className="affiliation-post-form-group">
                        <label htmlFor="companyName">회사 검색</label>
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={company.companyName}
                            onChange={handleInputChange}
                            placeholder="검색할 회사 이름을 입력하세요"
                            required
                        />
                        <button
                            type="button"
                            onClick={handleSearchCompany}
                            className="affiliation-post-form-group-button"
                        >
                            검색하기
                        </button>
                    </div>
                </form>
                <div className="affiliation-post-search-results">
                    {searchResults.length > 0 ? (
                        <ul>
                            {searchResults.map((result, index) => (
                                <li key={index} className="affiliation-post-search-result-item">
                                    <strong>{result.companyName}</strong> ({result.emailDomain})
                                </li>
                            ))}
                        </ul>
                    ) : hasError || company.companyName.trim() ? (
                        <p className="affiliation-post-no-results">검색 결과가 없습니다.</p>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default EmployeeAffiliation