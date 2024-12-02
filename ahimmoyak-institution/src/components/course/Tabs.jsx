const Tabs = ({ tabs, activeTab, onTabChange }) => (
  <div className="border-t">
    <div className="flex">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`px-6 py-3 font-medium ${
            activeTab === tab.id
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500'
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  </div>
);
export default Tabs;