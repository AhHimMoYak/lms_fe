import { Outlet, useLocation, Link } from 'react-router-dom';
import { Users, BookOpen, BookOpenText, FileText, Building2, Home } from 'lucide-react';

const Layout = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1];

  const menuItems = [
    { path: '', text: '대시보드', icon: Home },
    { path: 'employees', text: '직원관리', icon: Users },
    { path: 'courses', text: '교육과정', icon: BookOpen },
    { path: 'search', text: '교육찾기', icon: BookOpenText },
    { path: 'contracts', text: '계약관리', icon: FileText },
    { path: 'company', text: '회사정보', icon: Building2 },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">회사 교육관리</h1>
        </div>
        <nav className="p-4">
          {menuItems.map(({ path, text, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center space-x-2 p-2 rounded-lg mb-1 ${
                currentPath === path ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{text}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex-1 overflow-auto">
        {/*<header className="bg-white shadow">*/}
        {/*  <div className="p-4">*/}
        {/*    <h2 className="text-xl font-semibold capitalize">*/}
        {/*      {menuItems.find(item => item.path === currentPath)?.text || '대시보드'}*/}
        {/*    </h2>*/}
        {/*  </div>*/}
        {/*</header>*/}
        <main className="">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;