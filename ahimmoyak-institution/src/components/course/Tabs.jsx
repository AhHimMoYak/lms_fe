import {NavLink, useParams} from "react-router-dom";

const Tabs = ({ tabs, activeTab }) => {

  const {courseId} = useParams();

  return(
    <div className="border-t">
      <div className="flex">
        {tabs.map(tab => (
          <NavLink
            key={tab.id}
            className={({isActive}) =>
              `px-6 py-3 font-medium ${
              isActive
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
            to={`/courses/${courseId}/${tab.id}`}>
            {tab.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
export default Tabs;