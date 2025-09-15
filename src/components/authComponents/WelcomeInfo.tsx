import { FC } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import routes from "@/constants/routes";

interface WelcomeInfoProps {
   changeForm: (form: boolean) => void;
}

const WelcomeInfo: FC<WelcomeInfoProps> = ({ changeForm }) => {
   const { setIsLogoShow } = useAuthContext();
   const router = useRouter();

   const handleChange = () => {
      setIsLogoShow(false);
      changeForm(false);
   };

   const handleLoginNavigate = () => {
      router.push(routes.auth.login);
   };

   return (
      <div className=" h-full flex flex-col">
         <h1 className="md:text-3xl text-xl text-center md:text-start font-bold text-main-green font-geist md:mb-16 mb-4">
            ДОБРО ПОЖАЛОВАТЬ В FARM-BASKET!
         </h1>
         <p className="md:text-base text-sm text-justify font-normal font-roboto text-main-gray grow">
            Онлайн-магазин <span className="font-bold">FARM-BASKET</span> — это
            удобная платформа для покупки натуральных и экологически чистых
            продуктов напрямую от фермеров. Ассортимент включает свежие овощи,
            фрукты, мясо, молочные продукты, яйца, мёд, зелень и другие товары,
            выращенные без использования химических добавок. Магазин предлагает
            быструю доставку, прозрачность происхождения каждого продукта и
            поддержку местных производителей. Это идеальное решение для тех, кто
            ценит качество, свежесть и заботу о здоровье!
         </p>
         <div className="flex w-full justify-end outline-0 border-0  ">
            <button onClick={handleChange}>
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
         <div className="text-main-gray mt-3 text-sm md:text-base font-medium text-center">
            Уже зарегистрированы?{" "}
            <span
               className="text-main-green cursor-pointer hover:underline"
               onClick={handleLoginNavigate}
            >
               Войти
            </span>
         </div>
      </div>
   );
};

export default WelcomeInfo;
