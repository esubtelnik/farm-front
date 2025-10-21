import CatalogPage from "@/components/pages/CatalogPage";
import { fetchApi } from "@/lib/fetchApi";
import { getCategoriesApi } from "@/api/productApi";
import { cookies } from "next/headers";

export default async function Catalog() {
    const token = (await cookies()).get("token")?.value;

    const res = await fetchApi(getCategoriesApi(token));
  
   return <CatalogPage categories={res.data} />;
}   