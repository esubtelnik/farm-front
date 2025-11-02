import { FC, useState } from "react";
import { IReadyBasket } from "@/types/entities/Product";
import routes from "@/constants/routes";
import Link from "next/link";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useStores } from "@/hooks/useStores";
import { DeleteReadyBasketRequest } from "@/types/requests/ProductRequests";
import Toast from "../ui/Toast";

interface BasketListItemProps {
   basket: IReadyBasket;
   refetch: () => void;
}

const BasketListItem: FC<BasketListItemProps> = ({ basket, refetch }) => {
   const { adminStore } = useStores();
   const [toast, setToast] = useState<{
      message: string;
      type: "success" | "error" | "warning";
   } | null>(null);

   const handleDeleteBasket = async () => {
      const payload: DeleteReadyBasketRequest = {
         basketId: basket.id,
      };
      const res = await adminStore.deleteReadyBasket(payload);
      if (res.success) {
         setToast({ message: "Корзина удалена", type: "success" });
         refetch();
      } else {
         setToast({
            message: res.message || "Произошла ошибка при удалении корзины",
            type: "error",
         });
      }
   };

   return (
      <div className={`admin-list-item`}>
         <div className="grid grid-cols-5 w-full gap-2 items-center justify-items-center">
            <h3>{basket.title}</h3>
            <p>{basket.price}</p>
            <p>{basket.overprice === 1001 ? "У продуктов базовые наценки" : basket.overprice}</p>
            <Link
               className="flex items-center gap-3"
               href={routes.admin.items.readyBasket(basket.id)}
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
            </Link>
            <button onClick={handleDeleteBasket}>
               <TrashIcon className="size-6 text-red-600 cursor-pointer" />
            </button>
            {/* <p className={`${showChangePrice ? "text-main-green" : ""}`}>
               {showChangePrice
                  ? Number(
                       product.basePrice -
                          (product.basePrice * product.discount) / 100 +
                          product.basePrice * (overprice / 100)
                    ).toFixed(2)
                  : price}
            </p> */}
            {/* <p className="flex items-center gap-3">
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
            </p> */}
         </div>
         {toast && (
            <Toast
               message={toast.message}
               type={toast.type}
               onClose={() => setToast(null)}
            />
         )}
      </div>
   );
};

export default BasketListItem;
