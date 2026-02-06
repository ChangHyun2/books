import ky from "ky";

const NEXT_API_ORIGIN = "http://localhost:3000";
const kakaoClient = ky.create({ prefixUrl: NEXT_API_ORIGIN });

export default kakaoClient;
