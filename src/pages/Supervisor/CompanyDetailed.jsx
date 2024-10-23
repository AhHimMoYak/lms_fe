import {useEffect} from "react";
import useAxios from "../../hooks/api/useAxios.jsx";

import '/src/styles/CompanyDetailed.css'

function CompanyDetailed() {

    const {data: companyInfo, error, fetchData: fetchCompanyInfo} = useAxios();
    const {data: companyId, fetchData: fetchCompanyIdData} = useAxios();

    // 1. 회사 id 가져오기
    useEffect(() => {
        fetchCompanyIdData("/users/companyId", "GET");
    }, []);

    // 2. 가져온 회사 id 로 회사 정보 가져오기
    useEffect(() => {
        if (companyId != null) {
            const id = companyId.id;
            fetchCompanyInfo(``)
        }
    }, []);

    return (
      <div>
          <h2> 회사정보조회</h2>
      </div>

  );
}

export default CompanyDetailed;
