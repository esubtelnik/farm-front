import { searchProductsApi } from "@/api/productApi";
import { fetchApi } from "@/lib/fetchApi";
import { cookies } from "next/headers";
import { SearchProductsRequest } from "@/types/requests/ProductRequests";
import SearchPage from "@/components/pages/SearchPage";

interface SearchPageProps {
   searchParams: Promise<{
      title?: string;
      priceTo?: string;
      deliveryTo?: string;
      category?: string;
   }>;
}

export default async function Search({ searchParams }: SearchPageProps) {
    const token = (await cookies()).get("token")?.value;

   const params: SearchProductsRequest = {
    title: (await searchParams).title || "",
    priceTo: Number((await searchParams).priceTo),
   //  deliveryTo: Number((await searchParams).deliveryTo),
    
    category: (await searchParams).category?.trim() ? (await searchParams).category?.split(";") : [],
  };

   const response = await fetchApi(searchProductsApi(params, token));
   const searchedProducts = response.success ? response.data : [];

   return (
    <SearchPage
      products={searchedProducts}
    
    />
   );
}
