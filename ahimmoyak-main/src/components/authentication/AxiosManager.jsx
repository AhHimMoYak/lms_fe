import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AxiosManager = () => {
  const navigate = useNavigate();

  // axiosInstance 생성
  const axiosInstance = axios.create({
    baseURL: 'https://api.ahimmoyak.click',
    withCredentials: true, // 쿠키 포함
  });

  // 응답 인터셉터 추가
  axiosInstance.interceptors.response.use(
    (response) => response, // 정상 응답은 그대로 반환
    async (error) => {
      if (error.response?.status === 401 || !error.response) {
        try {
          console.log('401 error detected, attempting to refresh token.');

          // /auth/refresh 요청 (기본 axios 사용)
          await axios.get('https://api.ahimmoyak.click/auth/refresh', {
            withCredentials: true, // 쿠키 포함
          });

          console.log('Token successfully refreshed. Retrying original request.');

          // 원래 요청 재시도 (기본 axios 사용)
          const originalRequest = error.config;
          return axios(originalRequest);
        } catch (refreshError) {
          console.error('Token refresh failed. Redirecting to /:', refreshError);

          // 토큰 갱신 실패 시 /로 리다이렉트
          navigate('/');
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error); // 다른 오류는 그대로 반환
    }
  );

  return axiosInstance;
};

export default AxiosManager;
