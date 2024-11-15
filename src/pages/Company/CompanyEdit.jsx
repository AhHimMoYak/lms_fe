import CompanyEditComponent from "../../components/Company/CompanyEdit.jsx"
import {useLocation} from "react-router-dom";

function CompanyEdit() {
    const location = useLocation();
    const {companyName} = location.state || {};
    return (
        <>
            <CompanyEditComponent companyName={companyName}/>
        </>
    )
}

export default CompanyEdit;