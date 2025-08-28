"use client";
import { FC } from "react";
import Hr from "@/components/ui/Hr";      
import Title from "@/components/ui/Title";
//import Search from "@/components/ui/Search";
import CategoryList from "@/components/mainComponents/lists/CategoryList";
//import { useProductContext } from "@/context/ProductContext";
import { ICategory } from "@/types/entities/Product";

interface CatalogPageProps {
   categories: ICategory[];
   // isLoading: boolean;
}

const CatalogPage: FC<CatalogPageProps> = ({ categories }) => {
   //const { getCategories } = useProductContext();
   //const [categories, setCategories] = useState<ICategory[]>([]);
   // const [isLoading, setIsLoading] = useState(false);
   // const fetchCategories = async () => {
   //    setIsLoading(true);
   //    const response = await getCategories();
   //    if (response.success) {
   //       setCategories(response.categories);
   //    }
   //    setIsLoading(false);
   // };

   // useEffect(() => {
   //    fetchCategories();
   //    // eslint-disable-next-line react-hooks/exhaustive-deps
   // }, []);
   return (
      <div className="font-geist">
         <div className="font-roboto md:p-16 px-4 py-10 md:text-sm text-xxs text-main-gray md:gap-y-10 gap-y-4 flex flex-col">
            <p>
               Фермерские продукты прямиком с поля — свежие овощи, экологичное
               мясо, домашние сыры и многое другое. Поддержите малый бизнес и
               отведайте вкус, который не сравнится с магазинными аналогами!
            </p>
            <p>
               Используйте удобные фильтры и сортировку, чтобы быстро найти то,
               что ищете. Все позиции сопровождаются описаниями, фото и
               отзывами, что поможет сделать выбор легко и осознанно.
            </p>
         </div>
         <Hr />
         <div className="flex md:pr-12 mb-5">
            <Title title="Каталог" />
               {/* <Search isCatalogPage={true} /> */}
            </div>
            <CategoryList categories={categories} />
      </div>
   );
};

export default CatalogPage;
