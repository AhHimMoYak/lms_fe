import { useState } from 'react';
import Banner from '../components/Banner';
import CourseButton from '../components/CourseButton';

function Main() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="courselist">
      <Banner />
      <CourseButton onSelectCourse={setSelectedCourse} />

      {/*코스별로 렌더링 될 내용*/}
      {selectedCourse && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h2>{selectedCourse.categoryNumber}</h2>
          <p>Here is the content for {selectedCourse.title}.</p>
        </div>
      )}
    </div>
  );
}

export default Main;
