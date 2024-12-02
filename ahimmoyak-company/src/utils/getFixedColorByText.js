/**
 * 문자열을 인자로 전달하면 20가지 tailwind 색 중 일관된 한가지 색이 반환되는 함수
 * @param str:string
 * @returns {string}
 */
const getFixedColorByText = (str) => {
  const colors = [
    "bg-red-500",    // 강렬한 빨강
    "bg-orange-500", // 생동감 있는 주황
    "bg-amber-500",  // 따뜻한 호박색
    "bg-yellow-500", // 밝은 노랑
    "bg-lime-500",   // 톡 쏘는 라임색
    "bg-green-500",  // 생생한 초록
    "bg-emerald-500",// 청록빛 에메랄드
    "bg-teal-500",   // 시원한 청록색
    "bg-cyan-500",   // 선명한 청색
    "bg-sky-500",    // 맑은 하늘색
    "bg-blue-500",   // 깊은 파랑
    "bg-indigo-500", // 선명한 남색
    "bg-violet-500", // 매혹적인 보라
    "bg-purple-500", // 강렬한 자주
    "bg-fuchsia-500",// 핫핑크 느낌의 자홍색
    "bg-pink-500",   // 화사한 분홍
    "bg-rose-500",   // 장미빛 핑크
    "bg-gray-500",   // 중간 톤의 회색
    "bg-zinc-500",   // 차분한 금속 느낌
    "bg-slate-500"   // 세련된 어두운 회색
  ]
  function hashString(input) {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const charCode = input.charCodeAt(i);
      hash = (hash * 31 + charCode) | 0; // 해시 값을 계산
    }
    return hash;
  }

  const hashValue = hashString(str); // 문자열의 해시 값 계산
  const result = Math.abs(hashValue) % 20; // 0 ~ 19 사이 값 반환
  return colors[result];
}

export default getFixedColorByText;