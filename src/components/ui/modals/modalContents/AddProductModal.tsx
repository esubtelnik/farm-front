"use client";
import { FC, useEffect, useRef, useState } from "react";
import AddPhotoInput from "@/components/ui/AddPhotoInput";
import { useStores } from "@/hooks/useStores";
import { useProductContext } from "@/context/ProductContext";
import Textarea from "@/components/ui/Textarea";
import { CreateProductRequest } from "@/types/requests/ProductRequests";
import { measures } from "@/constants/constants";

const DeliveryTimeFilter = ({
   setValue,
}: {
   setValue: (value: number) => void;
}) => {
   const deliveryTimeValues = [1, 2, 3, 4, 5, 6, 7];
   const [selectedIndex, setSelectedIndex] = useState<number>(0);

   const handleDecrement = () => {
      const newIndex = Math.max(0, selectedIndex - 1);
      setSelectedIndex(newIndex);
      setValue(deliveryTimeValues[newIndex]);
   };

   const handleIncrement = () => {
      const newIndex = Math.min(
         deliveryTimeValues.length - 1,
         selectedIndex + 1
      );
      setSelectedIndex(newIndex);
      setValue(deliveryTimeValues[newIndex]);
   };

   const isMin = selectedIndex === 0;
   const isMax = selectedIndex === deliveryTimeValues.length - 1;

   return (
      <div className="flex w-full justify-center items-center space-x-3">
         <button
            onClick={handleDecrement}
            className={`size-7 font-bold flex items-center justify-center text-sm text-main-gray border-2 border-transparent hover:border-main-green box-border rounded-sm transition-all duration-300 ${
               isMin ? "hover:bg-main-green hover:text-white" : ""
            }`}
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
                  d="M5 12h14"
               />
            </svg>
         </button>
         <div className="w-fit h-6 text-center font-semibold text-main-gray">
            {deliveryTimeValues[selectedIndex]}
         </div>
         <button
            onClick={handleIncrement}
            className={`size-7 font-bold flex items-center justify-center text-sm text-main-gray border-2 border-transparent hover:border-main-green box-border rounded-sm transition-all duration-300 ${
               isMax ? "hover:bg-main-green hover:text-white" : ""
            }`}
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
                  d="M12 4.5v15m7.5-7.5h-15"
               />
            </svg>
         </button>
      </div>
   );
};

interface FormState {
   values: {
      title: string;
      price: number | null;
      productType: string;
      description: string;
      composition: string;
      storageConditions: string;
      image: File | null;
      package: string;
      expirationDate: number | null;
      volume: number | null;
      unit: string;
      delivery: number;
   };
   errors: {
      title: string | null;
      price: string | null;
      productType: string | null;
      description: string | null;
      composition: string | null;
      storageConditions: string | null;
      image: string | null;
      package: string | null;
      expirationDate: string | null;
      volume: string | null;
      unit: string | null;
      delivery: string | null;
   };
}

