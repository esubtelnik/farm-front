"use client";
import { useState } from "react";
import {
   initCustomerApi,
   initProducerApi,
   loginCustomerApi,
   loginProducerApi,
   registerCustomerApi,
   registerProducerApi,
   updateCustomerApi,
   getAccountApi,
   loginCourierApi,
   registerCourierApi,
   initCourierApi,
} from "@/api/userApi";
import {
   ProducerRegisterRequest,
   CustomerLoginRequest,
   CustomerRegisterRequest,
   ProducerLoginRequest,
   CustomerUpdateRequest,
   CustomerInitRequest,
   ProducerInitRequest,
   CourierLoginRequest,
   CourierRegisterRequest,
   CourierInitRequest,
} from "@/types/requests/UserRequests";
import { getCookie, setCookie } from "cookies-next/client";
import { UserType } from "@/constants/UserTypeEnum";
import { UserTypeValue } from "@/types/entities/User";
import { AdminLoginRequest } from "@/types/requests/AdminRequests";
import { AuthContext } from "./AuthContext";
// import { useStores } from "@/hooks/useStores";
import { loginAdminApi } from "@/api/adminApi";
import { fetchApi } from "@/lib/fetchApi";

export interface AuthContextType {
   isLogoShow: boolean;
   setIsLogoShow: (isLogoShow: boolean) => void;
   userType: UserTypeValue;
   //   isUserTypeLoading: boolean;
   getUserType: () => Promise<{ success: boolean; message?: string }>;
   loginCustomer: (
      loginData: CustomerLoginRequest
   ) => Promise<{ success: boolean; message?: string }>;
   loginProducer: (
      loginData: ProducerLoginRequest
   ) => Promise<{ success: boolean; message?: string }>;
   loginCourier: (
      loginData: CourierLoginRequest
   ) => Promise<{ success: boolean; message?: string }>;
   loginAdmin: (
      loginData: AdminLoginRequest
   ) => Promise<{ success: boolean; message?: string }>;
   registerCustomer: (
      registerData: CustomerRegisterRequest
   ) => Promise<{ success: boolean; message?: string }>;
   registerProducer: (
      registerData: ProducerRegisterRequest
   ) => Promise<{ success: boolean; message?: string }>;
   registerCourier: (
      registerData: CourierRegisterRequest
   ) => Promise<{ success: boolean; message?: string }>;
   // sendEmailCode: (
   //    email: SendEmailRequest
   // ) => Promise<{ success: boolean; message?: string }>;
   initCustomer: (
      emailData: CustomerInitRequest
   ) => Promise<{ success: boolean; message?: string }>;
   initProducer: (
      emailData: ProducerInitRequest
   ) => Promise<{ success: boolean; message?: string }>;
   initCourier: (
      emailData: CourierInitRequest
   ) => Promise<{ success: boolean; message?: string }>;
   updateCustomer: (
      data: CustomerUpdateRequest
   ) => Promise<{ success: boolean; message?: string }>;
}

interface AuthContextProviderProps {
   children: React.ReactNode;
   initialUserType?: string;
}

