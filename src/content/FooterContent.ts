// import SamsungPay from "@/assets/icons/SamsungPay.svg";
// import ApplePay from "@/assets/icons/ApplePay.svg";
// import Visa from "@/assets/icons/Visa.svg";
// import MasterCard from "@/assets/icons/MasterCard.svg";
// import BelCard from "@/assets/icons/BelCard.svg";
import Instagram from "@/assets/icons/Instagram.svg";
import VisaSecure from "@/assets/icons/VisaSecure.png";
import MastercardIdCheck from "@/assets/icons/MastercardIdCheck.png";
import Belcart from "@/assets/icons/Belcart.png";

import routes from "@/constants/routes";
import { FC, SVGProps } from "react";
import { StaticImageData } from "next/image";

export type FooterItem = {
   text: string;
   type: "icon" | "link" | "image";
   tag?: string;
   link?: string;
   icon?: FC<SVGProps<SVGSVGElement>>;
   image?: StaticImageData;
};

export type FooterSectionType = {
   title: string;
   items: FooterItem[];
};

export const FooterSiteLinks: FooterSectionType = {
   title: "О FARM-BASKET",
   items: [
      { text: "Контакты", type: "link", link: routes.home.contacts },
      { text: "О сервисе", type: "link", link: routes.home.about },
   ],
};

export const FooterCustomerLinks: FooterSectionType = {
   title: "ПОКУПАТЕЛЯМ",
   items: [
      { text: "Каталог", type: "link", link: routes.home.catalog },
      { text: "FAQ", type: "link", link: `${routes.home.root}#faq` },
      // { text: "Возврат продукции", type: "link", link: routes.legal.offer },
      // { text: "Доставка", type: "link", link: routes.home.root },
      { text: "Описание процедуры оплаты", type: "link", link: routes.legal.refund },
      { text: "Возврат денежных средств", type: "link", link: routes.legal.payment },

   ],
};

// export const FooterPaymentLinks: FooterSectionType = {
//    title: "ПЛАТЕЖИ",
//    items: [
//       { text: "Samsung Pay", type: "icon", icon: SamsungPay },
//       { text: "Apple Pay", type: "icon", icon: ApplePay },
//       { text: "Visa", type: "icon", icon: Visa },
//       { text: "MasterCard", type: "icon", icon: MasterCard },
//       { text: "Белкарт", type: "icon", icon: BelCard },
//    ],
// };

export const FooterPaymentLinks: FooterSectionType = {
   title: "ПЛАТЕЖИ",
   items: [
      { text: "Visa", type: "image", image: VisaSecure },
      { text: "MasterCard", type: "image", image: MastercardIdCheck },
      { text: "BelCard", type: "image", image: Belcart },
   ]
};

export const FooterContactsLinks: FooterSectionType = {
   title: "КОНТАКТЫ",
   items: [
      { text: "+375 33 3729057", type: "link", link: routes.home.contacts },
      {
         text: "farm.basket.shop@gmail.com",
         type: "link",
         link: routes.home.contacts,
      },
      { text: "ИП Лещёва З.М. УНП 291887836, свидетельство выдано Администрацией Московского района г. Бреста, 09.12.2024", type: "link", link: routes.home.contacts },
      { text: "Время работы: 09:00 - 21:00", type: "link", link: routes.home.contacts },
      { text: "Адрес: г. Брест, ул. Молодогвардейская, 12/2", type: "link", link: routes.home.contacts },

   ],
};

export const FooterLegalLinks: FooterSectionType = {
   title: "ПРАВОВАЯ ИНФОРМАЦИЯ",
   items: [
      { text: "Оферта", type: "link", link: routes.legal.offer },
      { text: "Политика конфиденциальности", type: "link", link: routes.legal.privacyPolice },
   ],
};

export const FooterSocialLinks: FooterSectionType = {
   title: "СОЦИАЛЬНЫЕ СЕТИ",
   items: [
      { text: "Instagram", tag: "@farmbasket_belarus", type: "icon", icon: Instagram, link: routes.social.instagram },
   ],
};

export const FooterData: FooterSectionType[] = [
   FooterSiteLinks,
   FooterCustomerLinks,
   FooterPaymentLinks,
   FooterContactsLinks,
   FooterLegalLinks,
   FooterSocialLinks,
];
