import {Users, GraduationCap, Building2, ArrowRight} from 'lucide-react'

const ServicesPage = () => {
  const portals = [
    {
      title: "학습자 포털",
      description: "개인화된 학습 경험과 진도 관리를 통해 효율적인 학습을 시작하세요.",
      icon: <Users className="w-16 h-16 text-blue-500" />,
      link: "http://localhost:5174"
    },
    {
      title: "교육기관 포털",
      description: "교육 콘텐츠를 효과적으로 관리하고 학습자들과 소통하세요.",
      icon: <GraduationCap className="w-16 h-16 text-blue-500" />,
      link: "/institute"
    },
    {
      title: "기업 포털",
      description: "임직원 교육을 체계적으로 관리하고 성과를 분석하세요.",
      icon: <Building2 className="w-16 h-16 text-blue-500" />,
      link: "/corporate"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">서비스 포털</h1>
          <p className="mt-4 text-lg text-gray-600">
            필요한 서비스를 선택하여 시작하세요
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portals.map((portal, index) => (
            <a
              key={index}
              href={portal.link}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex flex-col items-center text-center">
                {portal.icon}
                <h2 className="mt-6 text-xl font-bold text-gray-900">
                  {portal.title}
                </h2>
                <p className="mt-4 text-gray-600">
                  {portal.description}
                </p>
                <div className="mt-6 flex items-center text-blue-600">
                  <span>시작하기</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;