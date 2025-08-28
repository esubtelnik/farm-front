"use client";
import { FC } from "react";
import Hr from "@/components/ui/Hr";
import Title from "@/components/ui/Title";
//import Search from "@/components/ui/Search";
import ProducerList from "@/components/mainComponents/lists/ProducerList";
import { IProducerCard } from "@/types/entities/User";

interface ProducerListPageProps {
   producers: IProducerCard[];
}

const ProducerListPage: FC<ProducerListPageProps> = ({ producers }) => {
   return (
      <div className="font-geist mb-16">
         <div className="font-roboto md:p-16 px-4 py-10 md:text-sm text-xs text-main-gray md:gap-y-10 gap-y-4 flex flex-col">
            <h2 className="font-semibold md:text-xl text-lg text-main-green">
               Наши фермеры – это гарант качества и любви к своему делу!
            </h2>
            <p>
               Мы тщательно отбираем партнёров, которые разделяют наши ценности:
               экологичность, честность и заботу о здоровье каждого клиента.
               Каждый продукт в нашем магазине имеет свою историю, а за ней –
               труд преданных своему делу людей
            </p>
            <ul className="list-inside">
               <h3 className="font-base md:text-lg text-base text-main-green mb-4">
                  Что объединяет наших фермеров?
               </h3>
               <li className="mb-4 md:pl-4 pl-2">
                  <span className="font-semibold ">Экологический подход: </span>
                  Мы сотрудничаем только с теми, кто возделывает землю с
                  уважением к природе, без использования химических удобрений и
                  ГМО.
               </li>
               <li className="mb-4 md:pl-4 pl-2">
                  <span className="font-semibold">Любовь к делу: </span>Для
                  наших партнёров фермерство – не просто бизнес, а образ жизни.
                  Они вкладывают душу в каждый посев и урожай.
               </li>
               <li className="mb-4 md:pl-4 pl-2">
                  <span className="font-semibold">Прозрачность: </span>Мы знаем,
                  как и где выращиваются все продукты. Наши фермеры готовы
                  поделиться информацией о методах выращивания и условиях
                  содержания животных.
               </li>
               <li className="mb-4 md:pl-4 pl-2">
                  <span className="font-semibold">Сезонность: </span>Мы
                  поддерживаем естественный цикл природы и предлагаем вам только
                  сезонные продукты, чтобы вы могли насладиться их истинным
                  вкусом.
               </li>
            </ul>
         </div>
         <Hr />
         <div className="flex md:pr-12 mb-5">
            <Title title="Производители" />
            {/* <Search /> */}
         </div>
         <ProducerList producers={producers} isLoading={false} />
      </div>
   );
};

export default ProducerListPage;
