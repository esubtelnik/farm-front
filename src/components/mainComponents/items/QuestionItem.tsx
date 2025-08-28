"use client";
import { FC } from "react";

interface QuestionItemProps {
   title: string;
   description: string;
   onClose: () => void;
}

const QuestionItem: FC<QuestionItemProps> = ({
   title,
   description,
   onClose,
}) => {
   return (
      <div
         className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 font-geist"
         onClick={onClose}
      >
         <div
            className="flex flex-col md:w-1/3 w-[90%] md:h-2/3 h-[80%] border-2 border-main-green rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
         >
            <h1 className="bg-main-green md:text-2xl text-xl text-white font-bold md:p-6 p-4 text-center">
               {title}
            </h1>
            <p
               className="bg-white md:p-8 p-4 text-main-gray grow text-base"
               dangerouslySetInnerHTML={{ __html: description }} 
            />

         </div>
      </div>
   );
};

export default QuestionItem;
