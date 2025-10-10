// import { fetchApi } from "@/lib/fetchApi";
// import { cookies } from "next/headers";
// import { getProductsByProducerIdApi } from "@/api/productApi";
// import ProductsFromAdminListPage from "@/components/pages/adminPages/ProductsFromAdminListPage";

// export default async function ProductsFromAdmin({
//    params,
// }: {
//    params: Promise<{ slug: string }>;
// }) {

//    const token = (await cookies()).get("token")?.value;
//    const decodedSlug = decodeURIComponent((await params).slug);

//    const resProducts = await fetchApi(getProductsByProducerIdApi({ producerId: decodedSlug }, token));

//    return <ProductsFromAdminListPage products={resProducts.data || []} />;
// }
import ProductsFromAdminListPage from "@/components/pages/adminPages/listsPages/ProductsFromAdminListPage";

export default async function ProductsFromAdmin() {
   return <ProductsFromAdminListPage />;
}
