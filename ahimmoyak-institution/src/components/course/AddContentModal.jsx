import axios from 'axios';
import { useState, useRef } from 'react';
import { X, Upload } from 'lucide-react';

const Modal = ({ title, children, onClose }) => (
    <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
    >
      <div
          className="bg-white rounded-lg p-6 w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">{title}</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
);

const AddContentModal = ({ curriculumId, onClose, onAdd }) => {
  const [file, setFile] = useState(null);
  const [contentTitle, setContentTitle] = useState('');
  const [fileObject, setFileObject] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0); // 업로드 진행 상태
  const fileInputRef = useRef(null);

  const institutionId = '123';  // 임의의 값
  const idx = 1;  // 임의의 값

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
        const encodedFileName = btoa(unescape(encodeURIComponent(selectedFile.name)));

        const requestBody = {
          curriculumId,
          courseId,
          institutionId,
          idx,
          fileName: encodedFileName,
          contentType: selectedFile.type,
          contentTitle,
          fileSize: selectedFile.size,
        };

        // **1. Presigned URL 요청**
        const urlResponse = await axios.post(
            'https://api.ahimmoyak.click/builder/v1/files/upload',
            requestBody,
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true,
            }
        );

        const { presignedUrls, uploadId, s3Key, s3Url } = urlResponse.data;

        if (!presignedUrls || presignedUrls.length === 0) {
          throw new Error('Presigned URL을 받을 수 없습니다. 서버 응답 확인 필요.');
        }

        // **2. 파일 청크 분할 및 업로드**
        const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
        const totalChunks = Math.ceil(selectedFile.size / CHUNK_SIZE);

        const etags = [];
        for (let i = 0; i < totalChunks; i++) {
          const start = i * CHUNK_SIZE;
          const end = Math.min(selectedFile.size, start + CHUNK_SIZE);
          const chunk = selectedFile.slice(start, end);

          const uploadUrl = presignedUrls[i];

          try {
            const uploadResponse = await axios.put(uploadUrl, chunk, {
              headers: { 'Content-Type': selectedFile.type },
              onUploadProgress: (progressEvent) => {
                // 각 청크의 업로드 진행률 계산
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(((i + progress / 100) / totalChunks) * 100);
              }
            });

            if (uploadResponse.status !== 200) {
              throw new Error(`청크 업로드 실패 (파트 ${i + 1})`);
            }

            const etag = uploadResponse.headers.etag;
            if (etag) {
              etags.push({ PartNumber: i + 1, ETag: etag });
            } else {
              throw new Error(`etag가 누락된 청크 업로드 실패 (파트 ${i + 1})`);
            }
          } catch (error) {
            console.error("Error uploading file chunk:", error);
            if (error.response) {
              console.error("Response error:", error.response.data);
            } else if (error.request) {
              console.error("No response received:", error.request);
            } else {
              console.error("Error setting up request:", error.message);
            }
            throw new Error(`청크 업로드 중 오류 발생 (파트 ${i + 1})`);
          }
        }

        // **3. 업로드 완료 요청**
        const completeResponse = await axios.post(
            'https://api.ahimmoyak.click/builder/v1/files/complete-multipart',
            {
              uploadId,
              parts: etags,
              s3Key,
            },
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true,
            }
        );

        if (completeResponse.status === 200) {
          console.log('파일 업로드 완료');
          setFileObject({
            curriculumId,
            courseId,
            institutionId,
            idx,
            fileName: encodedFileName,
            contentType: selectedFile.type,
            fileSize: selectedFile.size,
            s3Key,
            s3Url,
            originalFileName: selectedFile.name,
            contentTitle,
          });

          onAdd({ fileName: selectedFile.name });
        } else {
          throw new Error('업로드 완료 처리 실패');
        }
      } catch (error) {
        console.error('업로드 오류:', error);
        alert(`파일 업로드 중 오류가 발생했습니다: ${error.message}`);
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

    console.log(fileObject);
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
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">{Math.round(uploadProgress)}% 완료</p>
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
