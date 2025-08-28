"use client";  

import { FC, useState } from "react";
import { Questions } from "@/content/Questions";
import QuestionItem from "@/components/mainComponents/items/QuestionItem";


const QuestionList: FC = () => {
   const [selectedQuestion, setSelectedQuestion] = useState<null | typeof Questions[0]>(null);

   return (
      <div className="flex flex-col md:flex-row gap-y-4 justify-between md:p-12 p-4 mb-10 md:gap-x-16">
         {Questions.map((question, index) => (
            <div
               className="cursor-pointer bg-main-green w-full flex justify-center md:items-end items-center md:h-[500px] h-20 md:p-4 p-2 text-center uppercase text-white md:text-2xl text-sm font-bold rounded-2xl md:border-3 border-transparent hover:border-main-gray hover:shadow-sm/40 transition-all duration-200 "
               onClick={()=>setSelectedQuestion(question)}
               key={index}
            >
               {question.title}
            </div>
         ))}
         {selectedQuestion && <QuestionItem title={selectedQuestion.title} description={selectedQuestion.description} onClose={() => setSelectedQuestion(null)} />}
      </div>
   );
};

export default QuestionList;
