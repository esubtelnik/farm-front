import { FC, useState } from "react";
import Input from "@/components/ui/Input";
import Switcher from "@/components/ui/Switcher";
import { validateEmail } from "../../utils/ValidateUtils";
import { UserTypeValue } from "../../types/entities/User";
import { UserType } from "../../constants/UserTypeEnum";

interface RegistrationFormProps {
   userType: UserTypeValue;
   setRegisterData: (
      email: string,
      password: string,
      fio?: string,
      workCode?: string
   ) => void;
   errorMessage: string;
}

interface FormState {
   values: {
      email: string;
      password: string;
      fio?: string;
      workCode?: string;
      agreement: boolean;
   };
   errors: {
      email: string | null;
      password: string | null;
      fio: string | null;
      workCode: string | null;
      agreement: string | null;
   };
}

const RegistrationForm: FC<RegistrationFormProps> = ({
   userType,
   setRegisterData,
   errorMessage,
}) => {
   const [form, setForm] = useState<FormState>({
      values: {
         email: "",
         password: "",
         fio: "",
         workCode: "",
         agreement: false,
      },
      errors: {
         email: null,
         password: null,
         fio: null,
         workCode: null,
         agreement: null,
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
         fio: null,
         workCode: null,
         agreement: null,
      };
      newErrors.email = validateEmail(form.values.email);

      if (form.values.password.length < 6) {
         newErrors.password = "Пароль должен быть минимум 6 символов";
      }
      if (
         (userType.type === UserType.PRODUCER.type || userType.type === UserType.COURIER.type) &&
         (!form.values.workCode || form.values.workCode.length < 3)
      ) {
         newErrors.workCode = "Введите корректный код";
      }

      if (!form.values.agreement) {
         newErrors.agreement = "Подтвердите соглашение";
      }

      setForm((prev) => ({
         ...prev,
         errors: newErrors,
      }));
      console.log(newErrors);

      return Object.values(newErrors).some((error) => error !== null);
   };

   const handleSubmitRegistration = async (e: React.FormEvent) => {
      e.preventDefault();

      const hasErrors = validateForm();

      if (!hasErrors) {
         console.log(userType);
         switch (userType.type) {
            case UserType.PRODUCER.type:
               {
                  setRegisterData(
                     form.values.email,
                     form.values.password,
                     form.values.fio,
                     form.values.workCode
                  );
               }
               break;
            case UserType.CUSTOMER.type:
               {
                  setRegisterData(form.values.email, form.values.password);
               }
               break;
            case UserType.COURIER.type:
               {
                  setRegisterData(
                     form.values.email,
                     form.values.password,
                     form.values.fio,
                     form.values.workCode
                  );
               }
               break;
         }
      }
   };

   return (
      <div className="w-full flex flex-col items-start justify-center font-geist p-2">
         <h1 className="text-3xl text-main-green font-bold">РЕГИСТРАЦИЯ</h1>
         <p className="text-base font-normal text-main-gray my-4 ">
            Зарегистрируйтесь, чтобы иметь доступ к настройкам личного кабинета,
            истории заказов, чату с производителями, подписке на продукты и
            корзину. <span className="font-bold">FARM-BASKET</span> знает все
            про удобство покупок!
         </p>
         <div className="w-full flex flex-col space-y-6 mb-6 ">
            {(userType?.type === UserType.PRODUCER.type ||
               userType?.type === UserType.COURIER.type) && (
               <Input
                  placeholder="ФИО"
                  value={form.values.fio || ""}
                  onChange={(value) => handleChange("fio", value)}
                  error={form.errors.fio}
                  onResetError={() => handleChange("fio", form.values.fio)}
               />
            )}

            <Input
               placeholder="E-mail"
               value={form.values.email}
               onChange={(value) => handleChange("email", value)}
               error={form.errors.email}
               onResetError={() => handleChange("email", form.values.email)}
            />
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
            {userType?.type === UserType.PRODUCER.type ||
               (userType?.type === UserType.COURIER.type && (
                  <div className="flex flex-col mb-5">
                     <Input
                        placeholder="Код"
                        value={form.values.workCode || ""}
                        onChange={(value) => handleChange("workCode", value)}
                        error={form.errors.workCode}
                        onResetError={() =>
                           handleChange("workCode", form.values.workCode || "")
                        }
                     />

                     <div className="text-main-gray ml-2 text-sm cursor-pointer">
                        Введите Ваш индентификационный код, который присвоен при
                        оформлении{" "}
                        <span className="text-main-green cursor-pointer hover:underline">
                           Соглашения о сотрудничестве
                        </span>
                     </div>
                  </div>
               ))}

            {/* {userType?.type === UserType.COURIER.type  && (
               <div className="flex flex-col mb-5">
                  <Input
                     placeholder="Код"
                     value={form.values.courierCode || ""}
                     onChange={(value) => handleChange("courierCode", value)}
                     error={form.errors.courierCode}
                     onResetError={() =>
                        handleChange(
                           "courierCode",
                           form.values.courierCode || ""
                        )
                     }
                  />

                  <div className="text-main-gray ml-2 text-sm cursor-pointer">
                     Введите Ваш индентификационный код, который был выдан
                     {/* <span className="text-main-green cursor-pointer hover:underline">
                        Соглашения о сотрудничестве
                     </span> 
                  </div>
               </div>
            )} */}
         </div>
         <div className="flex items-center gap-x-6">
            <Switcher
               isChecked={form.values.agreement}
               setIsChecked={(value) => handleChange("agreement", value)}
            />
            <div className="flex flex-col ">
               {form.errors.agreement ? (
                  <span className="text-red-600">{form.errors.agreement}</span>
               ) : (
                  <span className="text-main-green">
                     Я согласен на обработку персональных данных
                  </span>
               )}
            </div>
         </div>
         <div className="flex gap-x-8 items-center mt-7">
            <button
               onClick={handleSubmitRegistration}
               className="bg-main-green text-white font-semibold py-3 px-8 rounded-full"
            >
               ЗАРЕГИСТРИРОВАТЬСЯ
            </button>
            <p className="h-full align-middle text-red-600">{errorMessage}</p>
         </div>
      </div>
   );
};

export default RegistrationForm;
