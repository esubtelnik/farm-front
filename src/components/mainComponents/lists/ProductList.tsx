"use client";
import { FC } from "react";
import ProductItem from "../items/ProductItem";
import { IProductCard } from "../../../types/entities/Product";
//import { observer } from "mobx-react-lite";
//import Loader from "../../helpers/Loader";

interface ProductListProps {
   products: IProductCard[];
   isEditable?: boolean;
   isLoading?: boolean;
   isError?: boolean;
   errorMessage?: string;
}

const ProductList: FC<ProductListProps> = ({ products, isEditable = false, isLoading = false, isError = false, errorMessage = "" }) => {
   
   if (isLoading) {
      return <div className="flex items-center justify-center h-[50vh]">
         {/* <Loader /> */}
      </div>;
   }
   if (isError) {
      return <div className="text-center text-main-gray ">{errorMessage}</div>;
   }
       
   return (
      <div className="grid grid-cols-3 gap-10 py-10 px-8 place-items-center">
         {products.map((product) => (
            <ProductItem key={product.id} product={product} isEditable={isEditable} />
            //<div key={product.id}>{product.title}</div>
         ))}
         {products.length === 0 && (
            <div className="col-span-3 text-center text-main-gray">
               <p>Продукты не найдены</p>
            </div>
         )}
      </div>
   );
};

export default ProductList;
