
const Dashboard = () => {
  return (
    <>
      <header className="bg-white shadow">
        <div className="p-4">
          <h2 className="text-xl font-semibold">대시보드</h2>
        </div>
      </header>
      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="전체 직원 수" value="128명" />
          <Card title="진행중인 교육" value="12개" />
          <Card title="대기중인 계약" value="5건" />
        </div>
      </main>
    </>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-gray-500 text-sm">{title}</h3>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);

export default Dashboard;