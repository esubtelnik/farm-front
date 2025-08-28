import { FC } from "react";
import { useAuthContext } from "@/context/AuthContext";

interface WelcomeInfoProps {
   changeForm: (form: boolean) => void;
}

const WelcomeInfo: FC<WelcomeInfoProps> = ({ changeForm }) => {
   const { setIsLogoShow } = useAuthContext();

   const handleChange = () => {
      setIsLogoShow(false);
      changeForm(false);
   };

   return (
      <div className=" h-full flex flex-col">
         <h1 className="text-3xl font-bold text-main-green font-geist mb-16">
            ДОБРО ПОЖАЛОВАТЬ В FARM-BASKET!
         </h1>
         <p className="text-base font-normal font-roboto text-main-gray grow">
            Онлайн-магазин <span className="font-bold">FARM-BASKET</span> — это
            удобная платформа для покупки натуральных и экологически чистых
            продуктов напрямую от фермеров. Ассортимент включает свежие овощи,
            фрукты, мясо, молочные продукты, яйца, мёд, зелень и другие товары,
            выращенные без использования химических добавок. Магазин предлагает
            быструю доставку, прозрачность происхождения каждого продукта и
            поддержку местных производителей. Это идеальное решение для тех, кто
            ценит качество, свежесть и заботу о здоровье!
         </p>
         <div className="flex w-full justify-end outline-0 border-0  " >
            <button onClick={handleChange} >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="size-6 text-main-green"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
               </svg>
            </button>
         </div>
      </div>
   );
};

export default WelcomeInfo;
