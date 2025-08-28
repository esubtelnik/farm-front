import CatalogPage from "@/components/pages/CatalogPage";
import { fetchApi } from "@/lib/fetchApi";
import { getCategoriesApi } from "@/api/productApi";
import { cookies } from "next/headers";

export default async function Catalog() {
    const token = (await cookies()).get("token")?.value;

    const res = await fetchApi(getCategoriesApi(token));
  
    if (res.success) {
      console.log("Категории:", res.data);
    } else {
      console.error("Ошибка:", res.message);
    }
  
   return <CatalogPage categories={res.data} />;
}   