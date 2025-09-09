"use client";
import { FC, useEffect, useState } from "react";
import LogoWhite from "@/assets/logos/LogoWhite.svg";
import Cart from "@/assets/icons/Basket.svg";
import UserCircleIcon from "@/assets/icons/UserCircleIcon.svg";

import NavItem from "@/components/ui/NavItem";
import { NavLinks } from "@/content/Navigation";
import { UserTypeValue } from "@/types/entities/User";
import { UserType } from "@/constants/UserTypeEnum";
import { useRouter } from "next/navigation";
import routes from "@/constants/routes";

const AccountButton: FC<{
   onClick: () => void;
   label: string;
   className?: string;
}> = ({ onClick, label, className = "" }) => (
   <button
      onClick={onClick}
      className={`flex font-semibold text-sm gap-x-3 items-center text-main-green bg-white rounded-full py-2 px-4 hover:drop-shadow-md hover:shadow-md ${className}`}
   >
      <span>{label}</span>
      <UserCircleIcon className="w-full h-full" />
   </button>
);

const CartButton: FC<{ onClick?: () => void; className?: string }> = ({
   onClick,
   className = "",
}) => (
   <button
      onClick={onClick}
      className={`border-2 border-white hover:border-4 transition-all rounded-full p-1 text-white size-12 ${className}`}
   >
      <Cart className="w-full h-full" />
   </button>
);

const Navbar: FC<{
   userType: UserTypeValue;
   // isUserTypeLoading?: boolean;
}> = ({ userType }) => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const router = useRouter();
   // const isUserDataReady = !isUserTypeLoading && userType !== null;
   const isGuest = userType === UserType.GUEST;

   useEffect(() => {
      if (isMenuOpen) {
         // Блокируем скролл только для body, но не для самого меню
         document.body.style.overflow = "hidden";
      } else {
         document.body.style.overflow = "";
      }

      return () => {
         document.body.style.overflow = "";
      };
   }, [isMenuOpen]);

   const handleAccount = () => {
      switch (userType.type) {
         case UserType.GUEST.type:
            router.push(routes.auth.login);
            console.log("GUEST");
            break;
         case UserType.CUSTOMER.type:
            router.push(routes.users.profile);
            break;
         case UserType.PRODUCER.type:
            router.push(routes.users.profile);
            break;
         case UserType.COURIER.type:
            router.push(routes.users.courier.profile);
            break;
         case UserType.ADMIN.type:
            router.push(routes.admin.root);
            break;
         default:
            break;
      }
      setIsMenuOpen(false);
   };

   const handleCart = () => {
      if (userType.type === UserType.CUSTOMER.type) {
         router.push(routes.users.customer.cart);
         setIsMenuOpen(false);
      }
      if (userType.type === UserType.GUEST.type) {
         router.push(routes.auth.login);
      }
   };

   return (
      <>
         <nav className="sticky top-0 z-20 flex w-full items-center justify-between bg-main-green dark:bg-dark h-18 py-3 px-4 md:px-20 font-geist">
            <div className="h-full order-2 lg:order-0 flex items-center gap-x-3">
               {userType.type === UserType.ADMIN.type && (
                  <button onClick={() => router.back()}>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="size-10 text-white hover:scale-115 transition-all cursor-pointer"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M15.75 19.5 8.25 12l7.5-7.5"
                        />
                     </svg>
                  </button>
               )}
               <button className="w-full h-full cursor-pointer" onClick={() => router.push(routes.home.root)}>
               <LogoWhite className="w-full h-full" />
               </button>
            </div>

            {/* {isUserDataReady && ( */}
            <>
               <div className="hidden lg:flex gap-x-5 items-center">
                  {userType.type !== UserType.PRODUCER.type &&
                  userType.type !== UserType.COURIER.type &&
                  userType.type !== UserType.ADMIN.type ? (
                     <>
                        {NavLinks.map((link, index) => (
                           <NavItem key={index} link={link} />
                        ))}
                        <CartButton onClick={handleCart} />
                        <AccountButton
                           onClick={handleAccount}
                           label={isGuest ? "ВОЙТИ" : "ПРОФИЛЬ"}
                        />
                     </>
                  ) : (
                     <AccountButton onClick={handleAccount} label="ПРОФИЛЬ" />
                  )}
               </div>

               {userType.type !== UserType.PRODUCER.type &&
               userType.type !== UserType.COURIER.type &&
               userType.type !== UserType.ADMIN.type ? (
                  <button
                     className="lg:hidden flex items-center"
                     onClick={() => setIsMenuOpen(true)}
                     aria-label="Open menu"
                  >
                     <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M4 6h16M4 12h16M4 18h16"
                        />
                     </svg>
                  </button>
               ) : (
                  <AccountButton
                     onClick={handleAccount}
                     label="ПРОФИЛЬ"
                     className="md:hidden md:order-0 order-2 self-start"
                  />
               )}
            </>
            {/* )} */}
         </nav>

         {isMenuOpen && (
            <>
               <div
                  className="fixed inset-0 z-40 bg-black/50 overflow-hidden min-h-dvh h-dvh max-h-dvh"
                 
                  onClick={() => setIsMenuOpen(false)}
               />

               <div className="fixed top-0 left-0 h-dvh max-h-dvh w-3/4 max-w-xs bg-main-green z-50 px-4 py-8 flex flex-col overflow-y-auto">
                 
                  <div className="flex items-center justify-between mb-4">
                     <h1 className="text-white text-2xl font-bold font-geist">
                        Farm-Basket
                     </h1>
                     <button
                        onClick={() => setIsMenuOpen(false)}
                        aria-label="Close menu"
                     >
                        <svg
                           className="w-6 h-6 text-white"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                           />
                        </svg>
                     </button>
                  </div>
                  <nav className="flex flex-col gap-y-6">
                     {NavLinks.map((link, index) => (
                        <NavItem
                           key={index}
                           link={link}
                           onClick={() => setIsMenuOpen(false)}
                        />
                     ))}
                     <CartButton onClick={handleCart} className="self-start" />
                     <AccountButton
                        onClick={handleAccount}
                        label={isGuest ? "ВОЙТИ" : "ПРОФИЛЬ"}
                        className="self-start"
                     />
                  </nav>
               </div>
            </>
         )}
      </>
   );
};

export default Navbar;