export const AuthContextProvider = ({
   children,
   initialUserType,
}: AuthContextProviderProps) => {
   // const { customerStore } = useStores();
   const [isLogoShow, setIsLogoShow] = useState<boolean>(true);
   const [userType, setUserType] = useState<UserTypeValue>(() => {
      const type = initialUserType?.toLowerCase();
      const found = Object.values(UserType).find((t) => t.value === type);
      return found || UserType.GUEST;
   });

   // useEffect(() => {
   //    switch (userType.type) {
   //       case UserType.CUSTOMER.type:
   //          customerStore.fetchCustomerData();
   //          break;
   //       case UserType.PRODUCER.type:
   //          setIsLogoShow(false);
   //          break;
   //       case UserType.COURIER.type:
   //          setIsLogoShow(false);
   //          break;
   //       default:
   //          setIsLogoShow(true);
   //          break;
   //    }
   // }, []);

   //    useEffect(() => {
   //       if (!initialUserType) {
   //          setUserType((prev: UserTypeValue | null) =>
   //             prev?.value === UserType.GUEST.value ? prev : UserType.GUEST
   //          );
   //          return;
   //       }

   //       const type = initialUserType.toLowerCase();
   //       const foundType = Object.values(UserType).find((t) => t.value === type);

   //       setUserType((prev: UserTypeValue | null) => {
   //          if (!foundType) {
   //             return prev?.value === UserType.GUEST.value ? prev : UserType.GUEST;
   //          }

   //          return prev?.value === foundType.value ? prev : foundType;
   //       });
   //    }, [initialUserType]);

   // const [userType, setUserType] = useState<UserTypeValue | null>(null);
   // const [isUserTypeLoading, setIsUserTypeLoading] = useState<boolean>(true);
   // const token = Cookies.get("token");

   // // useEffect(() => {

   // //       getUserType();

   // // }, [token]);

   const getUserType = async (): Promise<{
      success: boolean;
      message?: string;
   }> => {
      const token = getCookie("token");

      if (!token) {
         setUserType(UserType.GUEST);

         return { success: true };
      }

      try {
         const response = await getAccountApi();

         if (response.successful && response.data?.account_type) {
            const type = response.data.account_type.toLowerCase();

            const foundType = Object.values(UserType).find(
               (t) => t.value === type
            );

            if (foundType) {
               setUserType(foundType);
            } else {
               setUserType(UserType.GUEST);
            }

            return { success: true };
         } else {
            setUserType(UserType.GUEST);
            return { success: false, message: response.error.message };
         }
      } catch (error) {
         console.error("Ошибка при выполнении запроса:", error);
         setUserType(UserType.GUEST);
         return { success: false, message: "Ошибка сети или сервера" };
      }
   };

   const loginCustomer = async (
      loginData: CustomerLoginRequest
   ): Promise<{ success: boolean; message?: string }> => {
      const response = await fetchApi(loginCustomerApi(loginData));
      if (response.success) {
         console.log("Успешный вход!", response.data);
         setCookie("token", response.data.token, {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            secure: true,
            sameSite: "lax",
            path: "/",
         });
         setUserType(UserType.CUSTOMER);

         return { success: true };
      } else {
         console.error("Ошибка входа:", response.message);
         return { success: false, message: response.message };
      }
   };

   const loginProducer = async (
      loginData: ProducerLoginRequest
   ): Promise<{ success: boolean; message?: string }> => {
      const response = await fetchApi(loginProducerApi(loginData));

      if (response.success) {

         setCookie("token", response.data.token, {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            secure: true,
            sameSite: "lax",
            path: "/",
         });
         setUserType(UserType.PRODUCER);
         return { success: true };
      } else {
         console.error("Ошибка входа:", response.message);
         return { success: false, message: response.message };
      }
   };

   const loginCourier = async (
      loginData: CourierLoginRequest
   ): Promise<{ success: boolean; message?: string }> => {
      const response = await fetchApi(loginCourierApi(loginData));
      if (response.success) {
         setCookie("token", response.data.token, {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            secure: true,
            sameSite: "lax",
            path: "/",
         });
         setUserType(UserType.COURIER);
         return { success: true };
      } else {
         console.error("Ошибка входа:", response.message);
         return { success: false, message: response.message };
      }
   };

   const loginAdmin = async (
      loginData: AdminLoginRequest
   ): Promise<{ success: boolean; message?: string }> => {
      const response = await fetchApi(loginAdminApi(loginData));
      if (response.success) {
         setCookie("token", response.data.token, {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            secure: true,
            sameSite: "lax",
            path: "/",
         });
         setUserType(UserType.ADMIN);
         return { success: true };
      } else {
         console.error("Ошибка входа:", response.message);
         return { success: false, message: response.message };
      }
   };

   const registerCustomer = async (
      registerData: CustomerRegisterRequest
   ): Promise<{ success: boolean; message?: string }> => {
      const response = await fetchApi(registerCustomerApi(registerData));
      if (response.success) {
         setCookie("token", response.data.token, {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            secure: true,
            sameSite: "lax",
            path: "/",
         });
         setUserType(UserType.CUSTOMER);
         return { success: true };
      } else {
         console.log("Ошибка входа:", response.message);
         return { success: false, message: response.message };
      }
   };

   const registerProducer = async (
      registerData: ProducerRegisterRequest
   ): Promise<{ success: boolean; message?: string }> => {
      const response = await fetchApi(registerProducerApi(registerData));
      if (response.success) { 
         setCookie("token", response.data.token, {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            secure: true,
            sameSite: "lax",
            path: "/",
         });
         setUserType(UserType.PRODUCER);
         return { success: true };
      } else {
         console.error("Ошибка входа:", response.message);
         return { success: false, message: response.message };
      }
   };

   const registerCourier = async (
      registerData: CourierRegisterRequest
   ): Promise<{ success: boolean; message?: string }> => {
      const response = await fetchApi(registerCourierApi(registerData));
      if (response.success) {
         setCookie("token", response.data.token, {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            secure: true,
            sameSite: "lax",
            path: "/",
         });
         setUserType(UserType.COURIER);
         return { success: true };
      } else {
         console.error("Ошибка входа:", response.message);
         return { success: false, message: response.message };
      }
   };

   // const sendEmailCode = async (
   //    emailData: SendEmailRequest
   // ): Promise<{ success: boolean; message?: string }> => {
   //    try {
   //       const response = await sendEmailCodeApi(emailData);
   //       if (response.successful) {
   //          return { success: true };
   //       } else {
   //          console.log("Ошибка входа:", response.error.message);
   //          return { success: false, message: response.error.message };
   //       }
   //    } catch (error) {
   //       console.error("Ошибка при выполнении запроса:", error);
   //       return { success: false, message: "Ошибка сети или сервера" };
   //    }
   // };

   const initCustomer = async (
      emailData: CustomerInitRequest
   ): Promise<{ success: boolean; message?: string }> => {
      const response = await fetchApi(initCustomerApi(emailData));
      if (response.success) {
         return { success: true };
      } else {
         console.error("Ошибка входа:", response.message);
         return { success: false, message: response.message };
      }
   };

   const initProducer = async (
      emailData: ProducerInitRequest
   ): Promise<{ success: boolean; message?: string }> => {
      const response = await fetchApi(initProducerApi(emailData));
      if (response.success) {
         return { success: true };
      } else {
         console.error("Ошибка входа:", response.message);
         return { success: false, message: response.message };
      }
   };

   const initCourier = async (
      emailData: CourierInitRequest
   ): Promise<{ success: boolean; message?: string }> => {
      const response = await fetchApi(initCourierApi(emailData));
      if (response.success) {
         return { success: true };
      } else {
         console.error("Ошибка входа:", response.message);
         return { success: false, message: response.message };
      }
   };

   const updateCustomer = async (
      data: CustomerUpdateRequest
   ): Promise<{ success: boolean; message?: string }> => {
      const response = await fetchApi(updateCustomerApi(data));
      if (response.success) {

         return { success: true };
      } else {
         console.error("Ошибка:", response.message);
         return { success: false, message: response.message };
      }
   };

   return (
      <AuthContext.Provider
         value={{
            isLogoShow,
            setIsLogoShow,
            userType,
            // isUserTypeLoading,
            getUserType,
            loginCustomer,
            loginProducer,
            loginCourier,
            loginAdmin,
            initCustomer,
            registerCustomer,
            initProducer,
            registerProducer,
            registerCourier,
            initCourier,
            // sendEmailCode,
            updateCustomer,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};
