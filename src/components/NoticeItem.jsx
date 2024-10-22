import "../styles/NoticeItem.css";

const NoticeItem = ({ title, createAt }) => {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const dateFormat = (date) => {
    const index = date.indexOf("T");
    return index !== -1 ? date.slice(0, index).replace("T", " ") : date;
  };

  return (
    <div className="noticeItem">
      <div className="title_col">{truncateText(title, 50)}</div>
      <div className="createAt_col">{dateFormat(createAt)}</div>
    </div>
  );
};

export default NoticeItem;
