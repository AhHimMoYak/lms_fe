import logo from "../assets/logo.png";
import {NavLink} from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex-shrink-0 flex align-middle items-center space-x-1">
              {/*<img src={logo} alt="logo" className="w-7"/>*/}
              <h3 className="text-xl font-bold ">Ahimmoyak</h3>
            </div>
            <p className="text-gray-500">
              효과적인 온라인 학습 관리 시스템으로 개인과 조직의 성장을 지원합니다.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">서비스</h4>
            <ul className="space-y-2">
              <li><a href="/learner" className="text-gray-500 hover:text-blue-600">학습자 포털</a></li>
              <li><a href="/institute" className="text-gray-500 hover:text-blue-600">교육기관 포털</a></li>
              <li><a href="/corporate" className="text-gray-500 hover:text-blue-600">기업 포털</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">고객지원</h4>
            <ul className="space-y-2">
              <li><a href="/contact" className="text-gray-500 hover:text-blue-600">문의하기</a></li>
              <li><a href="/faq" className="text-gray-500 hover:text-blue-600">자주 묻는 질문</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-gray-500">© 2024 Ahimmoyak. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;