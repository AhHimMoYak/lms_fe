import { Outlet, useLocation, Link } from 'react-router-dom';
import { BookOpen, BookOpenText, FileText, Building2, Home, LogOut} from 'lucide-react';

const Layout = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1];

  const menuItems = [
    { path: '', text: '대시보드', icon: Home },
    { path: 'courses', text: '교육과정관리', icon: BookOpen },
    { path: 'provide', text: '교육제공관리', icon: BookOpenText },
    { path: 'contracts', text: '계약관리', icon: FileText },
    { path: 'institution', text: '교육기관정보', icon: Building2 },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">교육기관 관리</h1>
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
        <a className={`flex items-center space-x-2 p-2 rounded-lg mb-1 absolute bottom-0 hover:bg-gray-100 mb-4`} href='https://ahimmoyak.click'>
          <LogOut className="h-5 w-5" />
          <span>메인으로</span>
        </a>
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