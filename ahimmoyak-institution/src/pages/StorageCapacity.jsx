import { useState, useEffect } from "react";
import AxiosManager from "../components/authentication/AxiosManager.jsx";

const StorageCapacity = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosInstance = AxiosManager();
    const fileName = "content-storage";

    useEffect(() => {
        const fetchData = async () => {
            try {
                axiosInstance
                    .get(`analysis/api/aggrid/${fileName}`)
                    .then((response) => {
                        setData(response.data);
                        setLoading(false);
                    })
                    .catch((error) => {
                        setError(error.message);
                        setLoading(false);
                    });
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [fileName]);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (!data) {
        return <div>데이터를 불러올 수 없습니다.</div>;
    }

    if (error) {
        return <p>에러 발생: {error}</p>;
    }

    const { totalCapacityGB, usedCapacityGB } = data;
    const usagePercentage = ((usedCapacityGB / totalCapacityGB) * 100).toFixed(1);

    return (
        <div
            style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "16px",
                width: "100%",
                textAlign: "center",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                margin: "auto"
            }}
        >
            <div
                style={{
                    fontSize: "14px",
                    marginBottom: "8px",
                    fontWeight: "bold",
                    textAlign: "left"
                }}
            >
        <span role="img" aria-label="cloud">
          ☁️
        </span>{" "}
                저장용량
            </div>
            <div
                style={{
                    height: "24px",
                    backgroundColor: "#e0e0e0",
                    borderRadius: "6px",
                    overflow: "hidden",
                    marginBottom: "16px",
                    width: "95%",
                    margin: "0 auto",
                    position: "relative"
                }}
            >
                <div
                    style={{
                        width: `${usagePercentage}%`,
                        backgroundColor: "#4caf50",
                        height: "100%",
                        position: "relative"
                    }}
                >
          <span
              style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#ffffff",
                  fontSize: "12px",
                  fontWeight: "bold"
              }}
          >
            {usedCapacityGB}GB 사용
          </span>
                </div>
                <span
                    style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#000000",
                        fontSize: "12px",
                        fontWeight: "bold"
                    }}
                >
          {totalCapacityGB}GB
        </span>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "16px" // 버튼과 차트 사이 간격 추가
                }}
            >
                <button
                    style={{
                        padding: "8px 16px",
                        backgroundColor: "#4caf50",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "14px"
                    }}
                    onClick={() => alert("추가 저장용량 구매 페이지로 이동")}
                >
                    추가 저장용량 구매
                </button>
            </div>
        </div>
    );
};

export default StorageCapacity;