"use client";
import { FC, useState } from "react";
import RadioButtonGroup from "@/components/ui/RadiobuttonGroup";
import Input from "@/components/ui/Input";
import { validateEmail } from "@/utils/ValidateUtils";
import { useStores } from "@/hooks/useStores";
import Toast from "@/components/ui/Toast";

interface FormState {
   values: {
      email: string;
      code: string;
      overprice?: number;
   };
   errors: {
      email: string | null;
      code: string | null;
      overprice: number | null;
   };
}

const userTypes = [
   { label: "Производитель", value: "producer" },
   { label: "Курьер", value: "courier" },
];

const markupOptions = [
   { label: "15%", value: 15 },
   { label: "30%", value: 30 },
];

const RegistrationCodeForm: FC = () => {
   const { adminStore } = useStores();
   const [toast, setToast] = useState<{
      message: string;
      type: "success" | "error" | "warning";
   } | null>(null);

   const [form, setForm] = useState<FormState>({
      values: {
         email: "",
         code: "",
         overprice: markupOptions[0].value as number,
      },
      errors: {
         email: null,
         code: null,
         overprice: null,
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
         code: null,
         overprice: null,
      };
      newErrors.email = validateEmail(form.values.email);

      if (!form.values.code || form.values.code.length !== 6) {
         newErrors.code = "Введите корректный код";
      }

      setForm((prev) => ({
         ...prev,
         errors: newErrors,
      }));
      console.log(newErrors);

      return Object.values(newErrors).some((error) => error !== null);
   };

   const handleSubmitRegistrationCode = async (e: React.FormEvent) => {
      e.preventDefault();

      const hasErrors = validateForm();

      if (!hasErrors) {
         const { email, code, overprice } = form.values;
         if (selectedUserType === "producer") {
            const response = await adminStore.saveProducerCode({
               email,
               code,
               overprice: overprice || markupOptions[0].value,
            });
            if (response) {
               setToast({ message: "Код успешно выдан", type: "success" });
            } else {
               setToast({
                  message: "Произошла ошибка при выдаче кода",
                  type: "error",
               });
            }
         } else {
            const response = await adminStore.createRegistrationCourierCode({
               email,
               code,
            });
            if (response) {
               setToast({ message: "Код успешно выдан", type: "success" });
            } else {
               setToast({
                  message: "Произошла ошибка при выдаче кода",
                  type: "error",
               });
            }
         }
      }
   };

   const [selectedUserType, setSelectedUserType] = useState<string>(
      userTypes[0].value
   );

   const handleGenerateCode = () => {
      handleChange(
         "code",
         Math.floor(100000 + Math.random() * 900000).toString()
      );
   };
   return (
      <div className="border-2 border-dark-green w-full md:px-8 px-4 py-5 rounded-md flex flex-col gap-4">
         <h1 className=" lg:text-2xl md:text-xl text-lg font-bold text-main-gray">
            Выдать код на регистрацию:
         </h1>
         <RadioButtonGroup
            name="registration-code"
            options={userTypes}
            selected={selectedUserType}
            onChange={(value) => setSelectedUserType(value as string)}
         />
         <h2 className="md:text-lg text-base font-bold text-main-gray">
            Введите почту для регистрации:
         </h2>
         <div className="flex gap-4">
            <Input
               width="md:w-1/3 w-full"
               placeholder="Введите почту"
               value={form.values.email}
               onChange={(e) => handleChange("email", e)}
               error={form.errors.email}
            />
         </div>
         <h2 className="md:text-lg text-base font-bold text-main-gray">
            Введите код из 6 цифр или сгенерируйте его:
         </h2>
         <div className="flex gap-4">
            <Input
               width="md:w-1/3 w-full"
               placeholder="Введите код"
               value={form.values.code}
               onChange={(e) => handleChange("code", e)}
               error={form.errors.code}
            />
            <button
               onClick={handleGenerateCode}
               className="border-2 border-main-green text-main-green px-4 py-2 rounded-full cursor-pointer hover:scale-105 hover:border-dark-green hover:text-dark-green transition-all duration-300"
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-6"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                  />
               </svg>
            </button>
         </div>
         {selectedUserType === "producer" && (
            <>
               <h2 className="md:text-lg text-base font-bold text-main-gray">
                  Укажите наценку на продукцию (в процентах):
               </h2>
               <RadioButtonGroup
                  name="overprice"
                  options={markupOptions}
                  selected={form.values.overprice || 0}
                  onChange={(value) => handleChange("overprice", Number(value))}
                  variant="inline"
                  groupVariant="horizontal"
               />
            </>
         )}
         <button
            onClick={handleSubmitRegistrationCode}
            className="bg-main-green md:w-1/4 w-full text-white font-bold md:text-lg text-base hover:scale-105 px-4 py-2 rounded-full cursor-pointer  transition-all duration-300"
         >
            Выдать код
         </button>
         {toast && <Toast message={toast.message} type={toast.type} />}
      </div>
   );
};

export default RegistrationCodeForm;
