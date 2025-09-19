"use client";
import { FC, useState } from "react";
import Input from "@/components/ui/Input";
import { validatePhoneNumber } from "@/utils/ValidateUtils";
import { useStores } from "@/hooks/useStores";
import routes from "@/constants/routes";
import { useRouter } from "next/navigation";
interface FormState {
   values: {
      surname: string;
      name: string;
      address: string;
      phoneNumber: string;
   };
   errors: {
      surname: string | null;
      name: string | null;
      address: string | null;
      phoneNumber: string | null;
   };
}



const CustomerProfileEditPage: FC = () => {
   const { customerStore } = useStores();
   const profile = customerStore.profile;
   const router = useRouter();

   const [form, setForm] = useState<FormState>({
      values: {
         surname: profile?.surname ?? "",
         name: profile?.name ?? "",
         address: profile?.address ?? "",
         phoneNumber: profile?.phoneNumber ?? "",
      },
      errors: {
         surname: null,
         name: null,
         address: null,
         phoneNumber: null,
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
         surname: null,
         name: null,
         address: null,
         phoneNumber: null,
      };

      if (form.values.surname.trim() === "") {
         newErrors.surname = "Фамилия обязательна";
      }

      if (form.values.name.trim() === "") {
         newErrors.name = "Имя обязательно";
      }

      if (form.values.address.trim() === "") {
         newErrors.address = "Адрес обязателен";
      }

      newErrors.phoneNumber = validatePhoneNumber(form.values.phoneNumber);

      setForm((prev) => ({
         ...prev,
         errors: newErrors,
      }));

      return Object.values(newErrors).some((error) => error !== null);
   };

   const handleSubmit = async () => {
      if (validateForm()) {
         return;
      }

      const cleanedPhone = form.values.phoneNumber.replace(/[\s-]/g, "");

      const data = {
         surname: form.values.surname,
         name: form.values.name,
         address: form.values.address,
         phoneNumber: cleanedPhone,
      };

      const result = await customerStore.updateCustomer(data);

      if (result.success) {
         router.push(routes.users.profile);
      } else {
         console.error("Ошибка при обновлении данных:", result.message);
      }
   };

   return (
      <div className="h-fit font-geist md:px-20 px-6 md:py-8 py-2">
         <div className="flex h-fit md:mt-10 md:mb-20 mt-5 mb-10 justify-start items-center md:gap-x-8 gap-x-4">
            <button
               onClick={() => {
                  router.push(routes.users.profile);
               }}
               className="flex items-center justify-center cursor-pointer text-main-green md:border-3 border-2 border-main-green rounded-full p-1 hover:scale-110 transition-all duration-100"
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="md:size-8 size-6"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
               </svg>
            </button>
            <h1 className="md:text-3xl text-xl text-main-green font-bold ">
               ЛИЧНЫЙ КАБИНЕТ
            </h1>
         </div>

         <div className="flex flex-col gap-y-4 md:w-1/2 w-full">
            <Input
               placeholder="Фамилия"
               value={form.values.surname}
               onChange={(value) => handleChange("surname", value)}
               error={form.errors.surname}
               onResetError={() => handleChange("surname", form.values.surname)}
            />
            <Input
               placeholder="Имя"
               value={form.values.name}
               onChange={(value) => handleChange("name", value)}
               error={form.errors.name}
               onResetError={() => handleChange("name", form.values.name)}
            />
            <Input
               placeholder="Адрес"
               value={form.values.address}
               onChange={(value) => handleChange("address", value)}
               error={form.errors.address}
               onResetError={() => handleChange("address", form.values.address)}
            />
            <Input
               placeholder="Номер телефона"
               value={form.values.phoneNumber}
               onChange={(value) => handleChange("phoneNumber", value)}
               error={form.errors.phoneNumber}
               onResetError={() =>
                  handleChange("phoneNumber", form.values.phoneNumber)
               }
            />
         </div>
         <p className="text-main-green md:mt-16 mt-5">
            Контактная информация упрощает доставку Вашего заказа. Вы можете
            поменять ее в любой момент
         </p>
         <div className="w-full flex justify-end mt-5">
            <button
               onClick={handleSubmit}
               className="bg-main-green text-white font-semibold mb-7 py-3 px-8 rounded-full cursor-pointer"
            >
               СОХРАНИТЬ
            </button>
         </div>
      </div>
   );
};

export default CustomerProfileEditPage;
