"use client";

import { useStores } from "@/hooks/useStores";
import { IProductCard } from "@/types/entities/Product";
import { FC, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductListItem from "@/components/adminComponents/ProductListItem";

const ProductsFromAdminListPage: FC = () => {
   const [products, setProducts] = useState<IProductCard[]>([]);
   const { adminStore } = useStores();
   const params = useParams();

   useEffect(() => {
      const fetchProducts = async () => {
         const res = await adminStore.getProductsFromAdmin(
            params.slug as string
         );
         if (res.success) {
            setProducts(res.data || []);
         }
      };

      fetchProducts();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   return (
      <div className="flex flex-col gap-4 p-4">
         <div className="grid grid-cols-5 w-full items-center justify-items-center p-4 border-2 rounded-full border-main-gray sticky top-0 bg-white z-10">
            <p>Название</p>
            <p>Цена производителя</p>
            <p>Скидка продавца</p>
            <p>Окончательная цена</p>
            <p>Процент наценки платформы</p>
         </div>
         <div className="flex flex-col gap-4 overflow-y-auto ">
            {products.map((product) => (
               <ProductListItem key={product.id} product={product} />
            ))}
         </div>
      </div>
   );
};

export default ProductsFromAdminListPage;
