"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useProductContext } from "@/context/ProductContext";
import { useSearchParams } from "next/navigation";
import { ICategory } from "@/types/entities/Product";

const FilterModalSelect = ({
   title,
   content,
}: {
   title: string;
   content: React.ReactNode;
}) => {
   const [isOpen, setIsOpen] = useState(false);
   return (
      <div>
         <button
            className={`w-full flex items-center font-bold text-sm text-main-gray px-2 py-1 text-left transition-all duration-300 border ${
               isOpen ? "border-transparent " : " border-main-gray rounded-sm "
            }`}
            onClick={() => setIsOpen(!isOpen)}
         >
            {title}
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={2}
               stroke="currentColor"
               className="size-4 ml-auto"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
               />
            </svg>
         </button>

         <AnimatePresence initial={false}>
            {isOpen && (
               <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
               >
                  {content}
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

const CategoryFilter = ({
   categories,
   searchCategories,
   setCategory,
   isCategoryPage = false,
   title,
}: {
   categories: ICategory[];
   searchCategories?: string[];
   setCategory?: (category: string[]) => void;
   isCategoryPage: boolean;
   title?: string;
}) => {
   const [selectedCategories, setSelectedCategories] = useState<string[]>(
      searchCategories ?? []
   );

   useEffect(() => {
      if (isCategoryPage && title) {
         setSelectedCategories([title]);
         // Принудительно сообщаем в родителя, если надо
         setCategory?.([title]);
      } else if (searchCategories) {
         setSelectedCategories(searchCategories);
      }
   }, [isCategoryPage, title, searchCategories, setCategory]);

   const handleToggle = (title: string) => {
      if (isCategoryPage) {
         // Блокируем смену категорий на странице категории
         return;
      }
      setSelectedCategories((prev) => {
         const updated = prev.includes(title)
            ? prev.filter((t) => t !== title)
            : [...prev, title];

         setCategory?.(updated);
         return updated;
      });
   };

   return (
      <div className="flex flex-col gap-y-1 px-1">
         {categories.map((category) => {
            const isChecked = selectedCategories.includes(category.title);
            const formattedTitle =
               category.title.charAt(0).toUpperCase() +
               category.title.slice(1).toLowerCase();

            return (
               <button
                  type="button"
                  key={category.title}
                  onClick={() => handleToggle(category.title)}
                  disabled={isCategoryPage} 
                  className={`w-full outline-none font-medium text-[13px] px-2 py-1 text-left rounded-sm transition-all duration-300 ${
                     isChecked
                        ? "bg-main-gray text-white"
                        : "bg-white text-main-gray"
                  } ${isCategoryPage ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
               >
                  {formattedTitle}
               </button>
            );
         })}
      </div>
   );
};

const PriceFilter = ({
   searchPrice,
   setPriceTo,
}: {
   searchPrice?: number;
   setPriceTo?: (price: number) => void;
}) => {
   const priceValues = [0, 10, 20, 50, 100, 150, 200];
   const initialIndex =
      searchPrice && priceValues.includes(searchPrice)
         ? priceValues.indexOf(searchPrice)
         : 0;

   const [selectedIndex, setSelectedIndex] = useState<number>(initialIndex);

   const handleDecrement = () => {
      const newIndex = Math.max(0, selectedIndex - 1);
      setSelectedIndex(newIndex);
      setPriceTo?.(priceValues[newIndex]);
   };

   const handleIncrement = () => {
      const newIndex = Math.min(priceValues.length - 1, selectedIndex + 1);
      setSelectedIndex(newIndex);
      setPriceTo?.(priceValues[newIndex]);
   };

   const isMin = selectedIndex === 0;
   const isMax = selectedIndex === priceValues.length - 1;

   return (
      
      <div className="flex w-full justify-center items-center space-x-3 py-2">
         <button
            onClick={handleDecrement}
            className={`size-7 font-bold flex items-center justify-center text-sm text-main-gray border-2 border-transparent hover:border-main-green box-border rounded-sm transition-all duration-300 ${
               isMin ? "hover:bg-main-green hover:text-white" : ""
            }`}
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={2}
               stroke="currentColor"
               className="size-6"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
               />
            </svg>
         </button>
         <div className="w-fit h-6 text-center text-main-gray font-semibold">
            {priceValues[selectedIndex] === 0 ? (
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-6"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                  />
               </svg>
            ) : (
               <>до {priceValues[selectedIndex]}</>
            )}
         </div>
         <button
            onClick={handleIncrement}
            className={`size-7 font-bold flex items-center justify-center text-sm text-main-gray border-2 border-transparent hover:border-main-green box-border rounded-sm transition-all duration-300 ${
               isMax ? "hover:bg-main-green hover:text-white" : ""
            }`}
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={2}
               stroke="currentColor"
               className="size-6"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
               />
            </svg>
         </button>
      </div>
   );
};

const DeliveryTimeFilter = ({
   setDeliveryTimeTo,
   searchDeliveryTime,
}: {
   setDeliveryTimeTo?: (deliveryTime: number) => void;
   searchDeliveryTime?: number;
}) => {
   const deliveryTimeValues = [0, 1, 2, 3, 4, 5, 6, 7];
   const initialIndex =
      searchDeliveryTime && deliveryTimeValues.includes(searchDeliveryTime)
         ? deliveryTimeValues.indexOf(searchDeliveryTime)
         : 0;
   const [selectedIndex, setSelectedIndex] = useState<number>(initialIndex);

   const handleDecrement = () => {
      const newIndex = Math.max(0, selectedIndex - 1);
      setSelectedIndex(newIndex);
      setDeliveryTimeTo?.(deliveryTimeValues[newIndex]);
   };

   const handleIncrement = () => {
      const newIndex = Math.min(
         deliveryTimeValues.length - 1,
         selectedIndex + 1
      );
      setSelectedIndex(newIndex);
      setDeliveryTimeTo?.(deliveryTimeValues[newIndex]);
   };

   const isMin = selectedIndex === 0;
   const isMax = selectedIndex === deliveryTimeValues.length - 1;

   return (
      <div className="flex w-full justify-center items-center space-x-3 py-2">
         <button
            onClick={handleDecrement}
            className={`size-7 font-bold flex items-center justify-center text-sm text-main-gray border-2 border-transparent hover:border-main-green box-border rounded-sm transition-all duration-300 ${
               isMin ? "hover:bg-main-green hover:text-white" : ""
            }`}
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={2}
               stroke="currentColor"
               className="size-6"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
               />
            </svg>
         </button>
         <div className="w-fit h-6 text-center text-main-gray font-semibold">
            {deliveryTimeValues[selectedIndex] === 0 ? (
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-6"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                  />
               </svg>
            ) : (
               <>{deliveryTimeValues[selectedIndex]}</>
            )}
         </div>
         <button
            onClick={handleIncrement}
            className={`size-7 font-bold flex items-center justify-center text-sm text-main-gray border-2 border-transparent hover:border-main-green box-border rounded-sm transition-all duration-300 ${
               isMax ? "hover:bg-main-green hover:text-white" : ""
            }`}
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={2}
               stroke="currentColor"
               className="size-6"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
               />
            </svg>
         </button>
      </div>
   );
};

interface FilterModalProps {
   handleSearch: () => void;
   onClose: () => void;
   triggerRef: React.RefObject<HTMLButtonElement | null>;
   isCategoryPage?: boolean;
   isCatalogPage?: boolean;
   selectedCategories?: string[];
   selectedPrice?: number;
   selectedDeliveryTime?: number;
   setCategory?: (category: string[]) => void;
   setPriceTo?: (price: number) => void;
   setDeliveryTimeTo?: (deliveryTime: number) => void;
}

const FilterModal = ({
   handleSearch,
   onClose,
   triggerRef,
   isCategoryPage = false,
   isCatalogPage = false,
   selectedCategories,
   selectedPrice,
   selectedDeliveryTime,
   setPriceTo,
   setDeliveryTimeTo,
   setCategory,
}: FilterModalProps) => {
   const modalRef = useRef<HTMLDivElement>(null);
   const positionClass =
      isCategoryPage || isCatalogPage
         ? "right-0 translate-x-0"
         : "md:left-1/2 md:-translate-x-1/2 right-0 translate-x-0";
   const searchParams = useSearchParams();
   const categoryTitle = searchParams.get("category") || "";
   const { getCategories } = useProductContext();
   const [categories, setCategories] = useState<ICategory[]>([]);
   const fetchCategories = async () => {
      const response = await getCategories();
      if (response.success) {
         setCategories(response.categories);
      }
   }; 
   useEffect(() => {
      fetchCategories();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent | TouchEvent) => {
         const target = event.target as Node;

         const clickedOutside =
            modalRef.current &&
            !modalRef.current.contains(target) &&
            triggerRef?.current &&
            !triggerRef.current.contains(target);

         if (clickedOutside) {
            onClose();
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);

      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
         document.removeEventListener("touchstart", handleClickOutside);
      };
   }, [onClose, triggerRef]);

   return (
      <motion.div
         ref={modalRef}
         layout
         className={`absolute top-full mt-2 w-80 bg-white rounded-md p-4 border border-main-gray/20 shadow-md/25 z-50 ${positionClass}`}
         initial={{ opacity: 0, y: -10 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0, y: -10 }}
         transition={{ duration: 0.2, ease: "easeOut" }}
      >
         <div className="flex flex-col gap-y-2">
            <FilterModalSelect
               title="По категории"
               content={
                  <CategoryFilter
                     categories={categories}
                     searchCategories={selectedCategories}
                     setCategory={setCategory}
                     isCategoryPage={isCategoryPage}
                     title={categoryTitle}
                  />
               }
            />
            <FilterModalSelect
               title="По стоимости"
               content={
                  <PriceFilter
                     setPriceTo={setPriceTo}
                     searchPrice={selectedPrice}
                  />
               }
            />
            {/* <FilterModalSelect
               title="По времени доставки"
               content={
                  <DeliveryTimeFilter
                     setDeliveryTimeTo={setDeliveryTimeTo}
                     searchDeliveryTime={selectedDeliveryTime}
                  />
               }
            /> */}
         </div>
         <div className="flex justify-end mt-4">
            <button
               onClick={() => {
                  handleSearch();
                  onClose();
               }}
               className="bg-main-green outline-dark-green font-geist text-white font-bold text-sm px-4 py-2 rounded-full hover:shadow-md/40 hover:scale-105 hover:shadow-main-green transition-all duration-300 cursor-pointer"
            >
               Поиск
            </button>
         </div>
      </motion.div>
   );
};

export default FilterModal;
