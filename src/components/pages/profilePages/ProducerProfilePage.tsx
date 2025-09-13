"use client";
import { FC, useEffect, useState } from "react";

import ProductList from "@/components/mainComponents/lists/ProductList";
import Tabs from "@/components/ui/Tabs";
import ReviewList from "@/components/mainComponents/lists/ReviewList";
import GalleryList from "@/components/mainComponents/lists/GalleryList";
import ProducerInfo from "@/components/profileComponents/ProducerInfo";
import { observer } from "mobx-react-lite";
import { useStores } from "@/hooks/useStores";
import AddProduct from "@/components/ui/buttons/AddProduct";
import { IProductCard } from "@/types/entities/Product";
import { IReview } from "@/types/entities/Review";

const ProducerProfilePage: FC = observer(() => {
   const [isLoading, setIsLoading] = useState(true);
   const [gallery, setGallery] = useState<string[]>([]);
   const [certificates, setCertificates] = useState<string[]>([]);
   const [products, setProducts] = useState<IProductCard[]>([]);
   const [reviews, setReviews] = useState<IReview[]>([]);
   const { producerStore } = useStores();

   useEffect(() => {
      const fetchData = async () => {
         setIsLoading(true);
   
         await producerStore.fetchProducerData();
   
         if (producerStore.profile?.id) {
            await producerStore.getProductsByProducerId();
            await producerStore.fetchProducerGallery();
            await producerStore.fetchProducerCertificates();
   
            setProducts(producerStore.products);
            setGallery(producerStore.gallery);
            setCertificates(producerStore.certificates);
            setReviews(producerStore.profile.feedback ?? []);
         }
   
         setIsLoading(false);
      };
   
      fetchData();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      setProducts(producerStore.products);
   }, [producerStore.products]);

   const handleAddGallery = async (image: File) => {
      await producerStore.addGallery(image);
      setGallery(producerStore.gallery);
   };

   const handleDeleteGallery = async (imagePath: string) => {
      await producerStore.deleteGallery(imagePath);
      setGallery(producerStore.gallery);
   };

   const handleAddCertificate = async (image: File) => {
      await producerStore.addCertificate(image);
      setCertificates(producerStore.certificates);
   };

   const handleDeleteCertificate = async (imagePath: string) => {
      await producerStore.deleteCertificate(imagePath);
      setCertificates(producerStore.certificates);
   };

   const tabItems = [
      {
         label: "Каталог",
         render: () => (
            <div className="md:py-5 py-0 flex flex-col md:gap-y-10 gap-y-5">
               <ProductList products={products} isEditable={true} isLoading={isLoading} />
               <AddProduct />
            </div>
         ),
      },
      {
         label: "Галерея",
         render: () => (
            <div className="md:py-5 p-3">
               <GalleryList isEditable={true} isLoading={isLoading} images={gallery} onAddPhoto={handleAddGallery} onDeletePhoto={handleDeleteGallery}  />
            </div>
         ),
      },
      {
         label: "Сертификаты",
         render: () => (
            <div className="md:py-5 p-3">
               <GalleryList isEditable={true} isLoading={isLoading} images={certificates} onAddPhoto={handleAddCertificate} onDeletePhoto={handleDeleteCertificate} />
            </div>
         ),
      },
      {
         label: "Отзывы",
         render: () => (
            <div className="md:py-5 py-3">
               <ReviewList isAddReview={false} reviews={reviews} isLoading={isLoading} />
            </div>
         ),
      },
      {
         label: "Финансы",
         isGray: true,
         render: () => (
            <div className="md:py-5 py-3">
               <div>В разработке</div>
            </div>
         ),
      },
      {
         label: "Аналитика",
         isGray: true,
         render: () => (
            <div className="md:py-5 p-3">
               <div>В разработке</div>
            </div>
         ),
      },
   ];

   return (
      <div className="min-h-screen font-geist w-full">
         <ProducerInfo  />
         <Tabs tabs={tabItems} />
      </div>
   );
});

export default ProducerProfilePage;
