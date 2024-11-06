import { jwtDecode } from "jwt-decode";

export function decodeToken() {
    try {
        const token = localStorage.getItem("access");
        const claims = jwtDecode(token);
        return claims.sub;
    } catch (err) {
        console.error("토큰 디코딩 실패:", err.message);
        return null;
    }
}
