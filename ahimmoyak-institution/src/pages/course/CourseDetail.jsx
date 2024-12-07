import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate, useParams, useSearchParams} from 'react-router-dom';
import { Clock, User, Plus, ChevronDown, ChevronUp, Edit2, Trash2, Building2 } from 'lucide-react';
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
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState('info');
  const [expandedCurriculum, setExpandedCurriculum] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCourse, setEditedCourse] = useState(null);
  const [showContentModal, setShowContentModal] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const courseData = {
    title: 'React 기초부터 실전까지',
    duration: 30,
    instructor: '김강사',
    description: 'React의 기초부터 실전까지 배우는 종합 과정입니다.',
    curriculum: [
      {
        id: 1,
        title: '1장. React 소개',
        contents: [
          { id: 1, title: 'React란?', type: '동영상', duration: '15분' },
          { id: 2, title: '개발환경 설정', type: '문서', duration: '10분' }
        ]
      },
      {
        id: 2,
        title: '2장. React Hooks',
        contents: [
          { id: 3, title: 'useState 활용', type: '동영상', duration: '20분' },
          { id: 4, title: 'useEffect 이해하기', type: '동영상', duration: '25분' }
        ]
      }
    ],
    provides: [
      {
        id: 1,
        company: 'A기업',
        startDate: '2024-01-01',
        endDate: '2024-06-30',
        students: 234,
        status: '진행중'
      },
      {
        id: 2,
        company: 'B기업',
        startDate: '2024-03-01',
        endDate: '2024-08-31',
        students: 189,
        status: '예정'
      }
    ]
  };

  const tabs = [
    { id: 'info', label: '코스 정보' },
    { id: 'curriculum', label: '커리큘럼 관리' },
    { id: 'provide', label: '코스제공 현황' },
    { id: 'notice', label: '공지사항' },
    { id: 'qna', label: '질문게시판' },
    { id: 'exam', label: '시험관리' },
    { id: 'live', label: '라이브방송' }
  ];

  const navigate = useNavigate();


  const handleEditCourse = () => {
    setEditedCourse({
      title: courseData.title,
      duration: courseData.duration,
      instructor: courseData.instructor,
      description: courseData.description
    });
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    // API 호출 로직
    setIsEditing(false);
  };

  const handleSaveChapter = () => {
    // API 호출 로직
  };

  const handleAddContent = (curriculumId) => {
    setSelectedChapterId(curriculumId);
    setShowContentModal(true);
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
              <Clock className="w-4 h-4"/> {courseData.duration}일
            </span>
              <span className="flex items-center gap-1">
              <User className="w-4 h-4"/> {courseData.instructor}
            </span>
            </div>
            <p className="text-gray-600">{courseData.description}</p>
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
            chapters={courseData.curriculum}
            expandedChapter={expandedCurriculum}
            onExpand={setExpandedCurriculum}
            onAddChapter={handleSaveChapter}
            onAddContent={handleAddContent}
          />}/>
          <Route path='provide' element={<ProvideTab provides={courseData.provides}/>}/>

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
                curriculumId={selectedChapterId}
                onClose={() => setShowContentModal(false)} // 모달 닫기
                onAdd={() => {
                  // 콘텐츠 추가 로직
                  // setShowContentModal(false); // 콘텐츠 추가 후 모달 닫기
                }}
            />
        )}
      </div>
    </>
  );
};

export default CourseDetail;
