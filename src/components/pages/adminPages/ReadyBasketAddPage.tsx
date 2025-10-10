"use client";
import { FC, useEffect, useState } from "react";
import AddPhotoInput from "@/components/ui/AddPhotoInput";
import Textarea from "@/components/ui/Textarea";
import { Modal } from "@/components/ui/modals/Modal";
import AddProductsToReadyBasketModal from "@/components/ui/modals/modalContents/AddProductsToReadyBasketModal";
import { ICountedProduct } from "@/types/entities/Product";
import Image from "next/image";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
   import { calculatePriceReadyBasket } from "@/utils/PriceUtils";
import { useStores } from "@/hooks/useStores";
import { CreateReadyBasketRequest } from "@/types/requests/ProductRequests";

const DeliveryTimeFilter = ({
   setValue,
}: {
   setValue: (value: number) => void;
}) => {
   const deliveryTimeValues = [0, 1, 2, 3, 4, 5, 6, 7];
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
      overprice: number | null;
      description: string;
      composition: string;
      storageConditions: string;
      images: File[];
      package: string;
      delivery: number;
   };
   errors: {
      title: string | null;
      products: string | null;
      overprice: string | null;
      description: string | null;
      composition: string | null;
      storageConditions: string | null;
      images: string | null;
      package: string | null;
      delivery: string | null;
   };
}

