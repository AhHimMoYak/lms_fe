const NoticeItem = ({ title, content, createAt }) => {
  return (
    <div>
      <div className="title_col">{title}</div>
      <div className="content_col">{content}</div>
      <div className="createAt_col">{createAt}</div>
    </div>
  );
};

export default NoticeItem;
