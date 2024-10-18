import { useLocation } from "react-router-dom";

function QnATotalList() {
  const query = new URLSearchParams(useLocation().search);
  const page = query.get(page) || "total";
  const own = query.get(own) || false;

  return (
    <div
      style={{
        backgroundColor: "purple",
      }}
    ></div>
  );
}

export default QnATotalList;
