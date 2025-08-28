"use client";
import { FC, useState } from "react";
import ReviewStars from "@/components/ui/ReviewStars";
import Textarea from "@/components/ui/Textarea";
import { IReview } from "@/types/entities/Review";

interface AddReviewModalProps {
   handleAddReview: (
      rating: number,
      comment: string
   ) => Promise<{ success: boolean; review: IReview | null; message: string }>;
   onClose: () => void;
}

interface FormState {
   values: {
      rating: number;
      comment: string;
   };
   errors: {
      rating: string | null;
      comment: string | null;
   };
}

const AddReviewModal: FC<AddReviewModalProps> = ({
   handleAddReview,
   onClose,
}) => {
   const [form, setForm] = useState<FormState>({
      values: {
         rating: 0,
         comment: "",
      },
      errors: {
         rating: null,
         comment: null,
      },
   });

   const handleChange = <K extends keyof FormState["values"]>(
      field: K,
      value: FormState["values"][K]
   ) => {
      setForm((prev) => ({
         ...prev,
         values: {
            ...prev.values,
            [field]: value,
         },
         errors: {
            ...prev.errors,
            [field]: null,
         },
      }));
   };

   const validateForm = () => {
      const newErrors: FormState["errors"] = {
         rating: null,
         comment: null,
      };

      if (!form.values.rating || form.values.rating === 0) {
         newErrors.rating = "Поставьте оценку";
      }

      if (!form.values.comment || form.values.comment.trim() === "") {
         newErrors.comment = "Напишите свой отзыв";
      }

      setForm((prev) => ({
         ...prev,
         errors: newErrors,
      }));

      return Object.values(newErrors).some((error) => error !== null);
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const hasErrors = validateForm();

      if (hasErrors) return;

         const response = await handleAddReview(
            form.values.rating,
            form.values.comment
         );
         if (response.success) {
            setForm((prev) => ({
               ...prev,
               values: {
                  ...prev.values,
                  rating: 0,
                  comment: "",
               },
            }));
            onClose();
         } else {
            alert(response.message);
            onClose();
      }
   };

   return (
      <div className="bg-white h-full p-5 gap-y-8 flex flex-col font-geist">
         <h1 className="text-2xl font-bold text-main-gray">
            Оставьте свой отзыв
         </h1>
         <div className="flex items-center gap-x-4">
            <span className={`${form.errors.rating ? "text-red-500" : "text-main-gray"}`}>Поставьте оценку</span>
            <ReviewStars
               rating={form.values.rating}
               setRating={(value: number) => handleChange("rating", value)}
            />
         </div>
         <div className="flex flex-grow h-full">
            <Textarea
               placeholder="Напишите свой отзыв"
               value={form.values.comment}
               onChange={(value: string) => handleChange("comment", value)}
               error={form.errors.comment}
            />
         </div>

         <button
            onClick={handleSubmit}
            className="bg-main-green font-semibold text-sm text-white px-4 py-2 rounded-full cursor-pointer w-fit"
         >
            ОТПРАВИТЬ
         </button>
      </div>
   );
};

export default AddReviewModal;
