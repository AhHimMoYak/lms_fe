import React, { useState } from 'react';
import { ChevronLeft, Download, CheckCircle, ChevronRight, PlayCircle, FileText, Clock, LogOut } from 'lucide-react';
import {NavLink, useParams} from "react-router-dom";
import ContentVideoViewer from "../../components/course/ContentVideoViewer.jsx";
import ContentMaterialViewer from "../../components/course/ContentMaterialViewer.jsx";

const ContentViewer = () => {

  const {courseId, curriculumId, contentId} = useParams();

  const mockCurriculum = {
    id: 1,
    title: "React 기초",
    idx: 1,
    contentList: [
      {
        id: 111,
        idx: 1,
        title: "React 소개"
      },
      {
        id: 222,
        idx: 2,
        title: "Node.js 설치 및 설정",
      },
      {
        id: 333,
        idx: 3,
        title: "React 예시 코드 강의자료",
      },
    ]
  }

  const mockContents = [
    {
      id: '111',
      title: "React 소개",
      type: "video",
      duration: "15:31",
      completed: true,
      idx: 1
    },
    {
      id: '222',
      title: "Node.js 설치 및 설정",
      type: "video",
      duration: "7:28",
      completed: true,
      idx: 2
    },
    {
      id: '333',
      title: "React 예시 코드 강의자료",
      type: "material",
      completed: true,
      idx: 3
    }
  ]

  const content = mockContents.filter(content => content.id === contentId)[0];

  const [isPlaying, setIsPlaying] = useState(false);


  const previousContent = mockCurriculum.contentList.filter(c => c.idx === content.idx-1)[0];
  const nextContent = mockCurriculum.contentList.filter(c => c.idx === content.idx+1)[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* 상단 네비게이션 */}
      <div className="mb-6">
        <NavLink
          to={`/course/${courseId}/curriculum`}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          강의 목록으로 돌아가기
        </NavLink>
      </div>

      {/* 콘텐츠 제목 및 진행 상태 */}
      <div className="mb-8">
        <div className="text-sm text-gray-500 mb-2">{content.title}</div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{content.title}</h1>
          <div className="flex items-center">
            {content.completed ?
              <span className="flex items-center text-green-600">
                <CheckCircle className="w-5 h-5 mr-2"/>
                완료됨
              </span>
              : <div className="w-5 h-5 rounded-full border-2 border-gray-300"/>}
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="mb-8">
        {content.type === 'video' ? (
          <ContentVideoViewer content={content}/>
        ) : (
          <ContentMaterialViewer/>
        )}
      </div>

      {/* 이전/다음 네비게이션 */}
      <div className="flex items-center justify-between pt-6 border-t">
        {previousContent ? (
          <NavLink
            to={`/course/${courseId}/curriculum/${curriculumId}/content/${previousContent.id}`}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            <div className="text-left">
              <div className="text-sm text-gray-500">이전 콘텐츠</div>
              <div className="font-medium">{previousContent.title}</div>
            </div>
          </NavLink>
        ) : (
          <div /> // 빈 공간 유지를 위한 더미 엘리먼트
        )}

        {nextContent ? (
          <NavLink
            to={`/course/${courseId}/curriculum/${curriculumId}/content/${nextContent.id}`}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <div className="text-right">
              <div className="text-sm text-gray-500">다음 콘텐츠</div>
              <div className="font-medium">{nextContent.title}</div>
            </div>
            <ChevronRight className="w-5 h-5 ml-1" />
          </NavLink>
        ) : (
          <NavLink
            to={`/course/${courseId}/curriculum`}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <div className="text-right">
              <div className="text-md text-gray-500">목록으로</div>
            </div>
            <LogOut className="w-5 h-5 ml-1" />
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default ContentViewer;