"use client";
import { FC } from "react";
import Image from "next/image";

const ContactsPage: FC = () => {
   return (
      <div>
         <Image
            src="/MainImage.jpg"
            width={1000}
            height={1000}
            alt="Баннер"
            loading="lazy"
            className="w-full h-full object-cover"
         />
         <div className="p-14 font-roboto flex flex-col gap-y-10 text-xl text-main-gray">
            <p>По вопросам сотрудничества :</p>
            <p>Email: Farm.Basket.shop@gmail.com</p>
            <p>Тел.: +375 (33) 372-90-57</p>
         </div>
         <div className="bg-main-green/30 font-geist text-main-gray flex flex-col justify-center items-center p-20">
            <textarea
               id="message"
               rows={10}
               className="block p-5 w-1/2 text-base text-main-gray outline-0 bg-white rounded-2xl border-2 border-main-gray transition-all focus:ring-main-green focus:border-main-green placeholder:text-lg placeholder:font-medium placeholder:text-center"
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
