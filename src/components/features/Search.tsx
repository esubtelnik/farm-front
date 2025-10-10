   "use client";
   import { FC, useEffect, useRef, useState } from "react";
   import FilterModal from "@/components/ui/modals/modalContents/FilterModal";
   import { AnimatePresence } from "motion/react";
   import { useRouter, useSearchParams } from "next/navigation";
   import routes from "@/constants/routes";
   // import { buildSearchParams } from "@/utils/BuildSearchParams";

   interface SearchProps {
      isCategoryPage?: boolean;
      categoryTitle?: string;
      isCatalogPage?: boolean
   }

   const Search: FC<SearchProps> = ({ isCategoryPage = false, categoryTitle, isCatalogPage = false }) => {
      const router = useRouter();
      const searchParams = useSearchParams();
     

      const [showFilter, setShowFilter] = useState(false);
      const buttonRef = useRef<HTMLButtonElement | null>(null);

      const [title, setTitle] = useState<string>("");
      const [priceTo, setPriceTo] = useState<number>(0);
      const [deliveryTimeTo, setDeliveryTimeTo] = useState<number>(0);
      const [category, setCategory] = useState<string[]>([]);

      const [isInitialSearchDone, setIsInitialSearchDone] = useState(false);

      useEffect(() => {
         const titleParam = searchParams.get("title") || "";
         const priceToParam = Number(searchParams.get("priceTo")) || 0;
         const deliveryToParam = Number(searchParams.get("deliveryTo")) || 0;
         const categoryParam = searchParams.get("category") || "";

         if (titleParam) setTitle(titleParam);
         if (priceToParam) setPriceTo(priceToParam);
         if (deliveryToParam) setDeliveryTimeTo(deliveryToParam);
         if (categoryParam) setCategory(categoryParam.split(";"));
         if (categoryTitle) setCategory([categoryTitle]);

         setIsInitialSearchDone(true);
      }, [searchParams, categoryTitle]);

      useEffect(() => {
         if (!isInitialSearchDone) return;

         if (
            categoryTitle ||
            category.length > 0 ||
            priceTo > 0 ||
            deliveryTimeTo > 0 ||
            title.trim() !== ""
         ) {
            handleSearch();
         }
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isInitialSearchDone]);

      const handleSearch = async () => {
        
         const hasFilters =
           title.trim() ||
           priceTo > 0 ||
           deliveryTimeTo > 0 ||
           category.length > 0;
       
        
         if (isCategoryPage && !hasFilters) return;
       
         // const params = buildSearchParams({
         //   title,
         //   priceTo,
         //   deliveryTimeTo,
         //   category,
         //   categoryTitle,
         // });
        
           if (isCategoryPage) {
             const currentParams = new URLSearchParams(window.location.search); 
         
             currentParams.delete("title");
             currentParams.delete("priceTo");
             currentParams.delete("deliveryTo");
        
         
             if (title) currentParams.set("title", title);
             if (priceTo > 0) currentParams.set("priceTo", priceTo.toString());
             if (deliveryTimeTo > 0) currentParams.set("deliveryTo", deliveryTimeTo.toString());
        
       
             router.replace(
               `${routes.items.category(categoryTitle ?? "")}?${currentParams.toString()}`, {scroll: false}
             )
             ;
           } else {
             const currentParams = new URLSearchParams(window.location.search); 
         
             currentParams.delete("title");
             currentParams.delete("priceTo");
             currentParams.delete("deliveryTo");
        
         
             if (title) currentParams.set("title", title);
             if (priceTo > 0) currentParams.set("priceTo", priceTo.toString());
             if (deliveryTimeTo > 0) currentParams.set("deliveryTo", deliveryTimeTo.toString());

             router.replace(
               `${routes.home.search}?${currentParams.toString()}`, {scroll: false}
             )
             ;
           }
       
       };
       
       
      
      return (
         <div className="flex items-center justify-center md:gap-x-12 gap-x-4 w-full">
            <div className="flex justify-between items-center border-2 border-main-green rounded-full h-min pr-7 grow">
               <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="outline-0 py-3 w-full font-normal px-7 placeholder:text-main-green text-main-gray"
                  onKeyDown={(e) => {
                     if (e.key === "Enter") {
                        e.preventDefault();
                        handleSearch();
                     }
                  }}
                  placeholder="Поиск"
               />
               <button
                  onClick={handleSearch}
                  className="text-main-green cursor-pointer"
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor"
                     className="size-6"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                     />
                  </svg>
               </button>
            </div>
            <div className="relative font-geist">
               <button
                  className="text-dark-green cursor-pointer"
                  ref={buttonRef}
                  onClick={() => setShowFilter((prev) => !prev)}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={2}
                     stroke="currentColor"
                     className="md:size-10 size-6"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                     />
                  </svg>
               </button>
               <AnimatePresence>
                  {showFilter && (
                     <FilterModal
                        handleSearch={handleSearch}
                        onClose={() => setShowFilter(false)}
                        triggerRef={buttonRef}
                        isCategoryPage={isCategoryPage}
                        isCatalogPage={isCatalogPage}
                        setPriceTo={setPriceTo}
                        setDeliveryTimeTo={setDeliveryTimeTo}
                        selectedCategories={category}
                        selectedPrice={priceTo}
                        selectedDeliveryTime={deliveryTimeTo}
                        setCategory={setCategory}
                     />
                  )}
               </AnimatePresence>
            </div>
         </div>
      );
   };

   export default Search;
