import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate, useParams, useSearchParams} from 'react-router-dom';
import {Clock, User} from 'lucide-react';
import axios from 'axios';
import Tabs from "../../components/course/Tabs.jsx";
import InfoTab from "../../components/course/InfoTab.jsx";
import CurriculumTab from "../../components/course/CurriculumTab.jsx";
import ProvideTab from "../../components/course/ProvideTab.jsx";
import AddContentModal from "../../components/course/AddContentModal.jsx";
import NoticeTab from "../../components/course/NoticeTab.jsx";
import QnATab from "../../components/course/QnATab.jsx";
import ExamTab from "../../components/course/ExamTab.jsx";
import LiveStreamTab from "../../components/course/LiveStreamTab.jsx";
import NoticeDetail from "./NoticeDetail.jsx";
import NoticeCreate from "./NoticeCreate.jsx";
import QnADetail from "./QnADetail.jsx";
import ExamManagement from "./ExamManagement.jsx";

const CourseDetail = () => {
    const {courseId} = useParams();
    const [courseData, setCourseData] = useState({curriculumList: [{contentsList: []}], courseProvides: []});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)
    const [activeTab, setActiveTab] = useState('info');
    const [expandedCurriculum, setExpandedCurriculum] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedCourse, setEditedCourse] = useState(null);
    const [showContentModal, setShowContentModal] = useState(false);
    const [selectedChapterId, setSelectedChapterId] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const tabs = [
        {id: 'info', label: '코스 정보'},
        {id: 'curriculum', label: '커리큘럼 관리'},
        {id: 'provide', label: '코스제공 현황'},
        {id: 'notice', label: '공지사항'},
        {id: 'qna', label: '질문게시판'},
        {id: 'exam', label: '시험관리'},
        {id: 'live', label: '라이브방송'}
    ];

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/v1/institutions/courses/${courseId}/details`)
            .then(response => {
                setCourseData(response.data);
            })
            .catch(error => {
                console.log('오류', error)
            })
    }, []);

    const updateCourse = async () => {
        try {
            const response = await axios.patch(
                `http://localhost:8080/v1/institutions/courses/${courseId}`, {
                    "title": editedCourse.title,
                    "introduction": editedCourse.introduction,
                    "instructor": editedCourse.instructor,
                    "period": editedCourse.period
                });
        } catch (error) {
            console.log(error)
        }
    }


    const handleEditCourse = () => {
        setEditedCourse({
            title: courseData.title,
            period: courseData.period,
            instructor: courseData.instructor,
            introduction: courseData.introduction
        });
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        setCourseData({...courseData, ...editedCourse});
        setIsEditing(false);

        updateCourse();

    };

    const handleSaveChapter = async (newChapter) => {
        let response;
        try {
            response = await axios.post(
                `http://localhost:8080/v1/institutions/courses/${courseId}/curriculums`, {
                    "title": newChapter.title,
                });
        } catch (error) {
            console.log(error)
        }
        setCourseData(prev => ({
            ...prev, curriculumList: [...prev.curriculumList, {id: response.curriculumId, title: newChapter.title, contentList: []}]
        }))
    };

    const handleAddContent = (curriculumId) => {
        setSelectedChapterId(curriculumId);
        setShowContentModal(true);
    }

    const handleDeleteContent = (contentId) => {
        // 콘텐츠 지우는 로직
    }

    return (
        <>
            <header className="bg-white shadow">
                <div className="p-4">
                    <h2 className="text-xl font-semibold">교육과정관리</h2>
                </div>
            </header>
            <div className="p-8 max-w-5xl mx-auto">
                <div className="bg-white rounded-lg shadow mb-6">
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-4">{courseData.title}</h1>
                        <div className="flex gap-4 text-gray-500 mb-4">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4"/> {courseData.period}일
            </span>
                            <span className="flex items-center gap-1">
              <User className="w-4 h-4"/> {courseData.instructor}
            </span>
                        </div>
                        <p className="text-gray-600">{courseData.introduction}</p>
                    </div>

                    <Tabs tabs={tabs} activeTab={activeTab}/>
                </div>

                <Routes>
                    <Route path='info' element={<InfoTab
                        course={courseData}
                        isEditing={isEditing}
                        editedCourse={editedCourse}
                        onEdit={handleEditCourse}
                        onSave={handleSaveEdit}
                        onCancel={() => setIsEditing(false)}
                        onEditChange={setEditedCourse}
                    />}/>
                    <Route path='curriculum' element={<CurriculumTab
                        chapters={courseData.curriculumList}
                        expandedChapter={expandedCurriculum}
                        onExpand={setExpandedCurriculum}
                        onAddChapter={handleSaveChapter}
                        onAddContent={handleAddContent}
                        onDeleteContent={handleDeleteContent}
                    />}/>
                    <Route path='provide' element={<ProvideTab provides={courseData.courseProvides}/>}/>

                    <Route path='notice' element={<NoticeTab/>}/>
                    <Route path="notice/:noticeId" element={<NoticeDetail/>}/>
                    <Route path="notice/new" element={<NoticeCreate/>}/>

                    <Route path='qna' element={<QnATab/>}/>
                    <Route path='qna/:qnaId' element={<QnADetail/>}/>

                    <Route path='exam' element={<ExamTab/>}/>
                    <Route path='exam/:examId' element={<ExamManagement/>}/>

                    <Route path='live' element={<LiveStreamTab/>}/>
                </Routes>

                {showContentModal && (
                    <AddContentModal
                        chapterId={selectedChapterId}
                        onClose={() => setShowContentModal(false)}
                        onAdd={() => {
                            // 콘텐츠 추가 로직
                            setShowContentModal(false);
                        }}
                    />
                )}
            </div>
        </>
    );
};

export default CourseDetail;
