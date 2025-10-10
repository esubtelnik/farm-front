"use client";
import { FC } from "react";
import Image from "next/image";

const ContactsPage: FC = () => {
   return (
      <div>
         <div className="relative w-full aspect-[3/1] md:aspect-[4/1]">  
         <Image
            src="/MainImage.png"
    fill
            alt="Баннер"
            loading="lazy"
               className="object-cover"
            />
         </div>
         <div className="md:p-14 p-5 md:text-xl text-sm font-roboto flex flex-col md:gap-y-5 gap-y-2 text-main-gray">
            <p>По вопросам сотрудничества :</p>
            <p>Email: Farm.Basket.shop@gmail.com</p>
            <p>Тел.: +375 (33) 372-90-57</p>
         </div>
         <div className="bg-main-green/30 font-geist text-main-gray flex flex-col justify-center items-center lg:p-20 md:p-8 p-5">
            <textarea
               id="message"
               rows={10}
               className="block p-5 lg:w-2/3 xl:w-1/2  w-full text-base text-main-gray outline-0 bg-white rounded-2xl border-2 border-main-gray transition-all focus:ring-main-green focus:border-main-green placeholder:text-lg placeholder:font-medium placeholder:text-center"
               placeholder=" Здесь Вы можете задать вопрос."
            />
            <button className="uppercase text-white text-lg py-2 px-5 bg-main-green rounded-full mt-8 font-bold cursor-pointer hover:scale-105 transition-all">
               Отправить
            </button>
         </div>
      </div>
   );
};

export default ContactsPage;
