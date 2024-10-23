import "../styles/NoticeItem.css";

const NoticeItem = ({ title, createAt }) => {
  const dateFormat = (date) => {
    const index = date.indexOf("T");
    return index !== -1 ? date.slice(0, index).replace("T", " ") : date;
  };

  return (
    <div className="noticeItem">
      <div className="title_col">{title}</div>
      <div className="createAt_col">{dateFormat(createAt)}</div>
    </div>
  );
};

export default NoticeItem;
