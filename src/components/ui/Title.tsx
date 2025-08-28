"use client";
import { FC } from "react";

interface TitleProps {
   title: string;
   className?: string;
}

const Title: FC<TitleProps> = ({ title, className="w-full" }) => {
   return (
      <div className={`md:py-10 py-5 md:pl-12 pl-4 ${className}`}>
         <h1 className="text-main-green font-bold md:text-4xl text-xl ">{title}</h1>
      </div>
   );
};

export default Title;
