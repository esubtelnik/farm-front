export const readyBasketType = "Готовые корзины";

export const activityTypes = ["КФХ", "Ремесленник", "Физ. лицо", "ИП", "ЛПХ"];

export const measures = [
   { title: "кг.", value: "кг." },
   { title: "л.", value: "л." },
   { title: "шт.", value: "шт." },
   { title: "мл.", value: "мл." },
   { title: "г.", value: "г." },
];

export const paymentMethods = [
   { label: "НАЛИЧНЫE ПРИ ПОЛУЧЕНИИ", value: "НАЛИЧНЫЕ" },
   { label: "БЕЗНАЛИЧНЫЙ ПО EPOS", value: "КАРТА" },
];

export const paymentMethodsValues = {
   CASH: "НАЛИЧНЫЕ",
   EPOS: "КАРТА",
};

export const OrderStatuses = {
   PAID: "Оплачен",
   NOT_PAID: "Не оплачен",
   COMPLETED: "Завершён",
};
