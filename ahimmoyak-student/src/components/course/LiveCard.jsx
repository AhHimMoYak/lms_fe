const LiveCard = ({ live }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 min-w-72 w-72">
    <div className="flex justify-between items-start mb-3">
      <h3 className="font-medium">{live.title}</h3>
      <span className={`px-2 py-1 text-sm rounded ${
        live.status === 'live'
          ? 'bg-green-100 text-green-800'
          : live.status === 'upcoming'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-gray-100 text-gray-800'
      }`}>
          {live.status === 'live' ? '진행중' :
            live.status === 'upcoming' ? '예정됨' : '종료됨'}
        </span>
    </div>
    <div className="text-sm text-gray-600 space-y-1 mb-4">
      <div>시작: {live.startTime}</div>
      <div>종료: {live.endTime}</div>
    </div>
    <button className={`w-full py-2 rounded text-white ${
      live.status === 'live'
        ? 'bg-green-500 hover:bg-green-600'
        : live.status === 'upcoming'
          ? 'bg-yellow-500 hover:bg-yellow-600'
          : 'bg-blue-500 hover:bg-blue-600'
    }`}>
      {live.status === 'live' ? '참여하기' :
        live.status === 'upcoming' ? '알림 설정' : '녹화본 보기'}
    </button>
  </div>
);
export default LiveCard;