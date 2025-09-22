import { searchProductsApi } from "@/api/productApi";
import { fetchApi } from "@/lib/fetchApi";
import { cookies } from "next/headers";
import { SearchProductsRequest } from "@/types/requests/ProductRequests";
import SearchPage from "@/components/pages/SearchPage";

interface SearchPageProps {
   searchParams: Promise<{
      title?: string;
      priceTo?: number;
      deliveryTo?: string;
      category?: string;
   }>;
}

export default async function Search({ searchParams }: SearchPageProps) {
    const token = (await cookies()).get("token")?.value;

    const { title, priceTo, deliveryTo, category } = await searchParams;

    const params: SearchProductsRequest = {
      ...(title && { title }),
      ...(priceTo && { priceTo: Number(priceTo) }),
      ...(deliveryTo && { deliveryTo: Number(deliveryTo) }),
      ...(category?.trim() && { category: category.split(";") }),
    };

   const response = await fetchApi(searchProductsApi(params, token));
   const searchedProducts = response.success ? response.data : [];

   return (
    <SearchPage
      products={searchedProducts}
    
    />
   );
}
