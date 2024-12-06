import axios from 'axios';
import { useState, useRef } from 'react';
import { X, Upload } from 'lucide-react';

const Modal = ({ title, children, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">{title}</h3>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        {children}
      </div>
    </div>
);

// 비디오 길이를 가져오는 함수
const getVideoDuration = (file) => {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      resolve(video.duration); // 초 단위 반환
    };

    video.src = URL.createObjectURL(file);
  });
};

// 초 단위를 "MM:SS"로 변환하는 함수
const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const AddContentModal = ({ curriculumId, onClose, onAdd }) => {
  const [file, setFile] = useState(null);
  const [contentTitle, setContentTitle] = useState('');
  const fileInputRef = useRef(null);

  const institutionId = '123'; // 임의 값
  const idx = 1; // 임의 값

  const getCourseIdFromUrl = () => {
    const url = window.location.href;
    const match = url.match(/\/courses\/(\d+)\//);
    return match ? match[1] : null;
  };

  const courseId = getCourseIdFromUrl();

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      try {
        // 파일 이름을 Base64로 인코딩
        const encodedFileName = btoa(unescape(encodeURIComponent(selectedFile.name)));

        // 비디오 길이 추출 및 포맷
        const videoDuration = selectedFile.type.startsWith('video/') ? await getVideoDuration(selectedFile) : null;
        const formattedVideoDuration = videoDuration ? formatDuration(videoDuration) : null;

        // 요청에 필요한 데이터 구성
        const requestBody = {
          curriculumId,
          courseId,
          institutionId,
          idx,
          fileName: encodedFileName,
          contentType: selectedFile.type,
          contentTitle,
          fileSize: selectedFile.size,
          videoDuration: formattedVideoDuration,
        };

        // Presigned URL 요청
        const urlResponse = await axios.post(
            'https://api.ahimmoyak.click/builder/v1/files/upload',
            requestBody,
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true,
            }
        );

        if (!urlResponse.data.uploadUrl) {
          throw new Error('Presigned URL을 받을 수 없습니다.');
        }

        const { uploadUrl, contentId, s3Url, contentType } = urlResponse.data;

        // 파일을 S3로 업로드
        const uploadResponse = await axios.put(uploadUrl, selectedFile, {
          headers: {
            'Content-Type': selectedFile.type, // 파일의 MIME 타입 설정
          },
        });

        if (uploadResponse.status !== 200) {
          throw new Error('파일 업로드 실패');
        }

        console.log('파일 업로드 성공');

        // 업로드 완료 후 데이터 추가
        onAdd({ fileName: selectedFile.name });
        onClose();
      } catch (error) {
        console.error('업로드 오류:', error);
        alert('파일 업로드 중 오류가 발생했습니다.');
      }
    }
  };

  const handleTitleChange = (e) => {
    setContentTitle(e.target.value);
  };

  const handleAddContent = () => {
    if (!file) {
      alert('파일을 선택하세요!');
      return;
    }

    if (!contentTitle.trim()) {
      alert('콘텐츠 제목을 입력하세요!');
      return;
    }
  };

  return (
      <Modal title="콘텐츠 추가" onClose={onClose}>
        <div className="space-y-4">
          <div>
            <label className="block mb-1">제목</label>
            <input
                type="text"
                value={contentTitle}
                onChange={handleTitleChange}
                className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-1">타입</label>
            <select className="w-full border rounded p-2">
              <option value="동영상">동영상</option>
              <option value="자료">자료</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">파일</label>
            <div
                className="border-2 border-dashed rounded-lg p-4 text-center"
                onClick={() => fileInputRef.current.click()}
            >
              <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">파일을 드래그하거나 클릭하여 업로드</p>
              <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
              />
            </div>
          </div>
          <button
              onClick={handleAddContent}
              className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            추가
          </button>
        </div>
      </Modal>
  );
};

export default AddContentModal;
