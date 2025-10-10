"use client";
import { FC, useState } from "react";
import AddToFavourite from "@/components/ui/buttons/AddToFavourite";
import ReviewStars from "@/components/ui/ReviewStars";
import AddToCart from "@/components/ui/buttons/AddToCart";
import { IProduct } from "@/types/entities/Product";
import Skeleton from "@/components/ui/Skeleton";
import ReviewList from "@/components/mainComponents/lists/ReviewList";
import { AddReviewRequest } from "@/types/requests/ProductRequests";
import { IReview } from "@/types/entities/Review";
import ProducerItem from "@/components/mainComponents/items/ProducerItem";
import { IProducer } from "@/types/entities/User";
import { fetchApi } from "@/lib/fetchApi";
import { addReviewApi } from "@/api/productApi";
import { getCookie } from "cookies-next";
import { mapToDisplayCard } from "@/utils/MappingTypes";
import PhotoViewer from "@/components/ui/PhotoViewer";
import Link from "next/link";
import routes from "@/constants/routes";

interface ProductPageProps {
   product: IProduct;
   productProducer: IProducer;
   isLoading?: boolean;
}

const ProductPage: FC<ProductPageProps> = ({
   product,
   productProducer,
   isLoading = false,
}) => {
   const [isReviewLoading, setIsReviewLoading] = useState(false);

   const [isReviewsOpen, setIsReviewsOpen] = useState(false);

   const [isInFavourites, setIsInFavourites] = useState(product.isInFavourites);
   const [isInCart, setIsInCart] = useState(product.isInCart);

   const handleAddReview = async (
      rating: number,
      comment: string
   ): Promise<{
      success: boolean;
      review: IReview | null;
      message: string;
   }> => {
      setIsReviewLoading(true);
      const token = await getCookie("token");
      const payload: AddReviewRequest = {
         productId: product.id,
         value: rating,
         content: comment,
      };
      const response = await fetchApi(addReviewApi(payload, token));
      if (response.success && response.data) {
         product?.feedback.unshift(response.data);
         product!.feedbackAv =
            product!.feedback.reduce((acc, review) => acc + review.value, 0) /
               product!.feedback.length || 0;
         // setProduct(product);
         setIsReviewLoading(false);
         return {
            success: true,
            review: response.data,
            message: response.message || "Отзыв успешно добавлен",
         };
      } else {
         setIsReviewLoading(false);
         return {
            success: false,
            review: null,
            message: response.message || "Ошибка при добавлении отзыва",
         };
      }
   };

   if (isLoading || !product) {
      return (
         <div className="flex flex-col h-fit">
            <div className="flex gap-x-10 p-6">
               <Skeleton className="size-96 rounded-2xl" />
               <div className="flex flex-col gap-y-2 relative flex-1">
                  <Skeleton className="w-24 h-8" />
                  <Skeleton className="w-24 h-6" />
                  <Skeleton className="w-40 h-6" />

                  <div className="h-full w-2/3 space-y-5">
                     <Skeleton className="w-full h-14" />
                     <Skeleton className="w-full h-14" />
                     <Skeleton className="w-full h-14" />
                  </div>
               </div>
            </div>

            <div className="flex bg-main-green/30 items-center h-52 justify-between "></div>

            <div className="flex items-center justify-between p-6">
               <Skeleton className="w-40 h-10" />
               <Skeleton className="w-10 h-10 rounded-full" />
            </div>
         </div>
      );
   }

   return (
      <div className="h-fit">
         <div className="flex flex-col md:flex-row gap-x-10 md:p-6 ">
            <div className="relative w-full aspect-square md:w-96 md:h-96">
               {/* <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${product.images}`}
                  alt={product.title}
                  fill
                  className="object-cover md:rounded-2xl"
                  unoptimized
               /> */}
               <PhotoViewer images={product.images} />

               <div className="hidden md:block absolute z-10 top-0 right-0 p-5">
                  <AddToFavourite
                     isInFavourites={isInFavourites}
                     product={mapToDisplayCard(product)}
                     onToggle={(newState: boolean) => {
                        setIsInFavourites(newState);
                     }}
                  />
               </div>
            </div>
            <div className="flex flex-col p-3 md:p-0 md:gap-y-4 relative">
               <div className="flex items-center justify-between">
               <span className="text-main-green font-bold lg:text-3xl text-2xl">
                  {product.title}
                  
               </span>
               <div className="md:hidden my-4 flex gap-x-2">
                     <div className="">
                        <AddToFavourite
                           isInFavourites={isInFavourites}
                           product={mapToDisplayCard(product)}
                           onToggle={(newState: boolean) => {
                              setIsInFavourites(newState);
                           }}
                        />
                     </div>
                     <div className="">
                        <AddToCart
                           isInCart={isInCart}
                           product={mapToDisplayCard(product)}
                           onToggle={(newState: boolean) => {
                              setIsInCart(newState);
                           }}
                        />
                     </div>
                  </div>
               </div>
                  <Link className="block text-main-gray lg:text-base text-sm hover:text-main-green transition-all duration-200" href={`${routes.items.producer(product.producerId)}`}>
                     От фермера: {product.producerName}
                  </Link>
              
               <div className="flex items-center justify-between my-7 md:my-0">
                  <div className="md:hidden ">
                     <span className="font-bold text-main-green text-lg">
                        {product.price} руб.
                     </span>{" "}
                     <span className="text-main-gray text-base ">
                        /{product.saleVolume} {product.unit}
                     </span>
                  </div>
                  <div className="flex items-center gap-x-4">
                     <ReviewStars rating={product.feedbackAv} size="large" />
                     <button
                        className="text-main-gray text-sm flex items-center justify-center cursor-pointer"
                        onClick={() => setIsReviewsOpen(!isReviewsOpen)}
                     >
                        Отзывы
                     </button>
                  </div>
               </div>
               <div className="text-main-gray space-y-5">
                  <p>
                     <span className="font-bold">Состав: </span>
                     {product.composition}
                  </p>
                  <p>
                     <span className="font-bold">Описание: </span>
                     {product.description}
                  </p>
                  {/* <p>
                     <span className="font-bold">Время доставки: </span>
                     {product.delivery}
                  </p> */}
               </div>
            </div>
         </div>
         {isReviewsOpen ? (
            <div className="px-6 space-y-5">
               <button
                  className="group text-main-gray flex items-center justify-center cursor-pointer gap-x-3"
                  onClick={() => setIsReviewsOpen(false)}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={2}
                     stroke="currentColor"
                     className="size-10 text-main-green border-2 border-transparent group-hover:border-dark-green group-hover:text-dark-green rounded-full p-1 transition-all duration-200"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5 8.25 12l7.5-7.5"
                     />
                  </svg>
                  <span className="text-main-green font-bold text-xl decoration-main-green underline p-1">
                     Отзывы
                  </span>
               </button>
               <ReviewList
                  isLoading={isReviewLoading}
                  reviews={product.feedback}
                  isAddReview={true}
                  handleAddReview={handleAddReview}
               />
            </div>
         ) : (
            <div className="flex flex-col md:flex-row bg-main-green/30 md:items-center gap-y-5 justify-between md:p-6 p-3">
               <div className="text-main-gray space-y-5">
                  {/* <p>
                  <span className="font-bold">Пищевая ценность: </span>
                  инфо
               </p> */}
                  <p>
                     <span className="font-bold">Срок годности: </span>
                     {product.expirationDate}
                  </p>
                  <p>
                     <span className="font-bold">Условия хранения: </span>
                     {product.storageConditions}
                  </p>
                  <p>
                     <span className="font-bold">Объем: </span>
                     {product.volume} {product.unit}
                  </p>
                  <p>
                     <span className="font-bold">Упаковка: </span>
                     {product.package}
                  </p>
               </div>
               <ProducerItem
                  styleType="small"
                  producer={productProducer as IProducer}
               />
            </div>
         )}
         <div className="md:flex hidden items-center justify-between p-6">
            <div className="mb-3">
               <span className="font-bold text-main-green text-lg">
                  {product.price} руб.
               </span>{" "}
               <span className="text-main-gray text-base ">
                  /{product.saleVolume} {product.unit}
               </span>
            </div>

            <AddToCart
               isInCart={isInCart}
               product={mapToDisplayCard(product)}
               onToggle={(newState: boolean) => {
                  setIsInCart(newState);
               }}
            />
         </div>
      </div>
   );
};

export default ProductPage;
