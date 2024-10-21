import axios from "axios";
import { API_BASE_URL } from "../../api-config";

export const Axios = () => {
  let accessToken = JSON.parse(localStorage.getItem("access"));
  // const refreshToken = JSON.parse(localStorage.getItem("refresh"));
  // const source = axios.CancelToken.source();

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

  return axiosInstance;

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

  // return axiosInstance;
};
