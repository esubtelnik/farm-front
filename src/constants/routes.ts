const routes = {
   auth: {
      root: "/auth",
      login: "/auth/login",
      register: "/auth/register",
      forgotPassword: "/auth/forgot-password",
      courier: {
         login: "/auth/login/courier",
         register: "/auth/register/courier",
      },
      admin: {
         login: "/auth/login/admin",
         register: "/auth/register/admin",
      },
   },

   home: {
      root: "/",
      catalog: "/catalog",
      producers: "/producers",
      contacts: "/contacts",
      about: "/about",
      search: "/search",
   },
   users: {
      profile: "/profile",
      customer: {
         //  root: "/customer",
         //  // profile: "/customer/profile",
         //  list: "/customer/list",
         //  edit: "/customer/edit",
         cart: "/cart",
      },
      producer: {
         root: "/producer",
         profile: "/producer/profile",
         list: "/producer/list",
      },
      courier: {
         root: "/courier",
         profile: "/courier/profile",
         list: "/courier/list",
         edit: "/courier/edit",
      },
      // profile: (id: string | number) => `/users/${id}`,
   },
   items: {
      readyBasket: (basketId: string | number) => `/ready-basket/${basketId}`,
      product: (productId: string | number) => `/product/${productId}`,
      category: (categoryTitle: string) => `/category/${categoryTitle}`,
      producer: (producerId: string | number) => `/producer/${producerId}`,
   },
   admin: {
      root: "/admin",
      login: "/auth/login/admin",
    
      lists: {
         customers: "/admin/lists/customers",
         producers: "/admin/lists/producers",
         products: (prodicerId: string | number) =>
            `/admin/lists/products/${prodicerId}`,
         couriers: "/admin/lists/couriers",
         readyBaskets: "admin/lists/ready-baskets",
         orders: "/admin/lists/orders",
         // products: "/admin/lists/products",
      },
      items : {
         readyBasket: (basketId: string | number) => `/admin/items/ready-basket/${basketId}`,
         addReadyBasket: "/admin/items/ready-basket/add",
      },
      edit: "/admin/edit",

   },

   legal: {
      privacyPolice: "/legal/privacy-police",
      terms: "/legal/terms",
      offer: "/legal/offer",
      refund: "/legal/refund",
      payment: "/legal/payment",
   },

   social: {
      instagram: "https://www.instagram.com/farmbasket_belarus?igsh=MTYzMnB1dWN4d3ZnaA==",
   },
};

export default routes;
