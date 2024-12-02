import { useState } from "react";
import { Axios } from "../../authentication/axios/Axios";

export const useAxios = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const axiosInstance = Axios();

  const fetchData = async (
    url,
    requestMethod,
    body = null,
    contentType = "application/json"
  ) => {
    try {
      const response = await axiosInstance({
        url,
        method: requestMethod,
        data: body,
        headers: { "Content-Type": contentType },
      });

      console.log(response);
      setData(response.data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  return { data, error, fetchData };
};

export default useAxios;
