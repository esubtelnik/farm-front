export const UserType = {
    PRODUCER: { title: "ПРОИЗВОДИТЕЛЬ", type: 2, value: "producer" },
    CUSTOMER: { title: "ПОКУПАТЕЛЬ", type: 3, value: "customer" },
    ADMIN: { title: "АДМИНИСТРАТОР", type: 1, value: "admin" },
    GUEST: { title: "БЕЗ АККАУНТА", type: 0, value: "guest" },
    COURIER: { title: "КУРЬЕР", type: 4, value: "courier" },
 } as const;
 