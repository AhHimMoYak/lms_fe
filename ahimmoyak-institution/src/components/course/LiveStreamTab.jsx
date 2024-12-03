const LiveStreamTab = () => (
  <div className="bg-white rounded-lg shadow">
    <div className="p-4 border-b flex justify-between items-center">
      <h2 className="text-lg font-medium">라이브 방송</h2>
      <button className="bg-blue-600 text-white px-3 py-2 rounded-lg">
        방송 예약
      </button>
    </div>
    <div className="divide-y">
      {[
        { id: 1, title: 'React 심화 특강', date: '2024-01-20 14:00', status: '예정' },
        { id: 2, title: 'Q&A 라이브', date: '2024-01-15 15:00', status: '종료' }
      ].map(stream => (
        <div key={stream.id} className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{stream.title}</h3>
              <p className="text-sm text-gray-500">{stream.date}</p>
            </div>
            <span className={`text-sm px-2 py-1 rounded ${
              stream.status === '예정' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {stream.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default LiveStreamTab;