import ky from "ky";

const KAKAO_API_ORIGIN = "https://dapi.kakao.com";

const kakaoClient = ky.create({
  prefixUrl: KAKAO_API_ORIGIN,
  hooks: {
    beforeRequest: [
      (request) => {
        const kakaoApiKey = process.env.KAKAO_REST_API_KEY;
        request.headers.set("Authorization", `KakaoAK ${kakaoApiKey}`);
      },
    ],
  },
});

export default kakaoClient;
