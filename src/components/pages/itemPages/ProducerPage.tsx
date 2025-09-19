"use client";
import { FC, useRef, useState } from "react";

import ProductList from "@/components/mainComponents/lists/ProductList";
import Tabs, { TabsHandle } from "@/components/ui/Tabs";
import ReviewList from "@/components/mainComponents/lists/ReviewList";
import GalleryList from "@/components/mainComponents/lists/GalleryList";
import ProducerInfoCustomerView from "@/components/profileComponents/ProducerInfoCustomerView";
import { IProducer } from "@/types/entities/User";
import { IProductCard } from "@/types/entities/Product";
import { IReview } from "@/types/entities/Review";
import { AddProducerReviewRequest } from "@/types/requests/ProducerRequests";
import { getCookie } from "cookies-next";
import { addProducerReviewApi } from "@/api/producerApi";
import { fetchApi } from "@/lib/fetchApi";

interface ProducerPageProps {
   producer: IProducer;
   products: IProductCard[];
   gallery: string[];
   certificates: string[];
   isLoading?: boolean;
}


const ProducerPage: FC<ProducerPageProps> = ({ producer, products, gallery, certificates, isLoading = false }) => {

   const [producerData, setProducerData] = useState<IProducer>(producer);
   const [isReviewLoading, setIsReviewLoading] = useState(false);
   const tabsRef = useRef<TabsHandle>(null);
   const handleAddReview = async (
      rating: number,
      comment: string
   ): Promise<{
      success: boolean;
      review: IReview | null;
      message: string;
   }> => {
      setIsReviewLoading(true);
      const payload: AddProducerReviewRequest = {
         producerId: producer.id,
         value: rating,
         content: comment,
      };

      const token = await getCookie("token");

      const response = await fetchApi(addProducerReviewApi(payload, token));

      if (response.success && response.data) {
         const updatedFeedback = [response.data, ...(producer?.feedback ?? [])];
         const updatedProducer: IProducer = {
            ...producer!,
            feedback: updatedFeedback,
            feedbackAv: updatedFeedback.reduce((acc, review) => acc + review.value, 0) / updatedFeedback.length,
         };
         setProducerData(updatedProducer);
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

   const tabItems = [
      {
         label: "Каталог",
         render: () => (
            <div className="py-5">
               <ProductList products={products} isLoading={isLoading} />
            </div>
         ),
      },
      {
         label: "Галерея",
         render: () => (
            <div className="py-5">
               <GalleryList
                  images={gallery}
                  isEditable={false}
                  isLoading={isLoading}
               />
            </div>
         ),
      },
      {
         label: "Сертификаты",
         render: () => (
            <div className="py-5">
               <GalleryList
                  images={certificates}
                  isEditable={false}
                  isLoading={isLoading}
               />
            </div>
         ),
      },
      {
         label: "Отзывы",
         render: () => (
            <div className="py-5">
               <ReviewList
                  reviews={producerData?.feedback ?? []}
                  isLoading={isReviewLoading}
                  isAddReview={true}
                  handleAddReview={handleAddReview}
               />
            </div>
         ),
      },
   ];
   return (
      <div className="min-h-screen font-geist">
         <ProducerInfoCustomerView goToReviews={() => tabsRef.current?.goToTab(3)} producer={producerData} isLoading={isLoading} />
         <Tabs tabs={tabItems} ref={tabsRef} />
      </div>
   );
};

export default ProducerPage;
