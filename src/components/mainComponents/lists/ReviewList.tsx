"use client";
import { FC, useEffect, useState } from "react";
import ReviewItem from "@/components/mainComponents/items/ReviewItem";
import AddReview from "@/components/ui/buttons/AddReview";
import { IReview } from "@/types/entities/Review";
import Skeleton from "@/components/ui/Skeleton";

interface ReviewListProps {
   reviews: IReview[];
   isLoading?: boolean;
   isAddReview?: boolean;
   handleAddReview?: (
      rating: number,
      comment: string
   ) => Promise<{ success: boolean; review: IReview | null; message: string }>;
}

const ReviewList: FC<ReviewListProps> = ({
   reviews,
   isLoading = false,
   isAddReview = true,
   handleAddReview,
}) => {
   const [reviewAmount, setReviewAmount] = useState(reviews.length);

   useEffect(() => {
      setReviewAmount(reviews.length);
   }, [reviews.length]);

   return (
      <div className="flex flex-col md:grid lg:grid-cols-6 md:gap-10 gap-y-5 ">
         {isLoading ? (
            <>
               {Array.from({ length: reviewAmount + 1 }).map((_, index) => (
                  <Skeleton key={index} className="w-full h-[280px]" />
               ))}
            </>
         ) : (
            reviews.map((review, index) => (
               <ReviewItem key={index + review.customerId} review={review} />
            ))
         )}
         {isAddReview && handleAddReview && (
            <AddReview handleAddReview={handleAddReview} />
         )}
      </div>
   );
};

export default ReviewList;
