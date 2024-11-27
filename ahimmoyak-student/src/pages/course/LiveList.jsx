import LiveCard from "../../components/course/LiveCard.jsx";

const LiveList = () => {
  const lives = {
    current: [
      {
        id: 1,
        title: 'React 심화 실시간 강의',
        startTime: '2024-03-25 14:00',
        endTime: '2024-03-25 16:00',
        status: 'live'
      },
      {
        id: 2,
        title: 'React 심화 실시간 강의2',
        startTime: '2024-03-25 14:00',
        endTime: '2024-03-25 16:00',
        status: 'live'
      },
      {
        id: 3,
        title: 'React 심화 실시간 강의2',
        startTime: '2024-03-25 14:00',
        endTime: '2024-03-25 16:00',
        status: 'live'
      },
      {
        id: 4,
        title: 'React 심화 실시간 강의2',
        startTime: '2024-03-25 14:00',
        endTime: '2024-03-25 16:00',
        status: 'live'
      },
      {
        id: 5,
        title: 'React 심화 실시간 강의2',
        startTime: '2024-03-25 14:00',
        endTime: '2024-03-25 16:00',
        status: 'live'
      },
    ],
    upcoming: [
      {
        id: 2,
        title: 'React 성능 최적화 특강',
        startTime: '2024-03-27 15:00',
        endTime: '2024-03-27 17:00',
        status: 'upcoming'
      }
    ],
    ended: [
      {
        id: 3,
        title: 'Component 설계 패턴',
        startTime: '2024-03-20 14:00',
        endTime: '2024-03-20 16:00',
        status: 'ended',
        hasRecording: true
      }
    ]
  };


  return (
    <div className="space-y-8">
      {Object.entries(lives).map(([category, items]) => (
        items.length > 0 && (
          <section key={category}>
            <h2 className="text-lg font-bold mb-4">
              {category === 'current' ? '진행중인 라이브' :
                category === 'upcoming' ? '예정된 라이브' : '종료된 라이브'}
            </h2>
            <div className="flex flex-wrap gap-4">
              {items.map(live => (
                <LiveCard key={live.id} live={live} />
              ))}
            </div>
          </section>
        )
      ))}
    </div>
  );
};

export default LiveList;