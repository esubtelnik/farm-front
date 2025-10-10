import { fetchApi } from "@/lib/fetchApi";
import { getReadyBasketByIdApi } from "@/api/productApi";
import { cookies } from "next/headers";
import ReadyBasketPage from "@/components/pages/itemPages/ReadyBasketPage";

export default async function ReadyBasket({
   params,
}: {
   params: Promise<{ slug: string }>;
}) {
   const token = (await cookies()).get("token")?.value;
   const decodedSlug = decodeURIComponent((await params).slug);

   const resProduct = await fetchApi(
      getReadyBasketByIdApi({ id: decodedSlug }, token)
   );

   return <ReadyBasketPage product={resProduct.data} />;
}
