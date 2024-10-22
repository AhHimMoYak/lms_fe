import "../styles/NoticeItem.css";

const NoticeItem = ({ title, createAt }) => {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const dateFormat = (date) => {
    return date.replace("T", " ");
  };

  return (
    <div>
      <div className="title_col">{truncateText(title, 60)}</div>
      <div className="createAt_col">{dateFormat(createAt)}</div>
    </div>
  );
};

export default NoticeItem;
