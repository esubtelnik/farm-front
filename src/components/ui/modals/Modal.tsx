"use client";
import React, { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Portal } from "@/components/ui/Portal";

interface ModalProps {
   isOpen: boolean;
   onClose: () => void;
   children: ReactNode;
   className?: string;
   backgroundColor?: string;
   position?: string;
   title?: string;
   size?: string;
   showCloseButton?: boolean;
   closeOnOverlayClick?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
   isOpen,
   onClose,
   children,
   position = "flex items-center justify-center",
   className = "shadow-xl",
   backgroundColor = "bg-black/40",
   size,
   title,
   showCloseButton = true,
   closeOnOverlayClick = true,
}) => {
   useEffect(() => {
      const onKeyDown = (e: KeyboardEvent) => {
         if (e.key === "Escape") onClose();
      };
      if (isOpen) document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
   }, [isOpen, onClose]);

   return (
      <AnimatePresence>
         {isOpen && (
            <Portal>
               <motion.div
                  className={`fixed inset-0 z-[1000] ${position} ${backgroundColor}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={(e) => {
                     e.stopPropagation();
                     if (closeOnOverlayClick) onClose();
                  }}
               >
                  <motion.div
                     className={`bg-white rounded-2xl p-2 relative ${size} ${className} pointer-events-auto`}
                     initial={{ scale: 0.95, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     exit={{ scale: 0.95, opacity: 0 }}
                     transition={{ duration: 0.2 }}
                     onClick={(e) => e.stopPropagation()}
                  >
                     {showCloseButton && (
                        <button
                           onClick={onClose}
                           className="absolute top-4 right-4 text-main-gray cursor-pointer hover:scale-110 transition-all duration-100"
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
                                 d="M6 18 18 6M6 6l12 12"
                              />
                           </svg>
                        </button>
                     )}
                     {title && (
                        <h2 className="text-xl font-semibold mb-4">{title}</h2>
                     )}
                     <div>{children}</div>
                  </motion.div>
               </motion.div>
            </Portal>
         )}
      </AnimatePresence>
   );
};
