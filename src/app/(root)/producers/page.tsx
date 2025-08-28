import ProducerListPage from "@/components/pages/ProducerListPage";
import { fetchApi } from "@/lib/fetchApi";
import { getAllProducersApi } from "@/api/producerApi";
import { cookies } from "next/headers";

export default async function Producers() {
   const token = (await cookies()).get("token")?.value;

   const res = await fetchApi(getAllProducersApi(token));

   if (res.success) {
      console.log("Производители:", res.data);
   } else {
      console.error("Ошибка:", res.message);
   }

   return <ProducerListPage producers={res.data} />;
}
