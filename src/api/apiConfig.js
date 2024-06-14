import config from "../config";

const BASE_URL = config.API_BASE_URL;

export const API_URLS = {
    INSTANCEAPI: `${BASE_URL}/api`,

    // 부스
    BOOTH_INSERT: `${BASE_URL}/api/booths/insert`,
    BOOTH_GET_LIST: `${BASE_URL}/api/booths/get`,
    BOOTH_GET_BY_ID: `${BASE_URL}/api/booths/get/{id}`,

    // 인증
    SEND_AUTHENTICATION_EMAIL: `${BASE_URL}/api/auth/send-code`,
    CHECK_AUTHENTICATION_EMAIL: `${BASE_URL}/api/auth/verify-code`,
    TOKEN_REFRECH: `${BASE_URL}/api/auth/refresh`,

    // 멤버
    SIGN_UP: `${BASE_URL}/api/member/signup`,
    LOG_IN: `${BASE_URL}/api/member/login`,
    MEMBER_UPDATE: `${BASE_URL}/api/member/update`,

    // 좋아요
    BOOTH_LIKED:`${BASE_URL}/api/booths/liked`,
    BOOTH_LIKE:`${BASE_URL}/api/booths/like`,
    BOOTH_UNLIKE:`${BASE_URL}/api/booths/unlike`,
    BOOTH_LIKED_LIST:`${BASE_URL}/api/booths/likedList`,
};