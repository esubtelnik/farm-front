"use client";
import { FC, useState } from "react";
import Input from "@/components/ui/Input";
import { validateCode } from "@/utils/ValidateUtils";

interface EmailVerificationProps {
   setRegisterData: (code: string) => void;
   errorMessage: string;
}

interface FormState {
   values: {
      code: string;
   };
   errors: {
      code: string | null;
   };
}

const EmailVerification: FC<EmailVerificationProps> = ({
   setRegisterData,
   errorMessage,
}) => {
   const [form, setForm] = useState<FormState>({
      values: {
         code: "",
      },
      errors: {
         code: null,
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
         code: null,
      };
      newErrors.code = validateCode(form.values.code);

      setForm((prev) => ({
         ...prev,
         errors: newErrors,
      }));

      return Object.values(newErrors).some((error) => error !== null);
   };

   const handleSubmitVerifyCode = async (e: React.FormEvent) => {
      e.preventDefault();

      const hasErrors = validateForm();
      if (!hasErrors) {
         setRegisterData(form.values.code);
      }
   };

   return (
      <div className="w-full flex flex-col items-start justify-center font-geist p-2 ">
         <h1 className="md:text-3xl text-xl text-main-green font-bold">РЕГИСТРАЦИЯ</h1>
         <p className="md:text-base text-sm/5 font-normal text-main-gray my-4 ">
            На Ваш E-mail придет код-подтверждение в течение 3 минут. Введите
            код-подтверждение в поле для ввода
         </p>
         <div className="w-full flex flex-col md:space-y-6 space-y-4 md:mb-6 mb-4 ">
            <Input
               placeholder="Код"
               value={form.values.code}
               onChange={(value) => handleChange("code", value)}
               error={form.errors.code}
               onResetError={() => handleChange("code", form.values.code)}
            />
         </div>
         <div className="flex gap-x-8 items-center md:mt-7 mt-4">

         <button
            onClick={handleSubmitVerifyCode}
            className="bg-main-green text-white font-semibold py-3 px-8 w-full md:w-fit rounded-full"
         >
            ПРОДОЛЖИТЬ
         </button>
         <p className="h-full align-middle text-red-600">{errorMessage}</p>

         </div>
      </div>
   );
};

export default EmailVerification;
