import { Fragment } from "react";
import CurriculumListLiveBanner from "./CurriculumListLiveBanner";
import CurriculumList from "./CurriculumList";

function Curriculum(){
    return(
        <Fragment>
            <CurriculumListLiveBanner/>
            <CurriculumList/>
        </Fragment>
    )
}

export default Curriculum;