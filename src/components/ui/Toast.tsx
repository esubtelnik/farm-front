import React, { FC, useEffect } from "react";
import { Portal } from "@/components/ui/Portal";

interface ToastProps {
   message: string;
   type: "success" | "error" | "warning" | "info";
   onClose?: () => void;
   duration?: number | false;
}

const getIcon = (type: "success" | "error" | "warning" | "info") => {
   switch (type) {
      case "success":
         return (
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className="w-6 h-6"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
               />
            </svg>
         );
      case "error":
         return (
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className="w-6 h-6"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
               />
            </svg>
         );
      case "warning":
         return (
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className="w-6 h-6"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
               />
            </svg>
         );
      case "info":
         return (
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className="w-6 h-6"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
               />
            </svg>
         );
   }
};

const getColor = (type: "success" | "error" | "warning" | "info") => {
   switch (type) {
      case "success":
         return "bg-main-green";
      case "error":
         return "bg-red-500";
      case "warning":
         return "bg-yellow-500";
      case "info":
         return "bg-main-gray";
   }
};

const Toast: FC<ToastProps> = ({ message, type, onClose, duration = 3000 }) => {
   useEffect(() => {
      if (!onClose) return;

      if (duration) {
         const timer = setTimeout(() => {
            onClose();
         }, duration);
         return () => clearTimeout(timer);
      }

   }, [onClose, duration]);
   return (
      <Portal>
      <div
         className={`fixed bottom-1 right-1 z-[9999] ${getColor(
            type
         )} flex items-center gap-3 rounded-lg md:px-5 px-3 md:py-3 py-2 shadow-lg text-white`}
      >
         <span>{getIcon(type)}</span>
         <p className="font-medium">{message}</p>
         <button
            onClick={onClose}
            className="md:ml-3 ml-2 md:text-base text-sm text-white hover:text-gray-200"
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className="size-6"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
               />
            </svg>
         </button>
      </div>
      </Portal>
   );
};

export default Toast;
