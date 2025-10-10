interface ICalculatePriceReadyBasket {
   objects: {
      price: number;
      basePrice: number;
      amount: number;
      discount: number;
      overprice: number;
   }[];
   overprice: number | null;
}

export const calculatePriceReadyBasket = (
    payload: ICalculatePriceReadyBasket
  ) => {
    let price = 0.0;
  
    for (const obj of payload.objects) {

      if (payload.overprice === null || payload.overprice >= obj.overprice) {
        price += obj.price * obj.amount;
        continue;
      }
  
 
      const discountAmount = obj.basePrice * (obj.discount / 100);
      const overpriceAmount = obj.basePrice * (payload.overprice / 100);
  
      price += (obj.basePrice - discountAmount + overpriceAmount) * obj.amount;
    }
  
    return Number(price.toFixed(2));
  };
  
  
  