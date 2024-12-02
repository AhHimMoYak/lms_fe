import {CheckCircle} from "lucide-react";

const LMSLandingPage = () => {

  const features = [
    {
      title: "맞춤형 학습 경험",
      description: "개인화된 학습 경로와 진도 관리로 효율적인 학습을 지원합니다.",
      icon: <CheckCircle className="w-6 h-6 text-blue-500" />
    },
    {
      title: "풍부한 교육 컨텐츠",
      description: "다양한 분야의 전문 교육 기관이 제공하는 고품질 컨텐츠",
      icon: <CheckCircle className="w-6 h-6 text-blue-500" />
    },
    {
      title: "체계적인 인재 관리",
      description: "임직원의 역량 개발과 교육 이력을 효과적으로 관리",
      icon: <CheckCircle className="w-6 h-6 text-blue-500" />
    }
  ];

  return (
    <div className='min-h-screen pt-16'>
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="text-center">
            <p className="mb-6 max-w-2xl mx-auto text-xl text-gray-500">
              <strong>아는것이 힘!</strong> <del>모르는게 약!</del>
            </p>
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              효과적인 온라인 학습의 시작
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              맞춤형 학습 경험과 체계적인 교육 관리 시스템으로
              개인과 조직의 성장을 지원합니다
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              서비스 특징
            </h2>
          </div>
          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-lg">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default LMSLandingPage;