import ProductPage from "@/components/pages/itemPages/ProductPage";
import { fetchApi } from "@/lib/fetchApi";
import { getProductByIdApi } from "@/api/productApi";
import { cookies } from "next/headers";
import { getProducerByIdApi } from "@/api/producerApi";

export default async function Product({
   params,
}: {
   params: Promise<{ slug: string }>;
}) {

   const token = (await cookies()).get("token")?.value;
   const decodedSlug = decodeURIComponent((await params).slug);

   const resProduct = await fetchApi(getProductByIdApi({ productId: decodedSlug }, token));
   const resProducer = await fetchApi(getProducerByIdApi({ producerId: resProduct.data.producerId }, token));

   return <ProductPage product={resProduct.data} productProducer={resProducer.data.producer} isLoading={false} />;
}
