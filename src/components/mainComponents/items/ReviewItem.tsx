"use client";
import { FC, useState } from "react";
import ReviewStars from "@/components/ui/ReviewStars";
import { IReview } from "@/types/entities/Review";
import ReviewModal from "@/components/ui/modals/modalContents/ReviewModal";
import { Modal } from "@/components/ui/modals/Modal";

interface ReviewItemProps {
   review: IReview;
}

const ReviewItem: FC<ReviewItemProps> = ({ review }) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <>
         {isOpen && (
            <Modal
               isOpen={isOpen}
               onClose={() => setIsOpen(false)}
               showCloseButton={true}
               size="w-full md:w-2/3 lg:w-1/2 h-fit"
               className="p-3"
            >
                <ReviewModal review={review} />
            </Modal>
         )}
         <div
            className="flex flex-col gap-y-2 drop-shadow-md/40 bg-white p-5 rounded-md "
            onClick={() => setIsOpen(true)}
         >
            <div className="flex items-center gap-x-2">
               <div className="flex flex-col md:h-full gap-y-2">
                  <span className="text-base font-bold text-main-green md:h-12 h-6">
                     {review.customerName}
                  </span>
                  <ReviewStars rating={review.value} />
                  <p className="text-sm text-main-gray overflow-y-auto hide-scrollbar md:h-36 h-14">
                     {review.content}
                  </p>
               </div>
            </div>
         </div>
      </>
   );
};

export default ReviewItem;
