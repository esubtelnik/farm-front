"use client";
import { FC, useState } from "react";
import { IDisplayOrderCard } from "@/types/entities/Display";
import { formatDate } from "@/utils/MappingTypes";
import Image from "next/image";
import {
   ChevronDownIcon,
   ChevronUpIcon,
   ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { ICountedProduct } from "@/types/entities/Product";
import { OrderStatuses } from "@/constants/constants";

interface OrderListItemProps {
   order: IDisplayOrderCard;
   handleCloseOrder: (orderId: string) => void;
}

const OrderListItem: FC<OrderListItemProps> = ({ order, handleCloseOrder }) => {
   const [expandedBaskets, setExpandedBaskets] = useState<Set<string>>(
      new Set()
   );

   const totalAmount = order.items.reduce(
      (sum, item) => sum + item.price * item.amount,
      0
   );
   const totalItems = order.items.reduce((sum, item) => sum + item.amount, 0);

   const toggleBasket = (basketId: string) => {
      setExpandedBaskets((prev) => {
         const newSet = new Set(prev);
         if (newSet.has(basketId)) {
            newSet.delete(basketId);
         } else {
            newSet.add(basketId);
         }
         return newSet;
      });
   };

   const getStatusColor = (status: string) => {
      switch (status) {
         case OrderStatuses.COMPLETED:
            return "bg-green-100 text-green-700 border-green-200";
         case OrderStatuses.NOT_PAID:
            return "bg-red-100 text-red-700 border-red-200";
         case OrderStatuses.PAID:
            return "bg-blue-100 text-blue-700 border-blue-200";
         default:
            return "bg-gray-100 text-gray-700 border-gray-200";
      }
   };

   console.log(order.items);

   return (
      <div className="bg-white rounded-2xl shadow-sm border-2 border-main-gray overflow-hidden hover:shadow-md transition-shadow duration-300">
         <div className="bg-main-green/30 px-6 py-4 border-b-2 border-main-gray/20">
            <div className="flex items-center justify-between flex-wrap gap-3">
               <div className="flex items-center gap-3">
                  <div>
                     <h3 className="text-xl font-bold text-dark-gray">
                        Заказ №{order.id}
                     </h3>
                     <p className="text-sm text-dark-gray">
                        Счёт #{order.invoiceNo}
                     </p>
                     <p className="text-sm text-dark-gray">
                        Для покупателя: {order.customerFio}
                     </p>
                  </div>
               </div>
               <div className="flex flex-col items-center gap-2">
                  <div
                     className={`flex items-center w-full justify-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(
                        order.status
                     )}`}
                  >
                     <span className="font-semibold text-sm">
                        {order.status}
                     </span>
                  </div>
                  <button
                     onClick={() => {
                        if (order.status !== OrderStatuses.COMPLETED)
                           handleCloseOrder(order.id);
                     }}
                     className="font-semibold text-sm cursor-pointer px-4 py-2 rounded-full border bg-gray-100 text-gray-700 border-gray-200"
                  >
                     {order.status !== OrderStatuses.COMPLETED ? "Закрыть заказ" : "Заказ закрыт"}
                  </button>
               </div>
            </div>
         </div>

         <div className="px-6 py-4 bg-main-gray/10 border-b-2 border-main-gray/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="flex items-start gap-3">
                  <div>
                     <p className="text-xs text-dark-gray font-medium">
                        Дата доставки
                     </p>
                     <p className="text-sm font-semibold text-dark-gray">
                        {formatDate(order.nearestDelivery)}
                     </p>
                  </div>
               </div>
               <div className="flex items-start gap-3">
                  <div>
                     <p className="text-xs text-dark-gray font-medium">
                        Метод оплаты
                     </p>
                     <p className="text-sm font-semibold text-dark-gray">
                        {order.paymentMethod}
                     </p>
                  </div>
               </div>
               <div className="flex items-start gap-3">
                  <div>
                     <p className="text-xs text-dark-gray font-medium">
                        Телефон
                     </p>
                     <p className="text-sm font-semibold text-dark-gray">
                        {order.phoneNumber}
                     </p>
                  </div>
               </div>
               <div className="flex items-start gap-3">
                  <div>
                     <p className="text-xs text-dark-gray font-medium">
                        Адрес доставки
                     </p>
                     <p className="text-sm font-semibold text-dark-gray">
                        {order.address}
                     </p>
                  </div>
               </div>
            </div>
         </div>

         <div className="px-6 py-5">
            <div className="flex items-center justify-between mb-4">
               <h4 className="text-lg font-bold text-dark-gray flex items-center gap-2">
                  Товары в заказе
               </h4>
               <span className="text-sm text-dark-gray bg-main-gray/10 px-3 py-1 rounded-full font-medium">
                  {totalItems}{" "}
                  {totalItems === 1
                     ? "товар"
                     : totalItems < 5
                     ? "товара"
                     : "товаров"}
               </span>
            </div>

            <div className="space-y-3">
               {order.items.map((item) => (
                  <div key={item.id}>
                     <div
                        className={`flex items-center gap-4 p-4 bg-white border-2 border-main-gray rounded-xl hover:border-main-green hover:shadow-sm transition-all duration-200 ${
                           item.type === "basket" ? "cursor-pointer" : ""
                        }`}
                        onClick={() =>
                           item.type === "basket" && toggleBasket(item.id)
                        }
                     >
                        <div className="relative flex-shrink-0 w-20 h-20">
                           <Image
                              src={ `${process.env.NEXT_PUBLIC_IMAGE_URL}${item.image}`}
                              fill
                              alt={item.title}
                              className="object-cover rounded-lg bg-main-gray/10"
                           />
                           {item.type === "basket" && (
                              <div className="absolute -top-1 -right-1 bg-main-green text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                                 <ShoppingCartIcon className="w-3 h-3" />
                              </div>
                           )}
                        </div>

                        <div className="flex-1 min-w-0">
                           <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs bg-main-green/20 text-main-green px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                                 {item.type === "basket"
                                    ? "Готовая корзина"
                                    : "Товар"}
                              </span>

                              <h5 className="font-semibold text-dark-gray text-sm truncate">
                                 {item.title}
                              </h5>
                           </div>
                           {item.type === "product" && item.producerName && (
                              <p className="text-xs text-dark-gray mb-1">
                                 Производитель: {item.producerName}
                              </p>
                           )}
                           <div className="flex items-center gap-2 flex-wrap">
                              {item.type === "product" && item.volume && (
                                 <span className="text-xs text-dark-gray bg-main-gray/10 px-2 py-1 rounded">
                                    {item.volume} {item.unit}
                                 </span>
                              )}
                              {item.type === "basket" && (
                                 <span className="text-xs text-dark-gray bg-main-gray/10 px-2 py-1 rounded flex items-center gap-1">
                                    Нажмите для просмотра
                                 </span>
                              )}
                           </div>
                        </div>

                        <div className="text-right flex-shrink-0 flex items-center gap-3">
                           <div>
                              {item.type === "product" && (
                                 <div className="text-xs text-dark-gray">
                                    Базовая цена продавца: {item.basePrice} ×{" "}
                                    {item.amount} ={" "}
                                    {item.basePrice * item.amount} р.
                                 </div>
                              )}

                              <div className="text-lg font-bold text-main-green">
                                 Конечная цена: {item.price} р.
                              </div>
                           </div>
                           {item.type === "basket" && (
                              <div className="text-dark-gray">
                                 {expandedBaskets.has(item.id) ? (
                                    <ChevronUpIcon className="w-5 h-5" />
                                 ) : (
                                    <ChevronDownIcon className="w-5 h-5" />
                                 )}
                              </div>
                           )}
                        </div>
                     </div>

                     {item.type === "basket" &&
                        expandedBaskets.has(item.id) &&
                        item.products && (
                           <div className="mt-2 ml-8 space-y-2 border-l-2 border-main-green/30 pl-4">
                              {item.products.map(
                                 (basketItem: ICountedProduct) => (
                                    <div
                                       key={basketItem.id}
                                       className="flex items-center gap-3 p-3 bg-main-green/5 border border-main-green/20 rounded-lg"
                                    >
                                       <div className="relative flex-shrink-0 w-14 h-14">
                                          <Image
                                             src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${basketItem.images[0]}`}
                                             fill
                                             alt={basketItem.title}
                                             className="object-cover rounded-lg bg-white"
                                          />
                                       </div>

                                       <div className="flex-1 min-w-0">
                                          <h6 className="font-medium text-dark-gray text-xs truncate mb-0.5">
                                             {basketItem.title}
                                          </h6>

                                          {basketItem.volume && (
                                             <span className="text-xs text-dark-gray bg-white px-2 py-0.5 rounded mt-1 inline-block">
                                                {basketItem.volume}{" "}
                                                {basketItem.unit}
                                             </span>
                                          )}
                                       </div>

                                       {/* <div className="text-right flex-shrink-0">
                                          <p className="text-xs text-dark-gray">
                                             {basketItem.price} р. ×{" "}
                                             {basketItem.amount || 1}
                                          </p>
                                          <p className="text-sm font-bold text-main-green">
                                             {basketItem.price *
                                                (basketItem.amount || 1)}{" "}
                                             р.
                                          </p>
                                       </div> */}
                                    </div>
                                 )
                              )}
                           </div>
                        )}
                  </div>
               ))}
            </div>
         </div>

         <div className="px-6 py-4 bg-main-green/10 border-t-2 border-main-gray/20">
            <div className="flex items-center justify-between">
               <span className="text-lg font-bold text-dark-gray">Итого:</span>
               <span className="text-2xl font-bold text-main-green">
                  {totalAmount} р.
               </span>
            </div>
         </div>
      </div>
   );
};

export default OrderListItem;
