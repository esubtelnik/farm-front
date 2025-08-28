import { FC, useState } from "react";
import { Modal } from "@/components/ui/modals/Modal";
import { IReview } from "@/types/entities/Review";
import { useAuthContext } from "@/context/AuthContext";
import { UserType } from "@/constants/UserTypeEnum";
import LoginModal from "@/components/ui/modals/modalContents/LoginModal";
import AddReviewModal from "@/components/ui/modals/modalContents/AddReviewModal";

interface AddReviewProps {
   handleAddReview: (rating: number, comment: string) => Promise<{success: boolean, review: IReview | null, message: string}>;
}

const AddReview: FC<AddReviewProps> = ({ handleAddReview }) => {
   const { userType } = useAuthContext();

   const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);
   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

   
   const handleCheckUserType = () => {
      if (userType === UserType.CUSTOMER) {
         setIsAddReviewModalOpen(true);
      } else {
         setIsAddReviewModalOpen(false);
         setIsLoginModalOpen(true);
      }
   }


   return (
      <>
         {isAddReviewModalOpen && (
            <Modal
               isOpen={isAddReviewModalOpen}
               onClose={() => setIsAddReviewModalOpen(false)}
               showCloseButton={true}
               size="w-xl h-xl"
            >
               <AddReviewModal handleAddReview={handleAddReview} onClose={() => setIsAddReviewModalOpen(false)} />
            </Modal>
         )}
         <button
            onClick={() => handleCheckUserType()}
            className="group min-h-20 flex flex-col items-center justify-center w-full h-full border-2 border-main-gray text-main-gray rounded-md cursor-pointer gap-y-2"
         >
            <span className="text-base font-bold transition-transform duration-200 group-hover:scale-115">
               Добавить отзыв
            </span>
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={2}
               stroke="currentColor"
               className="size-6 transition-transform duration-200 group-hover:scale-135"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
               />
            </svg>
         </button>
         {isLoginModalOpen && (
            <Modal
               isOpen={isLoginModalOpen}
               onClose={() => setIsLoginModalOpen(false)}
               showCloseButton={true}
               size="w-xl h-xl"
            >
               <LoginModal />
            </Modal>
         )}
      </>
   );
};

export default AddReview;
