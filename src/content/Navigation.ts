import routes from "@/constants/routes";

export const NavLinks = [
   {
      title: "ГЛАВНАЯ",
      path: routes.home.root,
   },
   {
      title: "КАТАЛОГ",
      path: routes.home.catalog,
   },
   {
      title: "ПРОИЗВОДИТЕЛИ",
      path: routes.home.producers,
   },
   {
      title: "КОНТАКТЫ",
      path: routes.home.contacts,
   },
   {
      title: "О СЕРВИСЕ",
      path: routes.home.about,
   },
];

export type NavLinkItem = (typeof NavLinks)[number];
