let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
    backendHost = "http://khj-alb-438698198.ap-northeast-2.elb.amazonaws.com/api/v1";
}

if (hostname === "ahimmoyak.click") {
    backendHost = "https://ahimmoyak.click";
}

export const API_BASE_URL = `${backendHost}`;
