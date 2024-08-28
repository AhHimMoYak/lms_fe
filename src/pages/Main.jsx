import { Fragment, useState } from 'react';
import CourseButton from '../components/CourseButton';
import CourseCardList from '../components/CourseCardList';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import "../styles/Main.css";

const Main = () => {
    const [selectedCategory, setSelectedCategory] = useState(1);

    const handleSelectCourse = (category) => {
        const categoryNumber = category.categoryNumber; // categoryNumber 추출
        setSelectedCategory(categoryNumber);
        //console.log("handleSelectCourse 안에서의 categoryNumber : " + categoryNumber);
    };

  return (
	<Fragment>
		<Header />
		<div className="courselist">
            <Banner />
            <CourseButton onSelectCourse={handleSelectCourse} />

            {selectedCategory !== null && ( // selectedCategory가 null이 아닌 경우에만 렌더링
                <div className="cardlist">
                    <CourseCardList category={selectedCategory} />
                </div>
            )}
		</div>
    <Footer/>
	</Fragment>
    
  );
}
    
export default Main;
