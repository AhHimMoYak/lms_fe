import {useLocation} from "react-router-dom";
import EmployeeDetailedComponent from "/src/components/Company/EmployeeDetailed.jsx"

function EmployeeDetailed() {

    const location = useLocation();
    const {username} = location.state || {};
    return (
        <>
            <EmployeeDetailedComponent username={username}/>
        </>
    )
}

export default EmployeeDetailed;