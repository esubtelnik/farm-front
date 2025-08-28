import { SearchProductsRequest } from "../types/requests/ProductRequests";

interface BuildParamsProps {
   title: string;
   priceTo: number;
   deliveryTimeTo: number;
   category: string[];
   categoryTitle?: string;
}

export const buildSearchParams = ({
   title,
   priceTo,
   deliveryTimeTo,
   category,
   categoryTitle,
}: BuildParamsProps): SearchProductsRequest => {
   const params: SearchProductsRequest = {
      priceFrom: 0,
      deliveryFrom: 0,
   };

   if (priceTo > 0) params.priceTo = priceTo;
   if (deliveryTimeTo > 0) params.deliveryTo = deliveryTimeTo;
   if (title.trim() !== "") params.title = title;
   if (categoryTitle) {
      params.category = [categoryTitle];
   } else if (category.length > 0) {
      params.category = category;
   }

   return params;
};