const AddProductModal: FC = () => {
   const { categories } = useProductContext();
   const { producerStore } = useStores();
   const categoryDropdownRef = useRef<HTMLDivElement>(null);
   const measureDropdownRef = useRef<HTMLDivElement>(null);

   const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
   const [isMeasureDropdownOpen, setIsMeasureDropdownOpen] = useState(false);
   const [selectedCategories, setSelectedCategories] = useState<string>("");
   const [selectedMeasure, setSelectedMeasure] = useState<string>("");

   const [isInStock, setIsInStock] = useState(false);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            categoryDropdownRef.current &&
            !categoryDropdownRef.current.contains(event.target as Node)
         ) {
            setIsCategoryDropdownOpen(false);
         }
         if (
            measureDropdownRef.current &&
            !measureDropdownRef.current.contains(event.target as Node)
         ) {
            setIsMeasureDropdownOpen(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
         document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   const handleCategoryToggle = (cat: string) => {
      setSelectedCategories(cat);
      handleChange("productType", cat);
      setIsCategoryDropdownOpen(false);
   };

   const handleMeasureToggle = (measure: string) => {
      setSelectedMeasure(measure);
      handleChange("unit", measure);
      setForm((prev) => ({
         ...prev,
         errors: {
            ...prev.errors,
            volume: null,
         },
      }));
      setIsMeasureDropdownOpen(false);
   };

   const [form, setForm] = useState<FormState>({
      values: {
         title: "",
         price: 0,
         productType: "",
         description: "",
         composition: "",
         storageConditions: "",
         image: null,
         package: "",
         expirationDate: 0,
         volume: 0,
         unit: "",
         delivery: 1,
      },
      errors: {
         title: null,
         price: null,
         productType: null,
         description: null,
         composition: null,
         storageConditions: null,
         image: null,
         package: null,
         expirationDate: null,
         volume: null,
         unit: null,
         delivery: null,
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
         title: null,
         price: null,
         productType: null,
         description: null,
         composition: null,
         storageConditions: null,
         image: null,
         package: null,
         expirationDate: null,
         volume: null,
         unit: null,
         delivery: null,
      };

      if (!form.values.title) {
         newErrors.title = "Введите название товара";
      }

      if (!form.values.image) {
         newErrors.image = "Выберите изображение";
      }

      if (!form.values.productType) {
         newErrors.productType = "Выберите категорию";
      }

      if (!form.values.description) {
         newErrors.description = "Введите описание товара";
      }

      if (!form.values.composition) {
         newErrors.composition = "Введите состав товара";
      }

      if (!form.values.storageConditions) {
         newErrors.storageConditions = "Введите условия хранения";
      }

      if (!form.values.package) {
         newErrors.package = "Введите упаковку";
      }

      if (!form.values.unit) {
         newErrors.unit = "Выберите единицу измерения";
         setIsMeasureDropdownOpen(true);
      }

      if (!form.values.expirationDate) {
         newErrors.expirationDate = "Введите";
      }

      if (!form.values.volume) {
         newErrors.volume = "Введите";
      }

      if (!form.values.price) {
         newErrors.price = "Введите";
      }

      setForm((prev) => ({
         ...prev,
         errors: newErrors,
      }));

      return Object.values(newErrors).some((error) => error !== null);
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const hasErrors = validateForm();
      console.log(hasErrors);

      if (hasErrors) return;

      producerStore.createProduct(form.values as CreateProductRequest);
   };

   return (
      <div className="bg-white max-h-[95vh] overflow-y-auto p-5 gap-y-8 flex flex-col font-geist">
         <div className="flex gap-x-5">
            <AddPhotoInput
               image={form.values.image || null}
               error={form.errors.image}
               onChange={(file) => handleChange("image", file)}
            />
            <div className="flex flex-col items-center gap-y-2 w-1/3">
               <div
                  className={`w-full flex items-center gap-x-2 px-2 outline-none border-2 rounded-md ${
                     form.errors.title
                        ? "border-red-500"
                        : "border-transparent focus-within:border-main-gray"
                  }`}
               >
                  <input
                     className={`outline-none grow py-2 text-main-green font-semibold text-lg ${
                        form.errors.title
                           ? "placeholder:text-red-500"
                           : "placeholder:text-main-gray "
                     }`}
                     placeholder={
                        form.errors.title
                           ? form.errors.title
                           : "Название товара"
                     }
                     value={form.values.title}
                     onChange={(e) => handleChange("title", e.target.value)}
                  />
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor"
                     className={`size-6 ${
                        form.errors.title ? "text-red-500" : "text-main-gray"
                     }`}
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                     />
                  </svg>
               </div>
               <div
                  ref={categoryDropdownRef}
                  className={`relative w-full flex items-center gap-x-2 p-2 outline-none border-2 rounded-md ${
                     form.errors.productType
                        ? "border-red-500"
                        : "border-transparent focus-within:border-main-gray"
                  }`}
               >
                  <button
                     onClick={() =>
                        setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                     }
                     className={`text-main-gray font-semibold text-lg flex justify-between items-center w-full gap-x-2 ${
                        form.errors.productType
                           ? "text-red-500"
                           : "text-main-gray"
                     }`}
                  >
                     {selectedCategories
                        ? selectedCategories
                        : form.errors.productType
                        ? form.errors.productType
                        : "Категория:"}
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`size-6 ${
                           form.errors.productType
                              ? "text-red-500"
                              : "text-main-gray"
                        }`}
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                     </svg>
                  </button>
                  {isCategoryDropdownOpen && (
                     <div className="absolute top-full left-0 mt-1 p-1 w-[400px] max-h-[200px] overflow-y-auto border-2 border-main-gray bg-white flex flex-col gap-y-1 shadow-lg/30 z-100 rounded-md">
                        {categories.map((category) => {
                           const isChecked = selectedCategories.includes(
                              category.title
                           );

                           return (
                              <button
                                 type="button"
                                 key={category.title}
                                 onClick={() =>
                                    handleCategoryToggle(category.title)
                                 }
                                 className={`w-full outline-none font-medium text-[13px] px-2 py-1 text-left rounded-sm transition-all duration-300 ${
                                    isChecked
                                       ? "bg-main-gray text-white"
                                       : "bg-white text-main-gray"
                                 }`}
                              >
                                 {category.title}
                              </button>
                           );
                        })}
                     </div>
                  )}
               </div>
               <div
                  ref={measureDropdownRef}
                  className={`relative w-full flex items-center gap-x-2 p-2 outline-none border-2 rounded-md ${
                     form.errors.unit
                        ? "border-red-500"
                        : "border-transparent focus-within:border-main-gray"
                  }`}
               >
                  <button
                     onClick={() =>
                        setIsMeasureDropdownOpen(!isMeasureDropdownOpen)
                     }
                     className={`text-main-gray font-semibold text-lg flex justify-between items-center w-full gap-x-2 ${
                        form.errors.unit ? "text-red-500" : "text-main-gray"
                     }`}
                  >
                     {form.errors.unit
                        ? form.errors.unit
                        : "Единица измерения:"}
                     <span
                        className={` text-main-gray font-md w-10 rounded-md text-center ${
                           form.errors.unit
                              ? "text-red-500 bg-red-500/10"
                              : "bg-main-gray/10"
                        }`}
                     >
                        {selectedMeasure ? selectedMeasure : "..."}
                     </span>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`size-6 ${
                           form.errors.unit ? "text-red-500" : "text-main-gray"
                        }`}
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                     </svg>
                  </button>
                  {isMeasureDropdownOpen && (
                     <div className="absolute top-full left-0 mt-1 p-1 w-[200px] max-h-[200px] overflow-y-auto border-2 border-main-gray bg-white flex flex-col gap-y-1 shadow-lg/30 z-100 rounded-md">
                        {measures.map((measure) => {
                           const isChecked = selectedMeasure === measure.title;

                           return (
                              <button
                                 type="button"
                                 key={measure.title}
                                 onClick={() =>
                                    handleMeasureToggle(measure.title)
                                 }
                                 className={`w-full outline-none font-medium text-[13px] px-2 py-1 text-left rounded-sm transition-all duration-300 ${
                                    isChecked
                                       ? "bg-main-gray text-white"
                                       : "bg-white text-main-gray"
                                 }`}
                              >
                                 {measure.title}
                              </button>
                           );
                        })}
                     </div>
                  )}
               </div>
            </div>
         </div>
         <div className="grid grid-cols-2 gap-5">
            <Textarea
               error={form.errors.description}
               value={form.values.description}
               onChange={(value) => handleChange("description", value)}
               placeholder="Описание товара"
               isIcon
               rows={6}
            />
            <Textarea
               error={form.errors.composition}
               value={form.values.composition}
               onChange={(value) => handleChange("composition", value)}
               placeholder="Состав"
               isIcon
               rows={6}
            />
            <Textarea
               error={form.errors.storageConditions}
               value={form.values.storageConditions}
               onChange={(value) => handleChange("storageConditions", value)}
               placeholder="Условия хранения"
               isIcon
               rows={2}
            />
            <Textarea
               error={form.errors.package}
               value={form.values.package}
               onChange={(value) => handleChange("package", value)}
               placeholder="Упаковка"
               isIcon
               rows={2}
            />
         </div>
         <div className="flex gap-x-5">
            <div
               className={`border-2 flex items-center gap-x-4 rounded-xl p-2 ${
                  form.errors.expirationDate
                     ? "border-red-500"
                     : "border-main-gray"
               }`}
            >
               <span
                  className={`font-semibold text-lg ${
                     form.errors.expirationDate
                        ? "text-red-500"
                        : "text-main-gray"
                  }`}
               >
                  Срок годности
               </span>
               <input
                  type="text"
                  className={`outline-none w-20 text-main-gray font-medium rounded-md text-center ${
                     form.errors.expirationDate
                        ? "placeholder:text-red-500 bg-red-500/10"
                        : "placeholder:text-main-gray bg-main-gray/10"
                  }`}
                  placeholder={
                     form.errors.expirationDate
                        ? form.errors.expirationDate
                        : ""
                  }
                  value={form.values.expirationDate || ""}
                  onKeyPress={(e) => {
                     if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                     }
                  }}
                  onChange={(e) => {
                     const value = e.target.value;
                     if (
                        value === "" ||
                        (parseInt(value) > 0 && /^\d+$/.test(value))
                     ) {
                        e.target.value = value;
                     } else {
                        e.target.value = value
                           .replace(/[^0-9]/g, "")
                           .replace(/^0+/, "");
                     }
                     handleChange("expirationDate", parseInt(value));
                  }}
                  onBlur={(e) => {
                     const value = parseInt(e.target.value);
                     if (value <= 0 || isNaN(value)) {
                        e.target.value = "";
                     }
                  }}
               />
               <span
                  className={`text-main-gray font-semibold text-lg ${
                     form.errors.expirationDate
                        ? "text-red-500"
                        : "text-main-gray"
                  }`}
               >
                  (в днях)
               </span>
            </div>
            <div
               className={`border-2 flex items-center gap-x-4 rounded-xl p-2 ${
                  form.errors.volume ? "border-red-500" : "border-main-gray"
               }`}
            >
               <span
                  className={`font-semibold text-lg ${
                     form.errors.volume ? "text-red-500" : "text-main-gray"
                  }`}
               >
                  Обьем
               </span>
               <input
                  type="text"
                  className={`outline-none  w-20 text-main-gray font-medium rounded-md text-center ${
                     form.errors.volume
                        ? "placeholder:text-red-500 bg-red-500/10"
                        : "placeholder:text-main-gray bg-main-gray/10"
                  }`}
                  placeholder={form.errors.volume ? form.errors.volume : ""}
                  value={form.values.volume || ""}
                  onKeyPress={(e) => {
                     if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                     }
                  }}
                  onChange={(e) => {
                     if (!selectedMeasure) {
                        setForm((prev) => ({
                           ...prev,
                           errors: {
                              ...prev.errors,
                              unit: "Выберите единицу измерения",
                              volume: " ",
                           },
                        }));
                        return;
                     }
                     const value = e.target.value;
                     if (
                        value === "" ||
                        (parseInt(value) > 0 && /^\d+$/.test(value))
                     ) {
                        e.target.value = value;
                     } else {
                        e.target.value = value
                           .replace(/[^0-9]/g, "")
                           .replace(/^0+/, "");
                     }
                     handleChange("volume", parseInt(value));
                  }}
                  onBlur={(e) => {
                     const value = parseInt(e.target.value);
                     if (value <= 0 || isNaN(value)) {
                        e.target.value = "";
                     }
                  }}
               />
               <span className="text-main-gray font-semibold text-lg ">
                  {selectedMeasure ? selectedMeasure : "..."}
               </span>
            </div>
            <div
               className={`border-2 flex items-center gap-x-4 rounded-xl p-2 ${
                  form.errors.price ? "border-red-500" : "border-main-gray"
               }`}
            >
               <span
                  className={`font-semibold text-lg ${
                     form.errors.price ? "text-red-500" : "text-main-gray"
                  }`}
               >
                  Стоимость
               </span>
               <input
                  type="text"
                  className={`outline-none w-20 text-main-gray font-medium rounded-md text-center ${
                     form.errors.price
                        ? "placeholder:text-red-500 bg-red-500/10"
                        : "placeholder:text-main-gray bg-main-gray/10"
                  }`}
                  placeholder={form.errors.price ? form.errors.price : ""}
                  value={form.values.price || ""}
                  onKeyPress={(e) => {
                     if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                     }
                  }}
                  onChange={(e) => {
                     const value = e.target.value;
                     if (
                        value === "" ||
                        (parseInt(value) > 0 && /^\d+$/.test(value))
                     ) {
                        e.target.value = value;
                     } else {
                        e.target.value = value
                           .replace(/[^0-9]/g, "")
                           .replace(/^0+/, "");
                     }
                     handleChange("price", parseInt(value));
                  }}
                  onBlur={(e) => {
                     const value = parseInt(e.target.value);
                     if (value <= 0 || isNaN(value)) {
                        e.target.value = "";
                     }
                  }}
               />
               <span
                  className={`text-main-gray font-semibold text-lg ${
                     form.errors.price ? "text-red-500" : "text-main-gray"
                  }`}
               >
                  р.
               </span>
            </div>

            <div
               className={`border-2 flex items-center gap-x-4 rounded-xl p-2 ${
                  form.errors.price ? "border-red-500" : "border-main-gray"
               }`}
            >
               <span
                  className={`font-semibold text-lg ${
                     form.errors.price ? "text-red-500" : "text-main-gray"
                  }`}
               >
                  Наличие
               </span>
           
                  <button
                     className={`bg-main-gray/10 cursor-pointer rounded-md  ${
                        isInStock ? "text-main-green" : "text-transparent"
                     }`}
                     onClick={() => setIsInStock(!isInStock)}
                  >
                   <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={4}
                        stroke="currentColor"
                        className="size-6"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="m4.5 12.75 6 6 9-13.5"
                        />
                     </svg>
                  </button>
             
            </div>
         </div>
         <div className="flex items-end justify-between w-full">
            <div className="flex flex-col w-fit items-center gap-y-2">
               <span className="font-semibold text-main-gray">
                  Укажите время доставки (в днях):
               </span>
               <DeliveryTimeFilter
                  setValue={(value) => handleChange("delivery", value)}
               />
            </div>
            <button
               onClick={handleSubmit}
               className="bg-main-green text-white py-2 px-4 rounded-full font-medium shadow-md/40 hover:scale-110 transition-all duration-100 w-fit"
            >
               СОХРАНИТЬ
            </button>
         </div>
      </div>
   );
};

export default AddProductModal;
