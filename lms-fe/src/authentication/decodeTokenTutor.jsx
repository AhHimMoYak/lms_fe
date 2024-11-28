import { jwtDecode } from "jwt-decode";

export function decodeTokenTutor() {
    try {
        const token = localStorage.getItem("access");
        const claims = jwtDecode(token);
        console.log(claims.role);
        if (claims.role === "MANAGER") {
            return "manager";
        } else {
            return null;
        }
        // return claims.role;
    } catch (err) {
        console.error("토큰 디코딩 실패:", err.message);
        return null;
    }
}
