
// 브라우저가 현재 클라이언트 호스트 이름 얻어오기
const hostname = window.location.hostname;

let backendHost; // 백엔드 호스트 이름

if (hostname === 'localhost') {
    backendHost = 'http://localhost:8080';
} else if (hostname === 'todo-buket.s3-website.ap-northeast-2.amazonaws.com') {
    backendHost = 'http://3.38.64.156:80';
}

export const BASE_URL = backendHost;
export const USER = '/auth';
export const ADMIN = '/admin';
export const MAIN = '/admin/main';
export const PM = '/projectpicker/main';
export const PP = '/projectpicker';