import {NavLink, useLocation} from "react-router-dom";
import logo from "../../assets/logo.png";

const Navigation = () => {
  const location = useLocation();

  return (
    <>
    <div className="fixed top-0 left-0 h-full w-56 bg-gray-800 text-white pl-4">
      <div className="h-16 flex items-center border-b border-gray-700 mb-4">
        <NavLink to={'/'} className="flex align-middle items-center">
          <img src={logo} alt="logo" className="w-10" />
          <h1 className="ml-2 text-xl font-bold">아힘모약 LMS</h1>
        </NavLink>
      </div>
      <nav>
        <ul className="space-y-2">
          {[
            { path: '/', label: '대시보드' },
            { path: '/course', label: '수강 중인 코스' },
            { path: '/qna', label: '질의응답' }
          ].map(item => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block p-3 rounded ${
                    isActive
                      ? 'bg-blue-600'
                      : 'hover:bg-gray-700'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
    </>
  );
};

export default Navigation;