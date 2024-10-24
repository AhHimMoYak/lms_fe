import axios from "axios";
import { API_BASE_URL } from "../../api-config";
import AuthManager from "../../hooks/api/AuthManger";

export const Axios = () => {
  const { LogOut } = AuthManager();
  const accessToken = JSON.parse(localStorage.getItem("access"));
  const refreshToken = JSON.parse(localStorage.getItem("refresh"));

  if (accessToken === null) {
    const axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: { "Content-Type": "application/json" },
    });

    return axiosInstance;
  }

  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `[Bearer]${accessToken}`,
    },
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      // 성공적인 응답 처리 (원래 응답을 그대로 반환)
      console.log("success response");
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response) {
        if (error.response.status === 401) {
          try {
            const response = await axios.post(
              `${API_BASE_URL}/reissue`,
              {},
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `[Bearer]${accessToken}`,
                  Refresh: `[Bearer]${refreshToken}`,
                },
              }
            );
            console.log(response.headers["authorization"]);
            const rawAccessToken = response.headers["authorization"].split("]");
            const reAccessToken = rawAccessToken[1];

            localStorage.setItem("access", JSON.stringify(reAccessToken));

            console.log(reAccessToken);
            // 원래 요청의 Authorization 헤더를 갱신
            originalRequest.headers[
              "Authorization"
            ] = `[Bearer]${reAccessToken}`;

            // 실패했던 원래 요청을 다시 실행 (refresh token으로 갱신 후)
            return axiosInstance(originalRequest);
          } catch (error) {
            console.log("access token invalid");
            console.log(error);
            LogOut();
          }
        }
      }

      return Promise.reject(error);
    }
  );
  console.log("start");
  // axiosInstance.interceptors.request.use(async (req) => {
  //   try {
  //     const response = await axios.get(`${API_BASE_URL}/accesstoken`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `[Bearer]${accessToken}`,
  //       },
  //       cancelToken: source.token,
  //     });

  //     if (response.msg !== "OK") return req;

  //     if (response.msg === "INVALID") {
  //       try {
  //         const response = await axios.get(`${API_BASE_URL}/refreshtoken`, {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `[Bearer]${refreshToken}`,
  //           },
  //           cancelToken: source.token,
  //         });

  //         if (response.status === 200) {
  //           const token = response.headers["authorization"].split("]");
  //           accessToken = token[1];
  //           localStorage.setItem("access", JSON.stringify(accessToken));
  //           req.headers.Authorization = `[Bearer]${accessToken}`;
  //         }
  //       } catch (error) {
  //         localStorage.removeItem("access");
  //         localStorage.removeItem("refresh");
  //         window.location.href = "/";
  //       }
  //     }
  //     return req;
  //   } catch (error) {
  //     localStorage.removeItem("access");
  //     localStorage.removeItem("refresh");
  //     throw error;
  //   }
  // });

  return axiosInstance;
};
