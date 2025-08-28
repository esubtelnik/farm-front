import CategoryPage from "@/components/pages/itemPages/CategoryPage";
import { fetchApi } from "@/lib/fetchApi";
import { searchProductsApi } from "@/api/productApi";
import { cookies } from "next/headers";


interface CategoryProps {
   params: Promise<{ slug: string }>;
   searchParams: Promise<{
     title?: string;
     priceTo?: string;
     deliveryTo?: string;
   }>;
 }

export default async function Category({
   params,
   searchParams,
}: CategoryProps) {



   const token = (await cookies()).get("token")?.value;
   const decodedSlug = decodeURIComponent((await params).slug);

   const res = await fetchApi(    searchProductsApi(
      {
        category: [decodedSlug],
        title: (await searchParams).title || "",
        priceTo: Number((await searchParams).priceTo) || 0,
        deliveryTo: Number((await searchParams).deliveryTo) || 0,
      },
      token
    ));

   if (res.success) {
      console.log("Категории:", res.data);
   } else {
      console.error("Ошибка:", res.message);
   }

   return <CategoryPage products={res.data} isLoading={false} />;
}
