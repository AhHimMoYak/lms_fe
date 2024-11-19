import React, {useEffect, useState} from "react";
import useAxios from "../../hooks/api/useAxios.jsx";
import "../../styles/Education/Management.css";

``
const Management = () => {
    const {data, error, fetchData} = useAxios();
    const {fetchData: patchData} = useAxios();
    const {data: detailData, fetchData: fetchDetail} = useAxios();
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isDetailLoading, setIsDetailLoading] = useState(false);

    useEffect(() => {
        fetchData("/institution", "GET");
    }, []);

    useEffect(() => {
        if (detailData) {
            setSelectedCourse(detailData);
        }
    }, [detailData]);

    const handleAccept = async (courseProvideId) => {
        try {
            await patchData(`/institution/${courseProvideId}/response`, "PATCH", {state: "ACCEPTED"});
            alert("수락하셨습니다.");
            // 수락 후 데이터를 다시 가져와서 업데이트
            await fetchData("/institution", "GET");
        } catch (error) {
            console.error("수락에 실패했습니다:", error);
            alert("수락에 실패했습니다.");
        }
    };

    const handleConfirmEnrollments = async (courseProvideId) => {
        try {
            await patchData(`/institution/${courseProvideId}/registration`, "PATCH");
            alert("참여자 확인 후 계약이 완료되었습니다. 이제 강의를 볼 수 있습니다.");
            // 등록 완료 후 데이터를 다시 가져와서 업데이트
            await fetchData("/institution", "GET");
        } catch (error) {
            console.error("수강 등록 실패:", error);
            alert("수강 등록에 실패했습니다.");
        }
    };

    const handleDetail = async (courseProvideId) => {
        try {
            setIsDetailLoading(true);
            await fetchDetail(`/institution/${courseProvideId}/courseProvideDetail`, "GET");
            setIsDetailLoading(false);
        } catch (error) {
            console.error("상세 정보 API 호출 실패:", error);
            setIsDetailLoading(false);
        }
    };

    const closeModal = () => setSelectedCourse(null);

    if (error) {
        return <div className="error-message">Error: {error.message}</div>;
    }

    if (!data) {
        return <div className="loading-message">Loading...</div>;
    }

    return (
        <div className="mypage-container">
            <div className="main-container">
                <h2 className="contract-title">계약 목록</h2>
                <ul className="contract-list">
                    {data.courseDetailResponseDtoList.map((course, index) => (
                        <li key={index} className="contract-item" onClick={() => handleDetail(course.courseProvideId)}>
                            <h3 className="course-title">{course.courseTitle}</h3>
                            <p className="course-details">기관명: {course.institutionName}</p>
                            <p className="course-details">회사명: {course.companyName}</p>
                            <p className="course-details">시작일: {course.beginDate}</p>
                            <p className="course-details">종료일: {course.endDate}</p>
                            <p className="course-details">참여자 수: {course.attendeeCount}</p>
                            <p className="course-details">상태: {course.state}</p>

                            <div className="button-container">
                                {course.state === "PENDING" && (
                                    <button className="accept-button" onClick={(e) => {
                                        e.stopPropagation();
                                        handleAccept(course.courseProvideId);
                                    }}>
                                        수락
                                    </button>
                                )}
                                {course.state === "ACCEPTED" && (
                                    <p>참여자 등록 대기 중</p>
                                )}
                                {course.state === "ATTENDEE_PENDING" && (
                                    <button
                                        className="confirm-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleConfirmEnrollments(course.courseProvideId);
                                        }}
                                    >
                                        참여자 확인 및 계약 완료
                                    </button>
                                )}
                                {course.state === "NOT_STARTED" && (
                                    <p>과정 대기 중</p>
                                )}
                                {course.state === "ONGOING" && (
                                    <p>과정 진행 중</p>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {selectedCourse && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>계약 상세 정보</h2>
                        {isDetailLoading ? (
                            <p>상세 정보를 불러오는 중입니다...</p>
                        ) : (
                            <>
                                <p>시작일: {selectedCourse.beginDate}</p>
                                <p>종료일: {selectedCourse.endDate}</p>
                                <p>참여자 수: {selectedCourse.attendeeCount}</p>
                                <p>상태: {selectedCourse.state}</p>
                                <h3>참여자 목록</h3>
                                <ul>
                                    {selectedCourse.learnerList && selectedCourse.learnerList.length > 0 ? (
                                        selectedCourse.learnerList.map((learner, index) => (
                                            <li key={index}>
                                                {learner.username} - {learner.name} ({learner.email}) -
                                                상태: {learner.state}
                                            </li>
                                        ))
                                    ) : (
                                        <p>참여자 목록이 없습니다.</p>
                                    )}
                                </ul>
                            </>
                        )}
                        <button onClick={closeModal}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Management;
