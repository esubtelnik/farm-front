"use client";
import { FC } from "react";
import Image from "next/image";
import LogoWhite from "@/assets/logos/LogoWhite.svg";
import { AboutCards } from "@/content/AboutCards";

const AboutPage: FC = () => {
   return (
      <div className="mb-8">
         <div className="relative w-full font-geist">
            <Image src='/AboutImage.jpg' width={1000} height={1000} alt="Баннер" loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute w-full h-full z-10 top-0 left-0 bg-main-green/45 flex justify-center items-center">
               <div className="h-3/5">
                  <LogoWhite className="w-full h-full" />
               </div>
            </div>
         </div>
         <p className="md:p-12 px-4 py-10 text-main-gray font-roboto md:text-base/10 text-sm/5">
            <span className="font-bold">FARM-BASKET</span> — это
            онлайн-площадка, которая соединяет вас с лучшими фермерскими
            хозяйствами страны. Здесь вы найдете натуральные продукты,
            выращенные с душой: овощи, фрукты, мясо, молоко, сыры и даже
            домашние заготовки — всё, что дарит радость вкуса и уверенность в
            здоровье.
         </p>
         <div className="bg-main-green font-bold md:text-2xl text-xl text-white text-center p-2">
            Почему FARM-BASKET ?
         </div>
         <div className="grid grid-cols-2 md:grid-cols-4 md:gap-10 gap-4 md:p-10 p-4">
            {AboutCards.map((card, index) => {
               const Icon = card.icon;
               return (
                  <div
                     key={index}
                     className="flex flex-col border-2 border-main-green rounded-xl md:p-8 p-4 text-center"
                  >
                     <div className="md:max-h-[88px] max-h-[64px]">
                        <Icon className="w-full h-full" />
                     </div>

                     <div className="min-h-[56px] flex items-center justify-center my-2">
                        <h3 className="md:text-lg text-base font-semibold text-main-green">
                           {card.title}
                        </h3>
                     </div>

                     <p className="text-main-gray md:text-base text-xs">
                        {card.description}
                     </p>
                  </div>
               );
            })}
         </div>

         <div className="bg-main-green font-bold md:text-2xl text-xl text-white text-center p-2">
            Как работает сервис ?
         </div>
         <div className="md:p-8 p-4 flex items-center justify-center">
            <div className="md:w-1/3 w-full">
               <div className="text-main-green font-bold md:text-xl text-base border-3 border-main-green rounded-2xl p-3 text-center">
                  Выбирайте товары в каталоге с фото, описаниями и отзывами
               </div>
               <div className="w-full flex items-center justify-center">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={2}
                     stroke="currentColor"
                     className="md:size-12 size-10 text-dark-green md:my-4 my-2"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
                     />
                  </svg>
               </div>

               <div className="text-main-green font-bold md:text-xl text-base border-3 border-main-green rounded-2xl p-3 text-center">
                  Оформляйте заказ за пару минут
               </div>
               <div className="w-full flex items-center justify-center">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={2}
                     stroke="currentColor"
                     className="md:size-12 size-10 text-dark-green md:my-4 my-2"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
                     />
                  </svg>
               </div>
               <div className="text-main-green font-bold md:text-xl text-base border-3 border-main-green rounded-2xl p-3 text-center">
                  Получайте свежие продукты прямо на пороге вашего дома
               </div>
            </div>
         </div>
         <div className="bg-main-green font-bold md:text-2xl text-xl text-white text-center p-2">
            Где работает сервис ?
         </div>
         <p className="md:p-12 px-4 py-10 text-main-gray font-roboto md:text-base/10 text-sm/5">
            <span className="font-bold">FARM-BASKET</span> работает с
            производителями по всей Гродненской области и осуществляет доставку
            по городу Гродно и Гродненскому району.
         </p>
      </div>
   );
};

export default AboutPage;
