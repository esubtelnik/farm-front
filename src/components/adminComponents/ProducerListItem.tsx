"use client";
import { FC, useState } from "react";
import { IProducerFromAdmin } from "@/types/entities/User";
import RadioButtonGroup from "@/components/ui/RadiobuttonGroup";
import { useStores } from "@/hooks/useStores";
import NextArrow from "../ui/NextArrow";
import TooltipItem from "../ui/TooltipItem";
import routes from "@/constants/routes";
// import Switcher from "../ui/Switcher";

const markupOptions = [
   { label: "15%", value: 15 },
   { label: "30%", value: 30 },
];

interface ProducerListItemProps {
   producer: IProducerFromAdmin;
}

const ProducerListItem: FC<ProducerListItemProps> = ({ producer }) => {
   const { adminStore } = useStores();
   const [isCodeEdit, setIsCodeEdit] = useState(false);
   const [isButtonVisible, setIsButtonVisible] = useState(false);
   const [markup, setMarkup] = useState(producer.overprice);
   const [code, setCode] = useState(producer.code);

   const handleChangeMarkup = (value: number) => {
      setMarkup(value);
      if (value !== producer.overprice) {
         setIsButtonVisible(true);
      } else {
         setIsButtonVisible(false);
      }
   };

   // const handleChangeCode = async () => {
   //    if (code !== producer.code) {
   //       const res = await adminStore.saveProducerCode({
   //          email: producer.producerEmail,
   //          code: code,
   //          overprice: markup,
   //       });
   //       if (res.success) {
   //          setIsCodeEdit(false);
   //       }
   //    }
   // };

   const handleChangeOverprice = async () => {
      const res = await adminStore.changeProducerOverprice({
         producerId: producer.id,
         overprice: markup,
         overpriceId: producer.overpriceId || "",
      });
      if (res?.success) {
         setIsButtonVisible(false);
      }
   };

   return (
      <div
         className={`admin-list-item ${
            isCodeEdit ? "border-main-green shadow-md" : ""
         }`}
      >
         <div className="grid grid-cols-4 w-full gap-2 items-center justify-items-center">
            <p>{producer.producerFio}</p>
            <p>{producer.producerEmail}</p>

            <div
               className={`border-b-2 ${
                  isCodeEdit ? "border-main-green" : "border-main-gray "
               }`}
            >
               <input
                  type="text"
                  className="outline-none"
                  placeholder=""
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  readOnly={!isCodeEdit}
               />
               {/* {isCodeEdit ? (
                  <button
                     onClick={handleChangeCode}
                     className="text-main-green cursor-pointer"
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
                           d="m4.5 12.75 6 6 9-13.5"
                        />
                     </svg>
                  </button>
               ) : (
                  <button
                     onClick={() => setIsCodeEdit(true)}
                     className="hover:text-main-green cursor-pointer"
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                     </svg>
                  </button>
               )} */}
            </div>
            <div className="flex items-center w-full gap-10 justify-center">
               <RadioButtonGroup
                  name="markup"
                  variant="card"
                  groupVariant="horizontal"
                  options={markupOptions}
                  selected={markup}
                  onChange={(value) => handleChangeMarkup(Number(value))}
               />
               <button
                  className={`cursor-pointer text-main-green ${
                     isButtonVisible ? "visible" : "invisible"
                  }`}
                  onClick={handleChangeOverprice}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={3}
                     stroke="currentColor"
                     className="size-8"
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
         <div className="pr-2 flex gap-5 items-center justify-center">
            {/* <Switcher isChecked={true} setIsChecked={() => {}} /> */}

            <TooltipItem tooltipsText="Посмотреть продукты" position="top">
               <NextArrow
                  route={routes.admin.lists.products(producer.producerId)}
               />
            </TooltipItem>
         </div>
      </div>
   );
};

export default ProducerListItem;
