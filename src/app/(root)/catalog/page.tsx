import CatalogPage from "@/components/pages/CatalogPage";
import { fetchApi } from "@/lib/fetchApi";
import { getCategoriesApi } from "@/api/productApi";
import { cookies } from "next/headers";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Каталог фермерских продуктов | Доставка",
   description:
      "Каталог натуральный фермерских продуктов | овощи, фрукты, мясо, сыры, выпечка и многое другое | готовые наборы здоровой еды",
   keywords: [
      "фермерские продукты",
      "сыры в гродно",
      "мясо в гродно",
      "натуральные фермерские продукты",
      "фермерский сыр",
      "фермерское мясо",
      "доставка продуктов в гродно",
   ],
   openGraph: {
      type: "website",
      locale: "ru_RU",
      siteName: "FARM-BASKET",
      title: "Каталог фермерских продуктов | Доставка",
      description:
         "Каталог натуральных фермерских продуктов с доставкой в Гродно — овощи, фрукты, мясо, сыры, выпечка и готовые наборы здоровой еды",
      url: "https://farmbasket.by/catalog",
      images: [
         {
            url: "/SeoLogo.png",
            width: 1200,
            height: 630,
            alt: "FARM-BASKET - Фермерские продукты",
            type: "image/png",
         },
      ],
   },
};

export default async function Catalog() {
   const token = (await cookies()).get("token")?.value;

   const res = await fetchApi(getCategoriesApi(token));

   return <CatalogPage categories={res.data} />;
}
