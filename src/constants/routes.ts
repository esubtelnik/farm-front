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
         products: (prodicerId: string | number) => `/admin/lists/products/${prodicerId}`,
         couriers: "/admin/lists/couriers",
         orders: "/admin/lists/orders",
         // products: "/admin/lists/products",
      },
      edit: "/admin/edit",
   },
};

export default routes;
