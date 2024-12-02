import {useState} from "react";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="fixed top-0 left-56 right-0 h-16 bg-white shadow-md px-4 flex items-center justify-end z-10">
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded"
        >
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
          <span>사용자님</span>
        </button>

        {showDropdown && (
          <div className="absolute right-0 top-12 w-48 bg-white shadow-lg rounded-lg py-2">
            {['내 정보', '대시보드', '로그아웃'].map(item => (
              <div
                key={item}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;