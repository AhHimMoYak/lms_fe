import {useState} from "react";
import InputField from "../../components/user/InputField.jsx";
import {Link, useNavigate} from "react-router-dom";
import google_icon from "../../assets/google_login.svg";


const RegisterPage = () => {
  const [formData, setFormData] = useState({
    id:'',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    birthdate: '',
    gender: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({
    id:'',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    birthdate: '',
    gender: '',
    agreeToTerms: false
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 여기에 회원가입 로직 구현

    if (formData.password !== formData.confirmPassword) {
      setErrors({...errors, confirmPassword: '비밀번호가 일치하지 않습니다'})
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/signup`, {
        username,
        email,
        password,
        birthdate,
        gender,
        name,
        phone_number,
      });

      console.log(response);
      if (response.status === 200) {
        navigate(`/email`)
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("회원 가입 오류");
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            회원가입
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            이미 계정이 있으신가요?{' '}
            <Link to={"/signin"} className="font-medium text-blue-600 hover:text-blue-500">
              로그인
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>

              <InputField
                label="아이디"
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({...formData, id: e.target.value})}
                error={errors.id}
                required
              />

              <InputField
                label="비밀번호"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                error={errors.password}
                required
              />

              <InputField
                label="비밀번호 확인"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                error={errors.confirmPassword}
                required
              />

              <InputField
                label="이름"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                error={errors.name}
                required
              />

              <InputField
                label="이메일 주소"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                error={errors.email}
                required
              />

              <InputField
                label="휴대폰 번호"
                type="tel"
                placeholder="'-' 없이 입력해주세요"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                error={errors.phoneNumber}
                required
              />

              <InputField
                label="생년월일"
                type="date"
                placeholder="'-' 없이 입력해주세요"
                value={formData.birthdate}
                onChange={(e) => setFormData({...formData, birthdate: e.target.value})}
                error={errors.birthdate}
                required
              />

              <InputField
                label="성별"
                type="select"
                placeholder="'-' 없이 입력해주세요"
                options={['남', '여']}
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                error={errors.gender}
                required
              />

              <div className="flex items-center">
                <input
                  id="agree"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="agree" className="ml-2 block text-sm text-gray-900">
                  <a href="/terms" className="text-blue-600 hover:text-blue-500">이용약관</a>과{' '}
                  <a href="/privacy" className="text-blue-600 hover:text-blue-500">개인정보 처리방침</a>에 동의합니다
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                회원가입
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    또는 다음으로 계속
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <button
                  className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <img src={google_icon} className="h-5 w-5" alt="Google Icon"/>
                  <span>Google로 계속</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;