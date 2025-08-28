"use client";
import { FC, useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import { motion, AnimatePresence } from "motion/react";
// import { useLocation, useNavigate } from "react-router-dom";
import {
   CustomerLoginRequest,
   ProducerLoginRequest,
   CourierLoginRequest,
} from "@/types/requests/UserRequests";
import { validateEmail } from "@/utils/ValidateUtils";
import { useAuthContext } from "@/context/AuthContext";
import routes from "@/constants/routes";
import { UserTypeValue } from "@/types/entities/User";
import { UserType } from "@/constants/UserTypeEnum";
import { AdminLoginRequest } from "@/types/requests/AdminRequests";
import { usePathname, useRouter } from "next/navigation";

interface FormState {
   values: {
      email: string;
      password: string;
      workCode?: string;
   };
   errors: {
      email: string | null;
      password: string | null;
      workCode: string | null;
   };
}

const LoginPage: FC = () => {
   const { loginCustomer, loginProducer, loginCourier, loginAdmin } = useAuthContext();

   const [loginUserType, setLoginUserType] = useState<UserTypeValue>(
      UserType.CUSTOMER
   );

   const [loginErrorMessage, setLoginErrorMessage] = useState<string>("");

   const location = usePathname();
   useEffect(() => {
      switch (location) {
         case routes.auth.courier.login:
            setLoginUserType(UserType.COURIER);
            break;
         case routes.admin.login:
            setLoginUserType(UserType.ADMIN);
            break;
      }
   }, [location]);

   const navigate = useRouter();

   const [form, setForm] = useState<FormState>({
      values: {
         email: "",
         password: "",
         workCode: "",
      },
      errors: {
         email: null,
         password: null,
         workCode: null,
      },
   });

   const handleChange = <K extends keyof FormState["values"]>(
      field: K,
      value: FormState["values"][K]
   ) => {
      setForm((prev) => ({
         ...prev,
         values: {
            ...prev.values,
            [field]: value,
         },
         errors: {
            ...prev.errors,
            [field]: null,
         },
      }));
   };

   const validateForm = () => {
      const newErrors: FormState["errors"] = {
         email: null,
         password: null,
         workCode: null,
      };
      newErrors.email = validateEmail(form.values.email);

      if (form.values.password.length < 1) {
         newErrors.password = "Пароль должен быть минимум 6 символов";
      }
      if (
         (loginUserType.type === UserType.PRODUCER.type || loginUserType.type === UserType.COURIER.type) &&
         (!form.values.workCode || form.values.workCode.length < 3)
      ) {
         newErrors.workCode = "Введите корректный код";
      }

      setForm((prev) => ({
         ...prev,
         errors: newErrors,
      }));
      console.log(newErrors);

      return Object.values(newErrors).some((error) => error !== null);
   };


   const handleRegistrationNavigate = () => {
      navigate.push(routes.auth.root);
   };

   const handleSubmitLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoginErrorMessage("");

      const hasErrors = validateForm();

      if (!hasErrors) {
         switch (loginUserType.type) {
            
            case UserType.CUSTOMER.type:
               {
                  const loginCustomerData: CustomerLoginRequest = {
                     email: form.values.email,
                     password: form.values.password,
                  };

                  const result = await loginCustomer(loginCustomerData);
                  if (result.success) {
                     navigate.push(routes.home.root);
                  } else {
                     setLoginErrorMessage(
                        result.message || "Неизвестная ошибка"
                     );
                  }
               }
               break;
            case UserType.PRODUCER.type:
               {
                  const loginProducerData: ProducerLoginRequest = {
                     email: form.values.email,
                     password: form.values.password,
                     shopCode: form.values.workCode || "",
                  };

                  const result = await loginProducer(loginProducerData);
                  if (result.success) {
                     navigate.push(routes.users.profile);
                  } else {
                     setLoginErrorMessage(
                        result.message || "Неизвестная ошибка"
                     );
                  }
               }
               break;
            case UserType.COURIER.type:
               
               {
                  const loginCourierData: CourierLoginRequest = {
                     email: form.values.email,
                     password: form.values.password,
                     courierCode: form.values.workCode || "",
                  };

                  const result = await loginCourier(loginCourierData);
                  if (result.success) {
                     navigate.push(routes.users.courier.profile);
                  } else {
                     setLoginErrorMessage(
                        result.message || "Неизвестная ошибка"
                     );
                  }
               }
               break;
            case UserType.ADMIN.type:
               {
                  const loginAdminData: AdminLoginRequest = {
                     email: form.values.email,
                     password: form.values.password,
                  };

                  const result = await loginAdmin(loginAdminData);
                  if (result.success) {
                     navigate.push(routes.admin.root);
                  } else {
                     setLoginErrorMessage(result.message || "Неизвестная ошибка");
                  }
               }
               break;
         }
      }
   };

   return (
      <div className="w-full flex flex-col items-center justify-center font-geist">
         <h1 className="text-3xl text-main-green font-bold mb-16">
            ВХОД В ЛИЧНЫЙ КАБИНЕТ
         </h1>
         <div className="w-full flex flex-col space-y-9 ">
            <Input
               placeholder="E-mail"
               value={form.values.email}
               onChange={(value) => handleChange("email", value)}
               error={form.errors.email}
               onResetError={() => handleChange("email", form.values.email)}
            />
            <div className="flex flex-col">
               <Input
                  placeholder="Пароль"
                  type="password"
                  value={form.values.password}
                  onChange={(value) => handleChange("password", value)}
                  error={form.errors.password}
                  onResetError={() =>
                     handleChange("password", form.values.password)
                  }
               />
               <span className="text-main-green ml-2 text-sm cursor-pointer">
                  Забыли пароль?
               </span>
            </div>
            <AnimatePresence>
               {(loginUserType.type === UserType.PRODUCER.type || loginUserType.type === UserType.COURIER.type) && (
                  <motion.div
                     className="relative flex flex-col mb-5"
                     initial={{ opacity: 0, y: -10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     transition={{ duration: 0.3 }}
                  >
                     <Input
                        placeholder="Код"
                        value={form.values.workCode || ""}
                        onChange={(value) => handleChange("workCode", value)}
                        error={form.errors.workCode}
                        onResetError={() =>
                           handleChange("workCode", form.values.workCode || "")
                        }
                     />
                     <div className="text-main-gray ml-2 text-sm cursor-pointer absolute -bottom-6">
                        Введите Ваш индентификационный код, который присвоен при
                        оформлении
                        <span className="text-main-green cursor-pointer hover:underline">
                           Соглашения о сотрудничестве
                        </span>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
         <p
            className={`align-middle text-red-600 min-h-4 my-5 transition-opacity duration-300 ${
               loginErrorMessage ? "opacity-100" : "opacity-0"
            }`}
         >
            {loginErrorMessage || " "}
         </p>

         <button
            onClick={handleSubmitLogin}
            className="bg-main-green text-white font-semibold mb-7 py-3 px-8 rounded-full cursor-pointer"
         >
            ВОЙТИ
         </button>
        {(loginUserType.type !== UserType.ADMIN.type && loginUserType.type !== UserType.COURIER.type) && <div className="text-main-gray font-medium text-center">
            Ещё нет аккаунта?{" "}
            <span
               className="text-main-green cursor-pointer hover:underline"
               onClick={handleRegistrationNavigate}
            >
               Зарегистрироваться
            </span>
            <div>
               <div className="h-2" />
               <div>или</div>
               <div className="h-2" />
               <span
                  className="text-dark-green font-bold cursor-pointer hover:underline"
                  onClick={() => setLoginUserType(UserType.PRODUCER)}
               >
                  Я - производитель
               </span>
            </div>
         </div>}
      </div>
   );
};

export default LoginPage;
