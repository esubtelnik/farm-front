"use client";
import { FC } from "react";
import Image from "next/image";
import { ICategory } from "@/types/entities/Product";
import CategoryList from "../mainComponents/lists/CategoryList";
import Search from "@/components/features/Search";
import Hr from "@/components/ui/Hr";
import Title from "@/components/ui/Title";
import ProducerCarousel from "@/components/mainComponents/lists/ProducerCarousel";
import QuestionList from "@/components/mainComponents/lists/QuestionList";
// import { useProductContext } from "../context/ProductContext";
import { IProducerCard } from "@/types/entities/User";
// import { ICategory } from "../types/entities/Product";
// import NextArrow from "../components/helpers/NextArrow";
// import routes from "../constants/Routes";
import routes from "@/constants/routes";
import Link from "next/link";

interface HomePageProps {
   categories: ICategory[];
   producers: IProducerCard[];
}

const HomePage: FC<HomePageProps> = ({ categories, producers }) => {
   //    const { getCategories, getAllProducers } = useProductContext();
   //    const [isLoading, setIsLoading] = useState(false);
   //    const [producers, setProducers] = useState<IProducerCard[]>([]);
   //    const [categories, setCategories] = useState<ICategory[]>([]);
   //    const fetchProducers = async () => {
   //       setIsLoading(true);
   //       const response = await getAllProducers();
   //       if (response.success) {
   //          setProducers(response.producers);
   //       }
   //       setIsLoading(false);
   //    };

   //    const fetchCategories = async () => {
   //       setIsLoading(true);
   //       const response = await getCategories();
   //       if (response.success) {
   //          setCategories(response.categories);
   //       }
   //       setIsLoading(false);
   //    };

   //    useEffect(() => {
   //       const fetchData = async () => {
   //          setIsLoading(true);
   //          await fetchProducers();
   //          await fetchCategories();
   //          setIsLoading(false);
   //       };
   //       fetchData();
   //       // eslint-disable-next-line react-hooks/exhaustive-deps
   //    }, []);

   return (
      <div className="min-h-screen font-geist">
         <div className="relative w-full aspect-[3/1] md:aspect-[4/1]">
            <Image
               className="object-cover"
               src="/MainImage.png"
               alt="Баннер"
               loading="eager"
               fill
               priority={true}
            />
            {/* <div className="md:hidden absolute w-full h-full z-10 top-0 left-0 bg-main-green/45 flex justify-center items-center" /> */}
         </div>
         <p className="md:text-sm text-xxs font-normal text-main-gray md:px-32 px-4 py-10">
            Онлайн-магазин <span className="font-bold">FARM-BASKET</span> — это
            удобная платформа для покупки натуральных и экологически чистых
            продуктов напрямую от фермеров. Ассортимент включает свежие овощи,
            фрукты, мясо, молочные продукты, яйца, мёд, зелень и другие товары,
            выращенные без использования химических добавок.{" "}
            <span className="hidden md:block">
               Магазин предлагает быструю доставку, прозрачность происхождения
               каждого продукта и поддержку местных производителей.{" "}
            </span>
            Это идеальное решение для тех, кто ценит качество, свежесть и заботу
            о здоровье!
         </p>
         <p className="md:text-lg text-xs font-bold text-white bg-main-green md:p-5 p-3 text-center">
            Питание с FARM-BASKET - залог крепкого здоровья !
         </p>
         <div className="flex items-center justify-center md:gap-x-12 gap-x-4 md:py-10 py-5 md:px-0 px-4 w-full ">
            <Link className="md:w-[70px] w-[35px]" href={routes.home.root}>
               <Image
                  src="/LogoColor.svg"
                  alt="Logo"
                  width={70}
                  height={70}
                  priority={true}
               />
            </Link>
            <div className="md:w-3/5 w-full">
               <Search />
            </div>
         </div>
         <Hr />
         <Title title="Категории" />
         <CategoryList categories={categories} isLoading={false} />
         <Hr />
         <div className="flex w-full items-center gap-x-4">
            <Title title="Наши поставщики" className="" />
            {/* <NextArrow route={routes.home.producers} /> */}
         </div>
         <ProducerCarousel producers={producers} />
         <Hr />
         <Title title="Часто задаваемые вопросы" />
         <QuestionList />
      </div>
   );
};

export default HomePage;
