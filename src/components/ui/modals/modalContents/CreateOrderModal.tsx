import OrderProductList from "@/components/mainComponents/lists/OrderProductCarousel";
import { IDisplayCard } from "@/types/entities/Display";
import { IProductForOrder } from "@/types/entities/Product";
import { CreateOrderRequest } from "@/types/requests/CustomerRequests";
import { FC, useEffect, useState } from "react";
import Dropdown from "@/components/ui/Dropdown";
import { ICustomer } from "@/types/entities/User";
import { calculateTotal, getAvailableDeliveryDates } from "@/utils/PriceUtils";
import { useProductContext } from "@/context/ProductContext";
import {
   ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import { formatDeliveryOptions } from "@/utils/MappingTypes";
import { validatePhoneNumber } from "@/utils/ValidateUtils";
import { paymentMethods } from "@/constants/constants";

interface CreateOrderModalProps {
   products: IDisplayCard[];
   userInfo: ICustomer;
   handleCreateOrder: (
      payload: CreateOrderRequest
   ) => Promise<{ success: boolean; message?: string }>;
}

interface FormState {
   values: {
      products: {
         productId: string;
         isReadyBasket: boolean;
         productAmount: number;
         price: number;
      }[];
      paymentMethod: string;
      deliveryTo: string;
      address: string;
      phoneNumber: string;
      deliveryPrice: number;
      promocode: string;
      customerFio: string;
   };
   errors: {
      products: string | null;
      paymentMethod: string | null;
      deliveryTo: string | null;
      address: string | null;
      phoneNumber: string | null;
      promocode: string | null;
   };
}

const CreateOrderModal: FC<CreateOrderModalProps> = ({
   products,
   userInfo,
   handleCreateOrder,
}) => {
   const { checkPromoCode } = useProductContext();
   const [step, setStep] = useState<number>(1);
   const [productsForOrder, setProductsForOrder] = useState<IProductForOrder[]>(
      products.map((p) => ({
         id: p.id,
         image: p.image,
         title: p.title,
         price: p.price,
         unit: p.unit,
         amount: 1,
         saleVolume: p.saleVolume,
         delivery: p.delivery,
         isReadyBasket: p.type === "basket" ? true : false,
         isAvailable: p.isAvailable,
      }))
   );
   const { total, deliveryFee } = calculateTotal(productsForOrder, 50);

   const [form, setForm] = useState<FormState>({
      values: {
         products: productsForOrder.map((p) => ({
            productId: p.id,
            isReadyBasket: p.isReadyBasket,
            productAmount: p.amount,
            price: p.price,
         })),
         paymentMethod: paymentMethods[0].value,
         deliveryTo: "",
         address: userInfo.address,
         phoneNumber: userInfo.phoneNumber,
         promocode: "",
         deliveryPrice: deliveryFee,
         customerFio: `${userInfo.name} ${userInfo.surname}`,
      },
      errors: {
         products: null,
         paymentMethod: null,
         deliveryTo: null,
         address: null,
         phoneNumber: null,
         promocode: null,
      },
   });

   const handleChange = <K extends keyof FormState["values"]>(
      field: K,
      value: FormState["values"][K]
   ) => {
      setCreateOrderErrorMessage("");
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

   const [promoValid, setPromoValid] = useState<boolean | null>(null);
   const [promoDiscount, setPromoDiscount] = useState<number | null>(null);
   const [promoMessage, setPromoMessage] = useState<string | null>(null);
   const [isCheckingPromo, setIsCheckingPromo] = useState<boolean>(false);
   const [deliveryOptions, setDeliveryOptions] = useState<
      { label: string; value: string }[]
   >([]);
   const updateProductAmount = (
      productId: string | number,
      newAmount: number
   ) => {
      setProductsForOrder((prev) =>
         prev.map((p) => (p.id === productId ? { ...p, amount: newAmount } : p))
      );
   };

   const [createOrderErrorMessage, setCreateOrderErrorMessage] = useState<
      string | null
   >(null);

   const handleCheckPromoCode = async () => {
      const response = await checkPromoCode(form.values.promocode.trim());
      if (response.success && response.data) {
         setPromoValid(true);
         setPromoDiscount(response.data.discount);
         setPromoMessage(`Промокод активен! (-${response.data.discount}%)`);
      } else {
         setPromoValid(false);
         setPromoMessage(response.message || "Неверный промокод");
      }
   };

   useEffect(() => {
      if (form.values.promocode.length > 5) {
         setIsCheckingPromo(true);

         const timeout = setTimeout(async () => {
            await handleCheckPromoCode();
            setIsCheckingPromo(false);
         }, 500);

         return () => clearTimeout(timeout);
      } else {
         setPromoValid(null);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [form.values.promocode]);

   useEffect(() => {
      const dates = getAvailableDeliveryDates(productsForOrder);
      setDeliveryOptions(formatDeliveryOptions(dates));
   }, [productsForOrder]);

   const validateForm = () => {
      const newErrors: FormState["errors"] = {
         products: null,
         paymentMethod: null,
         deliveryTo: null,
         address: null,
         phoneNumber: null,
         promocode: null,
      };

      if (form.values.products.length === 0) {
         newErrors.products = "Выберите товары";
      }

      if (!form.values.paymentMethod) {
         newErrors.paymentMethod = "Выберите способ расчета";
      }

      if (!form.values.deliveryTo) {
         newErrors.deliveryTo = "Выберите дату";
         setCreateOrderErrorMessage("Выберите дату доставки");
      }

      if (!form.values.address) {
         newErrors.address = "Введите адрес доставки";
         setCreateOrderErrorMessage("Проверьте все ли поля заполнены");
      }

      newErrors.phoneNumber = validatePhoneNumber(form.values.phoneNumber);
      if (newErrors.phoneNumber) {
         setCreateOrderErrorMessage("Проверьте все ли поля заполнены");
      }

      if (promoValid === false) {
         newErrors.promocode = "Промокод недействителен";
      }

      setForm((prev) => ({
         ...prev,
         errors: newErrors,
      }));
      return Object.values(newErrors).some((error) => error !== null);
   };

   const handleSubmitCreateOrder = async () => {
      setCreateOrderErrorMessage("");

      const hasErrors = validateForm();

      if (!hasErrors) {
         const { promocode, ...rest } = form.values;

         const payload: CreateOrderRequest = {
            ...rest,
            ...(promocode?.trim() ? { promocode } : {}),
         };
         const result = await handleCreateOrder(payload);
         if (result.message) {
            setCreateOrderErrorMessage(result.message);
         }
      }
   };

   return (
      <div className="flex flex-col w-full items-center md:gap-6 gap-3 pt-10 md:p-10 pb-7 px-3">
         {step === 1 && (
            <div className="w-full md:min-w-3xl xl:min-w-4xl flex flex-col gap-6">
               <OrderProductList
                  products={productsForOrder}
                  updateProductAmount={updateProductAmount}
               />
               <div className="flex md:flex-row flex-col justify-between text-dark-gray gap-y-3">
                  <div className="flex items-center gap-x-2 ">
                     <span className="text-sm md:text-base font-medium">
                        Сумма заказа:
                     </span>
                     <span className="text-sm md:text-lg font-semibold">
                        {total} р.
                     </span>
                     {deliveryFee > 0 && (
                        <sup className="text-xs md:text-sm  text-main-green">
                           доставка {deliveryFee} р.
                        </sup>
                     )}
                  </div>
                  <div className="flex justify-end">
                     <button
                        onClick={() => setStep(2)}
                        className="bg-main-green w-full md:w-fit align-middle text-sm md:text-base text-white py-2 md:px-6 px-2 rounded-full font-medium hover:shadow-md hover:scale-105 transition-all duration-200"
                     >
                        Перейти к оформлению доставки
                     </button>
                  </div>
               </div>
            </div>
         )}

         {step === 2 && (
            <div className="w-full md:w-fit">
               <button
                  onClick={() => setStep(1)}
                  className="text-dark-gray flex items-center gap-x-2 font-medium hover:underline transition"
               >
                  <ChevronLeftIcon className="md:w-6 w-4 md:h-6 h-4" />{" "}
                  <span className="text-dark-gray text-sm md:text-base font-medium">
                     Назад к выбору товаров
                  </span>
               </button>
               <div className="w-full md:w-md bg-white rounded-2xl md:p-6 py-3 px-1 text-dark-gray flex flex-col gap-y-4 animate-fadeIn">
                  <h2 className="text-base w-full text-center md:text-xl font-semibold text-dark-gray mb-2">
                     Оформление доставки
                  </h2>
                  <div className="flex text-sm md:text-base text-dark-gray items-center justify-between">
                     <span className="font-medium">Сумма заказа:</span>
                     <div className="space-x-2">
                        <span
                           className={`${
                              promoDiscount
                                 ? `decoration line-through text-base md:text-lg font-normal`
                                 : "text-lg font-semibold"
                           }`}
                        >
                           {total} р.
                        </span>
                        {promoDiscount && (
                           <span className="text-main-green text-base md:text-lg font-semibold">
                              {(total - (promoDiscount * total) / 100).toFixed(
                                 2
                              )}{" "}
                              р.
                           </span>
                        )}
                     </div>
                  </div>
                  <div className="flex  justify-between items-center gap-x-2">
                     <label className="text-sm font-medium mb-2">
                        Доставим в:
                     </label>
                     <Dropdown
                        width="w-full md:w-52"
                        options={deliveryOptions}
                        value={form.values.deliveryTo}
                        placeholder="Выберите дату"
                        onChange={(value) => handleChange("deliveryTo", value)}
                        error={form.errors.deliveryTo}
                     />
                  </div>

                  <div className="flex flex-col">
                     <label className="text-sm flex font-medium mb-1">
                        Адрес доставки (в пределах Гродно)
                     </label>
                     <input
                        className={`border border-main-gray/50 rounded-lg md:px-3 px-2 py-2 text-sm md:text-base focus:outline-none focus:border-beige transition ${
                           form.errors.address
                              ? "border-red-600"
                              : "border-main-gray/50"
                        }`}
                        value={form.values.address}
                        onChange={(e) =>
                           handleChange("address", e.target.value)
                        }
                        placeholder={form.errors.address || "Введите ваш адрес"}
                     />
                  </div>
                  <div className="flex flex-col">
                     <label className="text-sm font-medium mb-1">
                        Номер телефона
                     </label>
                     <input
                        className={`border border-main-gray/50 rounded-lg md:px-3 px-2 py-2 text-sm md:text-base focus:outline-none focus:border-beige transition ${
                           form.errors.phoneNumber
                              ? "border-red-600"
                              : "border-main-gray/50"
                        }`}
                        value={form.values.phoneNumber}
                        onChange={(e) =>
                           handleChange("phoneNumber", e.target.value)
                        }
                        placeholder={
                           form.errors.phoneNumber ||
                           "Введите ваш номер телефона"
                        }
                     />
                  </div>

                  <div className="flex flex-col">
                     <label className="text-sm font-medium mb-1">
                        Промокод
                     </label>
                     <input
                        className={`border  border-main-gray/50 rounded-lg md:px-3 px-2 py-2 text-sm md:text-base focus:outline-none focus:border-beige transition ${
                           form.errors.promocode
                              ? "border-red-600"
                              : "border-main-gray/50"
                        }`}
                        value={form.values.promocode}
                        onChange={(e) =>
                           handleChange("promocode", e.target.value)
                        }
                        placeholder={
                           form.errors.promocode || "Введите промокод"
                        }
                     />
                     <div className="text-sm min-h-5">
                        {form.values.promocode.length > 5 &&
                           (isCheckingPromo ? (
                              <span className="text-gray-500">
                                 Проверка промокода...
                              </span>
                           ) : promoValid === true ? (
                              <span className="text-main-green">
                                 {promoMessage}
                              </span>
                           ) : promoValid === false ? (
                              <span className="text-red-600">
                                 {promoMessage}
                              </span>
                           ) : null)}
                     </div>
                  </div>

                  <div className="flex flex-col">
                     <label className="text-sm font-medium mb-2">
                        Способ расчета:
                     </label>
                     <Dropdown
                        width="w-full"
                        options={paymentMethods}
                        value={form.values.paymentMethod}
                        onChange={(value) =>
                           handleChange("paymentMethod", value)
                        }
                     />
                  </div>

                  <div
                     className={`${
                        createOrderErrorMessage
                           ? "text-red-600"
                           : "text-transparent"
                     } w-full text-center min-h-5 text-sm`}
                  >
                     {createOrderErrorMessage}
                  </div>

                  <button
                     onClick={handleSubmitCreateOrder}
                     className="bg-main-green text-white font-medium py-2 md:px-6 px-2 rounded-full shadow-sm hover:scale-105 transition"
                  >
                     Подтвердить заказ
                  </button>
               </div>
            </div>
         )}
      </div>
   );
};

export default CreateOrderModal;
