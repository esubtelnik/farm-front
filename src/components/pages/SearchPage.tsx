"use client";
import { FC } from "react";
import LogoColor from "@/assets/logos/LogoColor.svg";
import Search from "@/components/features/Search";
import Hr from "@/components/ui/Hr";
import ProductList from "@/components/mainComponents/lists/ProductList";
import { IDisplayCard } from "@/types/entities/Display";
import routes from "@/constants/routes";
import Link from "next/link";

interface SearchPageProps {
   products: IDisplayCard[];
}

const SearchPage: FC<SearchPageProps> = ({ products }) => {

   return (
      <div className="min-h-screen font-geist">
         <div className="flex items-center justify-center gap-x-12 py-10 w-full ">
            <div className="max-w-[70px] md:w-full w-[35px] cursor-pointer">
               <Link className="md:w-[70px] w-[35px]" href={routes.home.root}>
                  <LogoColor />
               </Link>
            </div>
            <div className="w-3/5">
               <Search />
            </div>
         </div>
         <Hr />
         <ProductList products={products} />
      </div>
   );
};

export default SearchPage;
