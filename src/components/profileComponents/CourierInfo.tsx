import { observer } from "mobx-react-lite";
import { useStores } from "../../hooks/useStores";
import { FC } from "react";
import Skeleton from "@/components/ui/Skeleton";
import { useRouter } from "next/navigation";
import routes from "@/constants/routes";

const CourierInfo: FC = observer(() => {
   const { courierStore } = useStores();
   const profile = courierStore.profile;
   const isLoading = !profile;

   const router = useRouter();

   //    const handleClearCart = async () => {
   //       await customerStore.removeAllFromCart();
   //    };

   const handleLogout = async () => {
      await courierStore.logout();
      router.push(routes.auth.courier.login);
   };

   return (
      <div className="flex gap-x-8 p-8 justify-between">
         {/* <img src={img} className="object-cover size-60" /> */}
         <div className="flex flex-col gap-y-3">
            {isLoading ? (
               <>
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-5 w-64" />
               </>
            ) : (
               <>
                  <span className="text-main-green font-bold text-2xl">
                     {profile.fio ?? "Имя не указано"}
                  </span>
                  <span className="text-main-gray">
                     Номер телефона: {profile.phoneNumber ?? "Не указан"}
                  </span>
                  <span className="text-main-gray">
                     Адрес: {profile.address ?? "Не указан"}
                  </span>
               </>
            )}
         </div>
         <div className="flex flex-col gap-y-2">
            <button
               onClick={() => router.push(routes.users.profile + "?edit=true")}
               className="flex items-center justify-between gap-x-2 border-2 border-main-green text-main-green px-4 rounded-full py-2 h-fit hover:scale-105 transition-all duration-100 cursor-pointer"
            >
               Редактировать профиль
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
               </svg>
            </button>
            <button
               onClick={handleLogout}
               className="flex items-center justify-between gap-x-2 border-2 border-main-green text-white bg-main-green px-4 rounded-full py-2 h-fit hover:scale-105 transition-all duration-100 cursor-pointer"
            >
               Выйти из аккаунта
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
                     d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                  />
               </svg>
            </button>
         </div>
      </div>
   );
});

export default CourierInfo;