const ReadyBasketAddPage: FC = () => {
    const {adminStore} = useStores();
   const [isProductsModalOpen, setIsProductsModalOpen] = useState(false);
   const [selectedProducts, setSelectedProducts] = useState<ICountedProduct[]>(
      []
   );
   const [totalPrice, setTotalPrice] = useState(0);

   // const [isInStock, setIsInStock] = useState(false);

   const [form, setForm] = useState<FormState>({
      values: {
         title: "",
         overprice: 1001,
         description: "",
         composition: "",
         storageConditions: "",
         images: [],
         package: "",
         delivery: 0,
      },
      errors: {
         title: null,
         products: null,
         overprice: null,
         description: null,
         composition: null,
         storageConditions: null,
         images: null,
         package: null,
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
         products: null,
         overprice: null,
         description: null,
         composition: null,
         storageConditions: null,
         images: null,
         package: null,
         delivery: null,
      };

      if (!form.values.title) {
         newErrors.title = "Введите название товара";
      }

      if (!form.values.images || form.values.images.length === 0) {
         newErrors.images = "Выберите изображение";
      }

      if (selectedProducts.length === 0) {
         newErrors.products = "Выберите продукты";
      }

      //   if (!form.values.overprice) {
      //      newErrors.overprice = "Введите надбавку";
      //   }
    

      setForm((prev) => ({
         ...prev,
         errors: newErrors,
      }));

      return Object.values(newErrors).some((error) => error !== null);
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const hasErrors = validateForm();
      

      if (hasErrors) return;

      const payload = {
        ...form.values,
        overprice: form.values.overprice && form.values.overprice > 0 ? form.values.overprice : 1001,
        description: form.values.description || "-",
        composition: form.values.composition || "-",
        storageConditions: form.values.storageConditions || "-",
        package: form.values.package || "-",
        products: selectedProducts.map((product) => ({
            productId: product.id,
            amount: product.amount,
        })),
    };

      await adminStore.createReadyBasket(payload as CreateReadyBasketRequest);
   };

   useEffect(() => {
   

      setTotalPrice(
         calculatePriceReadyBasket({
            objects: selectedProducts.map((product) => ({
               price: Number(product.price),
               basePrice: Number(product.basePrice),
               amount: Number(product.amount),
               discount: Number(product.discount),
               overprice: Number(product.overprice),
            })),
            overprice: Number(form.values.overprice),
         })
      );
   }, [form.values.overprice, selectedProducts]);



   return (
      <div className="bg-white w-full overflow-y-hidden p-8 gap-y-8 flex flex-col font-geist">
         <div className="flex flex-col w-full md:flex-row items-center lg:items-start gap-y-5 gap-x-5">
           <div className="w-60">
            <AddPhotoInput
               images={form.values.images}
               error={form.errors.images}
               onChange={(files) => handleChange("images", files)}
               isEditable
            />
            </div>
            <div className="flex w-full md:w-1/3 flex-col justify-center items-between gap-y-2">
               <div
                  className={`w-full flex items-center gap-x-2 px-2 outline-none border-2 rounded-md ${
                     form.errors.title
                        ? "border-red-500"
                        : "border-transparent focus-within:border-main-gray"
                  }`}
               >
                  <input
                     className={`outline-none grow py-2 text-main-green font-semibold md:text-lg text-sm ${
                        form.errors.title
                           ? "placeholder:text-red-500"
                           : "placeholder:text-main-gray "
                     }`}
                     placeholder={
                        form.errors.title
                           ? form.errors.title
                           : "Введите название готовой корзины"
                     }
                     value={form.values.title || ""}
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

               <button
                  className={`w-full text-start p-2 border-2 border-transparent rounded-md text-main-gray font-semibold md:text-lg text-sm ${
                     form.errors.products
                        ? "text-red-500"
                        : "text-main-gray"
                  }`}
                  onClick={() => setIsProductsModalOpen(true)}
               >
                  {form.errors.products
                     ? form.errors.products
                     : "Выбрать продукты для корзины"}
               </button>

               <div
                  className={`border-2 flex items-center md:gap-x-4 justify-between md:justify-start rounded-md p-2 ${
                     form.errors.overprice
                        ? "border-red-500"
                        : "focus-within:border-main-gray border-transparent"
                  }`}
               >
                  <span
                     className={`font-semibold md:text-lg text-sm ${
                        form.errors.overprice
                           ? "text-red-500"
                           : "text-main-gray"
                     }`}
                  >
                     Введите наценку
                  </span>
                  <input
                     type="text"
                     className={`outline-none w-20 text-main-gray font-medium rounded-md text-center ${
                        form.errors.overprice
                           ? "placeholder:text-red-500 bg-red-500/10"
                           : "placeholder:text-main-gray bg-main-gray/10"
                     }`}
                     placeholder={
                        form.errors.overprice ? form.errors.overprice : ""
                     }
                     value={
                        form.values.overprice === 1001
                           ? ""
                           : form.values.overprice ?? ""
                     }
                     onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                           e.preventDefault();
                        }
                     }}
                     onChange={(e) => {
                        const value = e.target.value;
                     
                        if (
                           value === "" ||
                           (/^\d+$/.test(value) && parseInt(value) >= 0)
                        ) {
                           handleChange(
                              "overprice",
                              value === "" ? null : parseInt(value)
                           );
                        }
                     }}
                     onBlur={(e) => {
                        const value = parseInt(e.target.value);
                        if (isNaN(value)) {
                           e.target.value = "";
                           handleChange("overprice", null);
                        }
                     }}
                  />

                  <span
                     className={`text-main-gray font-semibold md:text-lg text-sm ${
                        form.errors.overprice
                           ? "text-red-500"
                           : "text-main-gray"
                     }`}
                  >
                     %
                  </span>
               </div>

               <div className="text-main-gray p-2 border-2 border-transparent rounded-md font-semibold md:text-lg text-sm">
                  Итоговая цена: {totalPrice} р.
               </div>
            </div>

            {isProductsModalOpen && (
               <Modal
                  isOpen={isProductsModalOpen}
                  onClose={() => setIsProductsModalOpen(false)}
                  size="h-full xl:w-1/2 w-full"
               >
                  <AddProductsToReadyBasketModal
                     onClose={() => setIsProductsModalOpen(false)}
                     selectedProducts={selectedProducts}
                     setSelectedProducts={setSelectedProducts}
                  />
               </Modal>
            )}
         </div>
         <div className="flex overflow-x-auto w-full md:flex-row gap-y-5 gap-x-5">
            {selectedProducts.map((product) => (
               <div
                  className="flex flex-col border-2 min-w-96 border-main-green rounded-md p-2 items-start gap-x-2 gap-y-3 relative"
                  key={product.id}
               >
                  <div className="flex gap-x-2 items-center">
                     <div className="relative w-32 h-32">
                        <Image
                           src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${product.images[0]}`}
                           alt={product.title}
                           fill
                           className="w-full h-full object-cover rounded-lg"
                        />
                     </div>
                     <div className="flex flex-col gap-y-2 mx-4 w-20 items-center">
                        <button
                           className="text-white bg-main-green rounded-full p-1 font-semibold md:text-lg text-sm"
                           onClick={() =>
                              setSelectedProducts(
                                 selectedProducts.map((p) =>
                                    p.id === product.id
                                       ? { ...p, amount: p.amount + 1 }
                                       : p
                                 )
                              )
                           }
                        >
                           <PlusIcon className="size-4 stroke-2" />
                        </button>
                        <span className="text-dark-gray truncate font-semibold md:text-lg text-sm">
                           {product.saleVolume*product.amount} {product.unit }
                        </span>
                        <button
                           className="text-white bg-main-green rounded-full p-1 font-semibold md:text-lg text-sm"
                           onClick={() =>
                              setSelectedProducts(
                                 selectedProducts.map((p) =>
                                    p.id === product.id
                                       ? { ...p, amount:  p.amount >1 ? p.amount - 1 : 1 }
                                       : p
                                 )
                              )
                           }
                        >
                           <MinusIcon className="size-4 stroke-2" />
                        </button>
                     </div>
                  </div>
                  <div className="flex gap-x-2">
                     <div className="flex flex-col gap-y-1">
                        <span className="text-dark-gray font-semibold truncate">
                           {product.title}
                        </span>
                        <span className="text-main-gray truncate ">
                           Продавец: {product.producerName}
                        </span>
                        <span className="text-dark-gray truncate">
                           Цена: {product.price} р./{product.saleVolume}{" "}
                           {product.unit}
                        </span>
                     </div>
                  </div>

                  <button
                     className="absolute top-2 right-2"
                     onClick={() =>
                        setSelectedProducts(
                           selectedProducts.filter((p) => p.id !== product.id)
                        )
                     }
                  >
                     <XMarkIcon className="size-6" />
                  </button>
               </div>
            ))}
         </div>
         <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5 gap-y-4">
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
         <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-5">
            {/* <div
               className={`border-2 flex items-center md:gap-x-4 justify-between md:justify-start rounded-xl p-2 ${
                  form.errors.price ? "border-red-500" : "border-main-gray"
               }`}
            >
               <span
                  className={`font-semibold md:text-lg text-sm ${
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
            </div> */}
         </div>
         <div className="flex flex-col md:flex-row gap-y-6 md:gap-x-5 md:items-end justify-between w-full">
            <div className="flex flex-col md:w-fit w-full items-start md:items-center gap-y-2">
               <span className="font-semibold text-main-gray">
                  Укажите время для подготовки заказа (в днях):
               </span>
               <DeliveryTimeFilter
                  setValue={(value) => handleChange("delivery", value)}
               />
            </div>
            <button
               onClick={handleSubmit}
               className="bg-main-green text-white py-2 px-4 rounded-full font-medium shadow-md/40 hover:scale-110 transition-all duration-100 md:w-fit w-full"
            >
               СОХРАНИТЬ
            </button>
         </div>
      </div>
   );
};

export default ReadyBasketAddPage;
