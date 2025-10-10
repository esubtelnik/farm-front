"use client";
import { useProductContext } from "@/context/ProductContext";
import { FC, useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import { ICountedProduct, IProductCard } from "@/types/entities/Product";
import Image from "next/image";
import Checkbox from "@/components/ui/Checkbox";

interface AddProductsToReadyBasketModalProps {
  selectedProducts: ICountedProduct[];
  setSelectedProducts: (selectedProducts: ICountedProduct[]) => void;
  onClose: () => void;
}

const AddProductsToReadyBasketModal: FC<AddProductsToReadyBasketModalProps> = ({
  selectedProducts,
  setSelectedProducts,
  onClose,
}) => {
  const { searchOnlyProducts } = useProductContext();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<IProductCard[]>([]);

  const [bufferProducts, setBufferProducts] = useState<ICountedProduct[]>(selectedProducts);

  useEffect(() => {
    searchOnlyProducts({ title: search }).then((res) => {
      setProducts(res.products);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const toggleProductInBuffer = (product: IProductCard) => {
    const isSelected = bufferProducts.some((p) => p.id === product.id);

    if (isSelected) {
      setBufferProducts(bufferProducts.filter((p) => p.id !== product.id));
    } else {
      setBufferProducts([...bufferProducts, { ...product, amount: 1 }]);
    }
  };

  const handleSave = () => {
    setSelectedProducts(bufferProducts);
    onClose();
  };

  return (
    <div className="flex flex-col h-full p-10">
      <Input
        placeholder="Введите название"
        value={search}
        onChange={setSearch}
      />

      <div className="flex-1 overflow-y-auto mt-4 flex gap-y-3 flex-col">
        {products.map((product) => {
          const isSelected = bufferProducts.some((p) => p.id === product.id);
          return (
            <div
              className={`flex w-full justify-between rounded-md p-2 items-center gap-x-2 ${
                isSelected ? "bg-main-green/20" : ""
              }`}
              key={product.id}
            >
              <div className="flex gap-x-2">
                <div className="relative w-32 h-32">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${product.images}`}
                    alt={product.title}
                    fill
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <span className="text-dark-gray truncate">{product.title}</span>
                  <span className="text-main-gray truncate">
                    Продавец: {product.producerName}
                  </span>
                  <span className="text-dark-gray truncate">
                    Цена: {product.price} р./{product.saleVolume} {product.unit}
                  </span>
                </div>
              </div>

              <Checkbox
                checked={isSelected}
                onChange={() => toggleProductInBuffer(product)}
              />
            </div>
          );
        })}
      </div>

      <button
        onClick={handleSave}
        className="mt-4 w-full bg-main-green text-white py-2 rounded-md"
      >
        Сохранить
      </button>
    </div>
  );
};

export default AddProductsToReadyBasketModal;
