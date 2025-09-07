import SamsungPay from "@/assets/icons/SamsungPay.svg";
import ApplePay from "@/assets/icons/ApplePay.svg";
import Visa from "@/assets/icons/Visa.svg";
import MasterCard from "@/assets/icons/MasterCard.svg";
import BelCard from "@/assets/icons/BelCard.svg";
import routes from "@/constants/routes";
import { FC, SVGProps } from "react";

type FooterItem = {
   text: string;
   type: "icon" | "link";
   link?: string;
   icon?: FC<SVGProps<SVGSVGElement>>;
};

type FooterSection = {
   title: string;
   items: FooterItem[];
};

export const FooterSiteLinks: FooterSection = {
   title: "О FARM-BASKET",
   items: [
      { text: "Контакты", type: "link", link: routes.home.contacts },
      { text: "О сервисе", type: "link", link: routes.home.about },
   ],
};

export const FooterCustomerLinks: FooterSection = {
   title: "ПОКУПАТЕЛЯМ",
   items: [
      { text: "Каталог", type: "link", link: routes.home.catalog },
      { text: "FAQ", type: "link" },
      { text: "Возврат продукции", type: "link" },
      { text: "Доставка", type: "link" },
   ],
};

export const FooterPaymentLinks: FooterSection = {
   title: "ПЛАТЕЖИ",
   items: [
      { text: "Samsung Pay", type: "icon", icon: SamsungPay },
      { text: "Apple Pay", type: "icon", icon: ApplePay },
      { text: "Visa", type: "icon", icon: Visa },
      { text: "MasterCard", type: "icon", icon: MasterCard },
      { text: "Белкарт", type: "icon", icon: BelCard },
   ],
};

export const FooterContactsLinks: FooterSection = {
   title: "КОНТАКТЫ",
   items: [
      { text: "+375 33 3729057", type: "link", link: routes.home.contacts },
      {
         text: "Farm.basket.shop@gmail.com",
         type: "link",
         link: routes.home.contacts,
      },
      { text: "ИП Лещёва З.М.", type: "link", link: routes.home.contacts },
      { text: "УНП 291887836", type: "link", link: routes.home.contacts },
   ],
};

export const FooterLegalLinks: FooterSection = {
   title: "ПРАВОВАЯ ИНФОРМАЦИЯ",
   items: [
      { text: "Оферта", type: "link" },
      { text: "Политика конфиденциальности", type: "link" },
   ],
};

export const FooterData: FooterSection[] = [
   FooterSiteLinks,
   FooterCustomerLinks,
   FooterPaymentLinks,
   FooterContactsLinks,
   FooterLegalLinks,
];
