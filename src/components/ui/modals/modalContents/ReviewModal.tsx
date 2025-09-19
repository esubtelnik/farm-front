"use client";
import { IReview } from "@/types/entities/Review";
import React, { FC } from "react";
import ReviewStars from "../../ReviewStars";

interface ReviewItemProps {
   review: IReview;
}

const ReviewModal: FC<ReviewItemProps> = ({ review }) => {
   return (

         <div className="flex items-center gap-x-2 p-3 md:p-5">
            <div className="flex flex-col md:h-full gap-y-2">
               <span className="text-base font-bold text-main-green md:h-12 h-6">
                  {review.customerName}
               </span>
               <ReviewStars rating={review.value} />
               <p className="text-sm text-main-gray overflow-y-auto md:h-52 h-36">
                  {review.content}
                    </p>
            </div>
         </div>
  
   );
};

export default ReviewModal;
