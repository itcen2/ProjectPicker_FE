
// 브라우저가 현재 클라이언트 호스트 이름 얻어오기
const hostname = window.location.hostname;

let backendHost; // 백엔드 호스트 이름

    // backendHost = 'http://52.79.144.168:8080';
    backendHost = 'http://localhost:8080';


export const BASE_URL = backendHost;
export const USER = '/auth';
export const ADMIN = '/admin';
export const MAIN = '/admin/main';
export const PM = '/projectpicker/main';
export const PP = '/projectpicker';
export const PAGE = '/page';