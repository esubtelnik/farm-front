"use client";
import { FC, useState } from "react";
import Input from "@/components/ui/Input";
import { validatePhoneNumber } from "@/utils/ValidateUtils";
import { useStores } from "@/hooks/useStores";
import routes from "@/constants/routes";
import { useRouter } from "next/navigation";
interface FormState {
   values: {
      fio: string;
      address: string;
      phoneNumber: string;
      carNumber: string;
   };
   errors: {
      fio: string | null;
      address: string | null;
      phoneNumber: string | null;
      carNumber: string | null;
   };
}


const CourierProfileEditPage: FC = () => {
   const { courierStore } = useStores();
   const profile = courierStore.profile;
   const router = useRouter();
   const [form, setForm] = useState<FormState>({
      values: {
         fio: profile?.fio ?? "",
         address: profile?.address ?? "",
         carNumber: profile?.carNumber ?? "",
         phoneNumber: profile?.phoneNumber ?? "",
      },
      errors: {
         fio: null,
         address: null,
         phoneNumber: null,
         carNumber: null,
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
         fio: null,
         address: null,
         phoneNumber: null,
         carNumber: null,
      };

      if (form.values.fio.trim() === "") {
         newErrors.fio = "ФИО обязательно";
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
         fio: form.values.fio,
         address: form.values.address,
         carNumber: form.values.carNumber,
         phoneNumber: cleanedPhone,
      };
      
      const result = await courierStore.updateCourier(data);

      if (result.success) {
         router.push(routes.users.profile);
      } else {
         console.log("Ошибка при обновлении данных:", result.message);
      }
   };

   return (
      <div className="h-fit font-geist px-20 py-8">
         <h1 className="text-3xl text-main-green font-bold mt-10 mb-20">
            ЛИЧНЫЙ КАБИНЕТ
         </h1>
         <div className="flex flex-col gap-y-4 w-1/2">
            <Input
               placeholder="Фамилия"
               value={form.values.fio}
               onChange={(value) => handleChange("fio", value)}
               error={form.errors.fio}
               onResetError={() => handleChange("fio", form.values.fio)}
            />
            <Input
               placeholder="Адрес"
               value={form.values.address}
               onChange={(value) => handleChange("address", value)}
               error={form.errors.address}
               onResetError={() => handleChange("address", form.values.address)}
            />
            {/* <Input
               placeholder="Адрес"
               value={form.values.address}
               onChange={(value) => handleChange("address", value)}
               error={form.errors.address}
               onResetError={() => handleChange("address", form.values.address)}
            /> */}
            <Input
               placeholder="Номер телефона"
               value={form.values.phoneNumber}
               onChange={(value) => handleChange("phoneNumber", value)}
               error={form.errors.phoneNumber}
               onResetError={() =>
                  handleChange("phoneNumber", form.values.phoneNumber)
               }
            />
            <Input
               placeholder="Номер машины"
               value={form.values.carNumber}
               onChange={(value) => handleChange("carNumber", value)}
               error={form.errors.carNumber}
               onResetError={() =>
                  handleChange("phoneNumber", form.values.phoneNumber)
               }
            />
         </div>
         <p className="text-main-green mt-16">
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

export default CourierProfileEditPage;
