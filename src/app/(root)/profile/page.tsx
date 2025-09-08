import { getAccountApi } from "@/api/userApi";
import CustomerProfilePage from "@/components/pages/profilePages/CustomerProfilePage";
import ProducerProfilePage from "@/components/pages/profilePages/ProducerProfilePage";
import { UserType } from "@/constants/UserTypeEnum";
import { fetchApi } from "@/lib/fetchApi";
import { cookies } from "next/headers";
import routes from "@/constants/routes";
import { redirect } from "next/navigation";

export default async function Profile() {

   const token = (await cookies()).get("token")?.value;
   let userType: number = UserType.GUEST.type;

   if (token) {
      console.log("token", token);
      try {
         const res = await fetchApi(getAccountApi(token));
         if (res.success) {
            console.log("Аккаунт:", res.data);
            const foundType = Object.values(UserType).find(
                (t) => t.value === res.data.account_type
             ) || UserType.GUEST;
            userType=foundType.type;
         } else {
            userType = UserType.GUEST.type;
            console.error("Ошибка:", res.message);
         }
      } catch (e) {
         console.error("Ошибка получения аккаунта:", e);
      }
   }



   

    switch (userType) {
        case UserType.GUEST.type:
            return redirect(routes.auth.login);
        case UserType.CUSTOMER.type:
            return <CustomerProfilePage />;
        case UserType.PRODUCER.type:
            return <ProducerProfilePage />;
    }
 
}
