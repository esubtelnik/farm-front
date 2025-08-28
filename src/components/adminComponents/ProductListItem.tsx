"use client";

import { FC, useEffect, useState } from "react";
import { IProductCard } from "@/types/entities/Product";
import { useStores } from "@/hooks/useStores";

interface ProductListItemProps {
   product: IProductCard;
}

const ProductListItem: FC<ProductListItemProps> = ({ product }) => {
   const [isEdit, setIsEdit] = useState(false);
   const [overprice, setOverprice] = useState(product.overprice);
   const [price, setPrice] = useState<number>(product.price);
   const [showChangePrice, setShowChangePrice] = useState(false);
   const { adminStore } = useStores();

   const handleChangeProductOverprice = async () => {
      if (overprice !== product.overprice) {
         const res = await adminStore.changeProductOverprice({
            productId: product.id,
            overprice: overprice,
         });
         if (res.success) {
            setIsEdit(false);
            setShowChangePrice(false);
            setOverprice(overprice);
            setPrice(product.basePrice -
               (product.basePrice * product.discount) / 100 +
               product.basePrice * (overprice / 100));
         }
      }
   };

   useEffect(() => {
      if (overprice === product.overprice && !isEdit) {
         setShowChangePrice(false);
      } else {
         setShowChangePrice(true);
      }
   }, [overprice, product.overprice, isEdit]);

   return (
      <div className={`admin-list-item`}>
         <div className="grid grid-cols-5 w-full gap-2 items-center justify-items-center">
            <h3>{product.title}</h3>
            <p>{product.basePrice}</p>
            <p>{product.discount}%</p>
            <p className={`${showChangePrice ? "text-main-green" : ""}`}>
               {showChangePrice
                  ? Number(
                       product.basePrice -
                          (product.basePrice * product.discount) / 100 +
                          product.basePrice * (overprice / 100)
                    ).toFixed(2)
                  : price}
            </p>
            <p className="flex items-center gap-3">
               {isEdit ? (
                  <input
                     type="number"
                     className="outline-none w-12"
                     placeholder=""
                     value={overprice}
                     onChange={(e) => setOverprice(Number(e.target.value))}
                     readOnly={!isEdit}
                  />
               ) : (
                  <>{overprice}%</>
               )}

               {isEdit ? (
                  <>
                     <button
                        onClick={() => {
                           setIsEdit(false);
                           setOverprice(product.overprice);
                           setPrice(product.price);
                        }}
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={1.5}
                           stroke="currentColor"
                           className="size-6"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                           />
                        </svg>
                     </button>
                     <button onClick={handleChangeProductOverprice}>
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={1.5}
                           stroke="currentColor"
                           className="size-6"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m4.5 12.75 6 6 9-13.5"
                           />
                        </svg>
                     </button>
                  </>
               ) : (
                  <button
                     className="flex items-center gap-3"
                     onClick={() => setIsEdit(!isEdit)}
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                     </svg>
                  </button>
               )}
            </p>
         </div>
      </div>
   );
};

export default ProductListItem;
