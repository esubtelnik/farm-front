import { FC } from "react";
import Tabs from "@/components/ui/Tabs";
import { observer } from "mobx-react-lite";
import CourierDeliveryList from "@/components/mainComponents/lists/CourierDeliveryList";
import CourierInfo from "@/components/profileComponents/CourierInfo";
import { useSearchParams } from "next/navigation";
import CourierProfileEditPage from "./CourierProfileEditPage";


const CourierProfilePage: FC = observer(() => {
   const searchParams = useSearchParams();
   const isEdit = searchParams.get("edit") === "true";
   //    useEffect(() => {
   //       const fetchData = async () => {
   //          setIsLoading(true);
   //          await courierStore.fetchCourierData();
   //          setIsLoading(false);
   //       };
   //       fetchData();
   //       // eslint-disable-next-line react-hooks/exhaustive-deps
   //    }, []);

   const tabItems = [
      {
         label: "Доставки на смену",
         render: () => (
            <div className="py-5">
               <CourierDeliveryList />
            </div>
         ),
      },
      {
         label: "Статистика",
         render: () => (
            <div className="py-5">
               <div>В разработке</div>
            </div>
         ),
      },
   ];

   return (
      <div className="min-h-screen font-geist">
    
           {isEdit ? (
            <CourierProfileEditPage />
         ) : (
            <>
               <CourierInfo />
               <Tabs tabs={tabItems} />
            </>
         )}
      </div>
   );
});

export default CourierProfilePage;
