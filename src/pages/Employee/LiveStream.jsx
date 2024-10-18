import { useLocation } from "react-router-dom";

function LiveStream() {
  const query = new URLSearchParams(useLocation().search);
  const content = query.get(content);

  return (
    <div
      style={{
        backgroundColor: "purple",
      }}
    ></div>
  );
}

export default LiveStream;
