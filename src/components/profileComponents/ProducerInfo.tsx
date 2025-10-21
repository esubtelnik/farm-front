"use client";
import { observer } from "mobx-react-lite";
import { useStores } from "../../hooks/useStores";
import { FC, useEffect, useState, useRef } from "react";
import Skeleton from "@/components/ui/Skeleton";
import ReviewStars from "@/components/ui/ReviewStars";
import { useProductContext } from "@/context/ProductContext";
import { ICategory } from "@/types/entities/Product";
import Image from "next/image";
import { activityTypes } from "@/constants/constants";
import SaveChanges from "../ui/buttons/SaveChanges";

interface ProducerInfoProps {
   goToReviews: () => void;
}

const ProducerInfo: FC<ProducerInfoProps> = observer(({ goToReviews }) => {
   const { producerStore } = useStores();
   const { getCategories } = useProductContext();

   const profile = producerStore.profile;
   const isLoading = !profile;
   const [categories, setCategories] = useState<ICategory[]>([]);

   useEffect(() => {
      const fetchCategories = async () => {
         const res = await getCategories();
         if (res.success) {
            setCategories(res.categories);
         }
      };
      fetchCategories();
   }, []);

   const categoryDropdownRef = useRef<HTMLDivElement>(null);
   const activityTypeDropdownRef = useRef<HTMLDivElement>(null);
   const avatarInputRef = useRef<HTMLInputElement>(null);

   const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
   const [isActivityTypeDropdownOpen, setIsActivityTypeDropdownOpen] =
      useState(false);
   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

   useEffect(() => {
      setTitle(profile?.title);
      setCategory(profile?.category?.trim());
      setDescription(profile?.description);
      setAddress(profile?.address);
      setActivityType(profile?.activityType);
      if (profile?.category?.trim()) {
         setSelectedCategories(profile.category.split("; "));
      }
   }, [profile]);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            categoryDropdownRef.current &&
            !categoryDropdownRef.current.contains(event.target as Node)
         ) {
            setIsCategoryDropdownOpen(false);
            setIsCategoryEditable(false);
         }
         if (
            activityTypeDropdownRef.current &&
            !activityTypeDropdownRef.current.contains(event.target as Node)
         ) {
            setIsActivityTypeDropdownOpen(false);
            setIsActivityTypeEditable(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
         document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   const [isTitleEditable, setIsTitleEditable] = useState(false);
   const [title, setTitle] = useState(profile?.title);
   const [isTitleLoading, setIsTitleLoading] = useState(false);

   const [isCategoryEditable, setIsCategoryEditable] = useState(false);
   const [category, setCategory] = useState(profile?.category?.trim());
   const [isCategoryLoading, setIsCategoryLoading] = useState(false);

   const [isDescriptionEditable, setIsDescriptionEditable] = useState(false);
   const [description, setDescription] = useState(profile?.description);
   const [isDescriptionLoading, setIsDescriptionLoading] = useState(false);

   const [isAddressEditable, setIsAddressEditable] = useState(false);
   const [address, setAddress] = useState(profile?.address);
   const [isAddressLoading, setIsAddressLoading] = useState(false);

   const [isActivityTypeEditable, setIsActivityTypeEditable] = useState(false);
   const [activityType, setActivityType] = useState(profile?.activityType);
   const [isActivityTypeLoading, setIsActivityTypeLoading] = useState(false);

   const [isAvatarLoading, setIsAvatarLoading] = useState(false);
   const [imageLoaded, setImageLoaded] = useState(false);

   const handleCategoryToggle = (cat: string) => {
      setSelectedCategories((prev) => {
         const newCategories = prev.includes(cat)
            ? prev.filter((c) => c !== cat)
            : [...prev, cat];
         setCategory(newCategories.join("; "));
         return newCategories;
      });
   };

   const handleSave = async (
      field?: "title" | "category" | "description" | "address"
   ) => {
      const updateData: {
         title?: string;
         category?: string;
         description?: string;
         address?: string;
         activityType?: string;
      } = {};

      if (field === "title" || (!field && isTitleEditable)) {
         setIsTitleEditable(false);
         setIsTitleLoading(true);
         updateData.title = title;
      }

      if (field === "category" || (!field && isCategoryEditable)) {
         setIsCategoryEditable(false);
         setIsCategoryLoading(true);
         updateData.category = category;
      }

      if (field === "description" || (!field && isDescriptionEditable)) {
         setIsDescriptionEditable(false);
         setIsDescriptionLoading(true);
         updateData.description = description;
      }

      if (field === "address" || (!field && isAddressEditable)) {
         setIsAddressEditable(false);
         setIsAddressLoading(true);
         updateData.address = address;
      }

      // if (field === "activity_type" || (!field && isActivityTypeEditable)) {
      //    setIsActivityTypeEditable(false);
      //    setIsActivityTypeLoading(true);
      //    console.log("activityType",activityType);
      //    updateData.activityType = activityType;
      // }

      await producerStore.updateProducer(updateData);

      setIsTitleLoading(false);
      setIsCategoryLoading(false);
      setIsDescriptionLoading(false);
      setIsAddressLoading(false);
      setIsActivityTypeLoading(false);
      setIsAvatarLoading(false);
      setIsCategoryDropdownOpen(false);
      setIsActivityTypeDropdownOpen(false);
   };

   const handleAvatarChange = async (file: File | null) => {
      if (!file) return;
      setIsAvatarLoading(true);
      setImageLoaded(false);
      await producerStore.updateProducer({ image: file });
      setIsAvatarLoading(false);
   };

   const handleActivityTypeChange = async (type: string) => {
      if (type === activityType) return;
      setIsActivityTypeEditable(false);
      setIsActivityTypeLoading(true);
      await producerStore.updateProducer({ activityType: type });
      setActivityType(type);
      setIsActivityTypeLoading(false);
   };

   //    console.log(import.meta.env.VITE_API_URL + profile?.image);

   return (
      <div className="flex flex-col gap-y-8 md:p-8 p-4">
         <div className="flex flex-col lg:flex-row gap-y-6 md:gap-x-8 gap-x-0 h-fit">
            {isLoading ? (
               <div className="relative">
                  <Skeleton className="lg:w-[400px] w-full h-[300px] rounded-md" />
               </div>
            ) : (
               <div className="relative">
                  {!imageLoaded && isAvatarLoading ? (
                     <Skeleton className="lg:w-[400px] w-full h-[300px] rounded-md" />
                  ) : profile?.image ? (
                     // <img
                     //    src={import.meta.env.VITE_API_URL + profile?.image}
                     //    className="object-cover w-[400px] h-[300px] rounded-md"
                     //    onLoad={() => setImageLoaded(true)}
                     // />
                     <div className="lg:w-[400px] w-full h-[300px]">
                        <Image
                           alt={profile?.title ?? "avatar"}
                           fill
                           src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${profile?.image}`}
                           className="object-cover rounded-md"
                           onLoad={() => setImageLoaded(true)}
                        />
                     </div>
                  ) : (
                     <Skeleton className="lg:w-[400px] w-full h-[300px] rounded-md" />
                  )}

                  <input
                     type="file"
                     ref={avatarInputRef}
                     className="hidden"
                     onChange={(e) =>
                        handleAvatarChange(e.target.files?.[0] || null)
                     }
                  />

                  <button
                     className="absolute top-2 right-2 text-main-gray cursor-pointer"
                     onClick={() => {
                        avatarInputRef.current?.click();
                     }}
                     disabled={isAvatarLoading}
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="size-7"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                     </svg>
                  </button>
               </div>
            )}
            <div className="flex flex-col gap-y-3 flex-1 min-h-0">
               {isLoading ? (
                  <>
                     <Skeleton className="h-12 lg:w-48 w-full" />
                     <Skeleton className="h-10 lg:w-40 w-full" />
                     <Skeleton className="h-12 lg:w-64 w-full" />
                     <Skeleton className="h-10 lg:w-64 w-full" />
                     <Skeleton className="lg:h-full h-[100px] w-full" />
                  </>
               ) : (
                  <>
                     <div
                        className={`text-main-green font-bold text-2xl flex items-center gap-x-2 border-2 border-box p-1 rounded-md transition-all duration-100 w-full lg:w-fit ${
                           isTitleEditable
                              ? "border-main-gray"
                              : isTitleLoading
                              ? "border-transparent"
                              : "border-transparent hover:border-main-gray "
                        }`}
                     >
                        {isTitleEditable ? (
                           <div
                              className="flex items-center gap-x-2 w-full lg:w-fit"
                              onBlur={(e) => {
                                 if (
                                    !e.currentTarget.contains(e.relatedTarget)
                                 ) {
                                    setIsTitleEditable(false);
                                    setTitle(profile?.title);
                                 }
                              }}
                              tabIndex={-1}
                           >
                              <input
                                 className="bg-transparent focus:outline-none flex-1 min-w-0 truncate"
                                 value={title}
                                 autoFocus
                                 onChange={(e) => setTitle(e.target.value)}
                                 onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSave("title");
                                    if (e.key === "Escape") {
                                       setIsTitleEditable(false);
                                       setTitle(profile?.title);
                                    }
                                 }}
                              />

                              <SaveChanges
                                 onClick={() => handleSave("title")}
                              />
                           </div>
                        ) : isTitleLoading ? (
                           <Skeleton className="h-8 md:w-48 w-full" />
                        ) : (
                           <>
                              <span>{profile?.title ?? "Не указано"}</span>
                              <button
                                 className="cursor-pointer text-main-gray"
                                 onClick={() => setIsTitleEditable(true)}
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
                                       d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                    />
                                 </svg>
                              </button>
                           </>
                        )}
                     </div>
                     <div
                        className={`text-main-gray w-full flex items-center gap-x-2 border-2 border-box rounded-md transition-all duration-100 md:w-fit ${
                           isCategoryEditable
                              ? "border-main-gray"
                              : isCategoryLoading
                              ? "border-transparent"
                              : "border-transparent hover:border-main-gray "
                        }`}
                     >
                        {isCategoryEditable ? (
                           <div
                              className="flex w-full items-center gap-x-5 relative p-1"
                              ref={categoryDropdownRef}
                              onBlur={(e) => {
                                 if (
                                    !e.currentTarget.contains(e.relatedTarget)
                                 ) {
                                    setIsCategoryEditable(false);
                                    setCategory(profile?.category?.trim());
                                    setSelectedCategories(
                                       profile?.category?.split("; ") || []
                                    );
                                 }
                              }}
                              tabIndex={-1}
                           >
                              <div
                                 className="w-full rounded-md cursor-pointer bg-transparent"
                                 onClick={() =>
                                    setIsCategoryDropdownOpen(
                                       !isCategoryDropdownOpen
                                    )
                                 }
                              >
                                 {selectedCategories.length > 0
                                    ? selectedCategories.join("; ")
                                    : "Выберите категории"}
                              </div>
                              <SaveChanges
                                 onClick={() => handleSave("category")}
                              />
                              {/* <button
                                    className="cursor-pointer text-main-green"
                                    onClick={() => handleSave("category")}
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
                                 </button> */}
                              {isCategoryDropdownOpen && (
                                 <div className="absolute  top-full left-0 mt-1 p-1 w-full sm:w-[400px] max-h-[200px] overflow-y-auto border-2 border-main-gray bg-white flex flex-col gap-y-1 shadow-lg/30 z-10 rounded-md">
                                    {categories.map((category) => {
                                       const isChecked =
                                          selectedCategories.includes(
                                             category.title
                                          );

                                       return (
                                          <button
                                             key={category.title}
                                             type="button"
                                             onClick={() =>
                                                handleCategoryToggle(
                                                   category.title
                                                )
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
                        ) : isCategoryLoading ? (
                           <Skeleton className="h-8 w-48" />
                        ) : (
                           <>
                              <span className="text-main-gray p-1">
                                 Категории: {profile?.category ?? "Не указано"}
                              </span>
                              <button
                                 className="cursor-pointer text-main-gray"
                                 onClick={() => {
                                    setIsCategoryEditable(true);
                                    setIsCategoryDropdownOpen(true);
                                 }}
                              >
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="size-5"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                    />
                                 </svg>
                              </button>
                           </>
                        )}
                     </div>
                     <span className="flex items-center gap-x-2">
                        <ReviewStars
                           size="large"
                           rating={profile.feedbackAv ?? 0}
                        />
                        <button
                           onClick={goToReviews}
                           className="text-main-gray text-sm cursor-pointer"
                        >
                           Отзывы
                        </button>
                     </span>
                     <div className="text-main-gray flex flex-col flex-grow min-h-0">
                        {isDescriptionEditable ? (
                           <div
                              className="flex h-full items-end gap-x-2 border-2 border-main-green rounded-md p-1"
                              onBlur={(e) => {
                                 if (
                                    !e.currentTarget.contains(e.relatedTarget)
                                 ) {
                                    setIsDescriptionEditable(false);
                                    setDescription(profile?.description);
                                 }
                              }}
                              tabIndex={-1}
                           >
                              <textarea
                                 className="w-full h-full outline-none resize-none rounded-md p-2"
                                 placeholder={
                                    !profile?.description ||
                                    profile?.description.trim() === ""
                                       ? "Укажите описание"
                                       : ""
                                 }
                                 value={description}
                                 onChange={(e) =>
                                    setDescription(e.target.value)
                                 }
                              
                                 onKeyDown={(e) => {
                                    if (e.key === "Escape") {
                                       setIsDescriptionEditable(false);
                                       setDescription(profile?.description);
                                    }
                                    if (e.key === "Enter")
                                       handleSave("description");
                                 }}
                              />
                              <div className="flex h-full items-end">
                                 <SaveChanges
                                    onClick={() => handleSave("description")}
                                 />
                              </div>
                           </div>
                        ) : isDescriptionLoading ? (
                           <Skeleton className="md:h-full h-[100px] w-full" />
                        ) : (
                           <div className="flex items-start gap-x-2 h-full border-2 border-main-gray rounded-md p-1">
                              <textarea
                                 className="w-full h-full outline-none resize-none rounded-md p-2 bg-transparent overflow-auto border-none"
                                 placeholder={
                                    !profile?.description ||
                                    profile?.description.trim() === ""
                                       ? "Укажите описание"
                                       : ""
                                 }
                                 value={profile?.description}
                                 readOnly
                              />
                              <button
                                 className="cursor-pointer text-main-gray flex items-start outline-none"
                                 onClick={() => {
                                    setIsDescriptionEditable(true);
                                 }}
                              >
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="size-7"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                    />
                                 </svg>
                              </button>
                           </div>
                        )}
                     </div>
                  </>
               )}
            </div>
         </div>
         <div className="flex flex-col md:flex-row gap-y-6 md:gap-x-8 gap-x-0">
            {isLoading ? (
               <>
                  <Skeleton className="md:h-12 md:w-96 w-full" />
                  <Skeleton className="md:h-12 md:w-96 w-full" />
               </>
            ) : (
               <>
                  <span
                     className={`text-main-gray md:w-96 w-full md:text-xl text-sm flex items-center justify-between gap-x-2 border-2 border-box py-2 px-4 rounded-full transition-all duration-100 ${
                        isAddressEditable
                           ? "border-main-gray"
                           : isAddressLoading
                           ? "border-transparent"
                           : "border-main-gray"
                     }`}
                  >
                     {isAddressEditable ? (
                        <div
                           className="flex items-center gap-x-2 justify-between w-full"
                           onBlur={(e) => {
                              if (!e.currentTarget.contains(e.relatedTarget)) {
                                 setIsAddressEditable(false);
                                 setAddress(profile?.address);
                              }
                           }}
                           tabIndex={-1}
                        >
                           <input
                              className="bg-transparent focus:outline-none md:min-w-[200px] w-full"
                              value={address}
                              autoFocus
                              onChange={(e) => setAddress(e.target.value)}
                              onKeyDown={(e) => {
                                 if (e.key === "Enter") handleSave("address");
                                 if (e.key === "Escape") {
                                    setIsAddressEditable(false);
                                    setAddress(profile?.address);
                                 }
                              }}
                           />
                           <SaveChanges onClick={() => handleSave("address")} />
                        </div>
                     ) : isAddressLoading ? (
                        <Skeleton className="h-7 md:w-96 w-full" />
                     ) : (
                        <div className="flex items-center gap-x-8 justify-between w-full ">
                           <span>
                              <span className="font-bold">Адрес:</span>{" "}
                              {profile?.address ?? "Не указано"}
                           </span>
                           <button
                              className="cursor-pointer text-main-gray"
                              onClick={() => setIsAddressEditable(true)}
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
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                 />
                              </svg>
                           </button>
                        </div>
                     )}
                  </span>
                  <span
                     className={`text-main-gray md:text-xl text-sm md:min-w-[400px] w-full justify-between flex items-center gap-x-2 border-2 border-box py-2 rounded-full transition-all duration-100 md:w-fit ${
                        isActivityTypeEditable
                           ? "border-main-gray"
                           : isActivityTypeLoading
                           ? "border-transparent"
                           : "border-main-gray"
                     }`}
                  >
                     {isActivityTypeEditable ? (
                        <div
                           className="flex items-center gap-x-2 relative justify-between w-full"
                           ref={activityTypeDropdownRef}
                           onBlur={(e) => {
                              if (!e.currentTarget.contains(e.relatedTarget)) {
                                 setIsActivityTypeEditable(false);
                                 setActivityType(profile?.activityType);
                              }
                           }}
                           tabIndex={-1}
                        >
                           <div
                              className="cursor-pointer bg-transparent px-4"
                              onClick={() =>
                                 setIsActivityTypeDropdownOpen(
                                    !isActivityTypeDropdownOpen
                                 )
                              }
                           >
                              {activityType || "Выберите тип деятельности"}
                           </div>
                           {/* <button
                              className="cursor-pointer text-main-green outline-none px-4"
                              onClick={() => handleSave("activity_type")}
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
                           </button> */}
                           {isActivityTypeDropdownOpen && (
                              <div className="absolute top-full left-0 mt-2 w-full max-h-[200px] overflow-y-auto border-2 border-main-gray bg-white flex flex-col gap-y-1 shadow-lg/30 z-10 rounded-md p-1">
                                 {activityTypes.map((type) => (
                                    <button
                                       key={type}
                                       type="button"
                                       onClick={() => {
                                          setActivityType(type);
                                          setIsActivityTypeDropdownOpen(false);
                                          handleActivityTypeChange(type);
                                       }}
                                       className={`w-full outline-none font-medium text-[13px] px-2 py-1 text-left rounded-sm transition-all duration-300 ${
                                          activityType === type
                                             ? "bg-main-gray text-white"
                                             : "bg-white text-main-gray"
                                       }`}
                                    >
                                       {type}
                                    </button>
                                 ))}
                              </div>
                           )}
                        </div>
                     ) : isActivityTypeLoading ? (
                        <Skeleton className="h-7 md:w-96 w-full" />
                     ) : (
                        <div className="px-4 flex items-center justify-between w-full">
                           <span>
                              <span className="font-bold">
                                 Вид деятельности:
                              </span>{" "}
                              {activityType ?? "Не указано"}
                           </span>
                           <button
                              className="cursor-pointer text-main-gray"
                              onClick={() => {
                                 setIsActivityTypeEditable(true);
                                 setIsActivityTypeDropdownOpen(true);
                              }}
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
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                 />
                              </svg>
                           </button>
                        </div>
                     )}
                  </span>
               </>
            )}
         </div>
      </div>
   );
});

export default ProducerInfo;
