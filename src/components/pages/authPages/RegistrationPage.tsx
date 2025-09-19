"use client";
import { FC, useEffect, useState } from "react";
import RegistrationForm from "@/components/authComponents/RegistrationForm";
import EmailVerification from "@/components/authComponents/EmailVerification";
// import { useLocation, useNavigate } from "react-router-dom";
import { UserType } from "@/constants/UserTypeEnum";
import {
   ProducerRegisterRequest,
   CustomerRegisterRequest,
   CourierRegisterRequest,
} from "@/types/requests/UserRequests";
import { useAuthContext } from "@/context/AuthContext";
import routes from "@/constants/routes";
import { UserTypeValue } from "@/types/entities/User";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const RegistrationPage: FC = () => {
   const {
      initCustomer,
      initProducer,
      initCourier,
      registerCustomer,
      registerProducer,
      registerCourier,
   } = useAuthContext();
   const router = useRouter();
   // const [isProducerRegistration, setIsProducerRegistration] =
   //    useState<boolean>(false);
   const [userType, setUserType] = useState<UserTypeValue | null>(null);
   const [isEmailVerification, setIsEmailVerification] =
      useState<boolean>(false);

   const [regErrorMessage, setRegErrorMessage] = useState<string>("");
   const [verifErrorMessage, setVerifErrorMessage] = useState<string>("");

   const [registerCustomerData, setRegisterCustomerData] =
      useState<CustomerRegisterRequest>({
         email: "",
         password: "",
         code: "",
      });

   const [registerProducerData, setRegisterProducerData] =
      useState<ProducerRegisterRequest>({
         fio: "",
         email: "",
         password: "",
         shopCode: "",
         code: "",
      });

   const [registerCourierData, setRegisterCourierData] =
      useState<CourierRegisterRequest>({
         fio: "",
         email: "",
         password: "",
         courierCode: "",
         code: "",
      });

   const searchParams = useSearchParams();
   const location = usePathname();

   useEffect(() => {

      if (location === routes.auth.courier.register) {
         setUserType(UserType.COURIER);
      } else {
         const userType = searchParams.get("userType");

         //const userType = location.state?.userType;
         // console.log(userType);
         // if (location === routes.auth.courier.register) {
         //    setUserType(UserType.COURIER);
         // } else
         if (userType) {
            const foundType = Object.values(UserType).find(
               (t) => t.value === userType
            );
            // console.log(foundType);
            setUserType(foundType || UserType.CUSTOMER);
         } else {
            setUserType(UserType.CUSTOMER);
         }
      }
   }, [searchParams, location]);

   const handleStartVerification = async (
      email: string,
      password: string,
      fio?: string,
      workCode?: string
   ) => {
      setRegErrorMessage("");
      switch (userType?.type) {
         case UserType.PRODUCER.type:
            {
               const updatedData: ProducerRegisterRequest = {
                  ...registerProducerData,
                  email,
                  password,
                  fio: fio || "",
                  shopCode: workCode || "",
               };
               setRegisterProducerData(updatedData);
               const result = await initProducer({
                  email,
                  shopCode: workCode || "",
               });
               if (result.success) {
                  setIsEmailVerification(true);
               } else {
                  setRegErrorMessage(result.message || "Неизвестная ошибка");
               }
            }
            break;
         case UserType.CUSTOMER.type:
            {
               const updatedData: CustomerRegisterRequest = {
                  ...registerCustomerData,
                  email,
                  password,
               };
               setRegisterCustomerData(updatedData);

               const result = await initCustomer({ email });
               if (result.success) {
                  setIsEmailVerification(true);
               } else {
                  setRegErrorMessage(result.message || "Неизвестная ошибка");
               }
            }
            break;
         case UserType.COURIER.type:
            {
               const updatedData: CourierRegisterRequest = {
                  ...registerCourierData,
                  email,
                  password,
                  fio: fio || "",
                  courierCode: workCode || "",
               };
               setRegisterCourierData(updatedData);
               const result = await initCourier({
                  email,
                  courierCode: workCode || "",
               });
               if (result.success) {
                  setIsEmailVerification(true);
               } else {
                  setRegErrorMessage(result.message || "Неизвестная ошибка");
               }
            }
            break;
      }
   };

   const handleCodeVerification = async (code: string) => {
      setVerifErrorMessage("");

      switch (userType?.type) {
         case UserType.PRODUCER.type:
            {
               const updatedData: ProducerRegisterRequest = {
                  ...registerProducerData,
                  code: code,
               };
               setRegisterProducerData(updatedData);

               const result = await registerProducer(updatedData);
               if (result.success) {
                  router.push(routes.users.profile);
               } else {
                  setVerifErrorMessage(result.message || "Неизвестная ошибка");
               }
            }
            break;
         case UserType.CUSTOMER.type:
            {
               const updatedData: CustomerRegisterRequest = {
                  ...registerCustomerData,
                  code: code,
               };
               setRegisterCustomerData(updatedData);

               const result = await registerCustomer(updatedData);
               if (result.success) {
                  router.push(routes.users.profile + "?edit=true");
               } else {
                  setVerifErrorMessage(result.message || "Неизвестная ошибка");
               }
            }
            break;
         case UserType.COURIER.type:
            {
               const updatedData: CourierRegisterRequest = {
                  ...registerCourierData,
                  code: code,
               };
               setRegisterCourierData(updatedData);

               const result = await registerCourier(updatedData);
               if (result.success) {
                  router.push(routes.users.courier.profile);
               } else {
                  setVerifErrorMessage(result.message || "Неизвестная ошибка");
               }
            }
            break;
      }
   };

   return (
      <div>
         {isEmailVerification ? (
            <EmailVerification
               setRegisterData={handleCodeVerification}
               errorMessage={verifErrorMessage}
            />
         ) : (
            userType ? (
               <RegistrationForm
                  userType={userType}
                  setRegisterData={handleStartVerification}
                  errorMessage={regErrorMessage}
               />
            ) : <div></div>
         )}
      </div>
   );
};

export default RegistrationPage;
