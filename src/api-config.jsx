let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
    backendHost = "http://localhost:8080/api/v1";
}

if (hostname === "ahimmoyak.click") {
    backendHost = "https://ahimmoyak.click";
}

export const API_BASE_URL = `${backendHost}`;
