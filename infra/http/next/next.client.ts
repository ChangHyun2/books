import ky from "ky";

const NEXT_API_ORIGIN = process.env.NEXT_PUBLIC_API_URL;
const nextClient = ky.create({ prefixUrl: NEXT_API_ORIGIN });

export default nextClient;
