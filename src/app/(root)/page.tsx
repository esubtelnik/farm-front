import HomePage from "@/components/pages/HomePage";
import { fetchApi } from "@/lib/fetchApi";
import { getCategoriesApi } from "@/api/productApi";
import { getAllProducersApi } from "@/api/producerApi";
import { cookies } from "next/headers";

export default async function Home() {
  const token = (await cookies()).get("token")?.value;

  const res = await fetchApi(getCategoriesApi(token));

  const res2 = await fetchApi(getAllProducersApi(token));

  return <HomePage categories={res.data || []} producers={res2.data || []} />;
}
