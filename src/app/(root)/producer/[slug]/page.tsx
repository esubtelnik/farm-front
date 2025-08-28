import ProducerPage from "@/components/pages/itemPages/ProducerPage";
import { fetchApi } from "@/lib/fetchApi";
import { cookies } from "next/headers";
import { getProducerByIdApi } from "@/api/producerApi";
import { getProductsByProducerIdApi } from "@/api/productApi";

export default async function Producer({
   params,
}: {
   params: Promise<{ slug: string }>;
}) {

   const token = (await cookies()).get("token")?.value;
   const decodedSlug = decodeURIComponent((await params).slug);

   const resProducer = await fetchApi(getProducerByIdApi({ producerId: decodedSlug }, token));
   const resProducts = await fetchApi(getProductsByProducerIdApi({ producerId: decodedSlug }, token));

   return <ProducerPage producer={resProducer.data.producer} products={resProducts.data || []} gallery={resProducer.data.gallery.images || []} certificates={resProducer.data.certificates.images || []} isLoading={false} />;
}
