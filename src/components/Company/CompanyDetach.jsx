import useAxios from "../../hooks/api/useAxios.jsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const CompanyDetach = () => {

    const navigate = useNavigate();
    const {data, fetchData} = useAxios();

    useEffect(() => {
        fetchData('/company/affiliation', "DELETE")
    }, []);

    useEffect(() => {
        if (data) {
            alert("회사 삭제 완료");
            navigate("/company/info");
        }
    }, [data]);

}

export default CompanyDetach;