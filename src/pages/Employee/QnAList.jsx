import { useLocation } from "react-router-dom";

function QnAList() {
  const query = new URLSearchParams(useLocation().search);
  const page = query.get(page) || 1;
  const own = query.get(own) || false;

  return (
    <div
      style={{
        backgroundColor: "purple",
      }}
    ></div>
  );
}

export default QnAList;
