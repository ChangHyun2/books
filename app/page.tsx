import { redirect } from "next/navigation";
import { routers } from "@/constants/routers";

export default function Home() {
  redirect(routers.books.search);
}
