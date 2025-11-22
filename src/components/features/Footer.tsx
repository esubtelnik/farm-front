import React, { useEffect, useState } from "react";
import {
   FooterContactsLinks,
   FooterCustomerLinks,
   FooterLegalLinks,
   FooterPaymentLinks,
   FooterSiteLinks,
} from "@/content/FooterContent";
import Link from "next/link";
import { FooterSectionType } from "@/content/FooterContent";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const DesktopFooter = () => {
   return (
      <footer className="hidden md:block bg-main-green text-white pt-10 pb-5 xl:px-10 px-4">
         <div className="grid grid-cols-4">
            <div className="footer-section">
               <div className="text-left">
                  <h4>{FooterSiteLinks.title}</h4>
                  <ul>
                     {FooterSiteLinks.items.map((item) => (
                        <li key={item.text}>
                           {item.link ? (
                              <Link href={item.link}>{item.text}</Link>
                           ) : (
                              <span>{item.text}</span>
                           )}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
            <div className="footer-section">
               <div className="text-left">
                  <h4>{FooterCustomerLinks.title}</h4>
                  <ul>
                     {FooterCustomerLinks.items.map((item) => (
                        <li key={item.text}>
                           {item.link ? (
                              <Link href={item.link}>{item.text}</Link>
                           ) : (
                              <span>{item.text}</span>
                           )}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            {/* <div className="footer-section">
               <h4>{FooterPaymentLinks.title}</h4>
               <div className="flex gap-4">
                  {(() => {
                     const icons = FooterPaymentLinks.items.filter(
                        (item) => item.type === "icon" && item.icon
                     );
                     const mid = Math.ceil(icons.length / 2);
                     const firstColumn = icons.slice(0, mid);
                     const secondColumn = icons.slice(mid);

                     return [firstColumn, secondColumn].map((column, idx) => (
                        <ul key={idx} className="flex flex-col xl:gap-5 gap-3">
                           {column.map((item) =>
                              item.type === "icon" && item.icon ? (
                                 <li
                                    key={item.text}
                                    className="flex justify-center"
                                 >
                                    <item.icon className="xl:w-20 w-14" />
                                 </li>
                              ) : (
                                 <li key={item.text}>{item.text}</li>
                              )
                           )}
                        </ul>
                     ));
                  })()}
               </div>
            </div> */}

            <div className="footer-section">
               
               <div className="flex gap-4">
                  {(() => {
                     const icons = FooterPaymentLinks.items.filter(
                        (item) => item.type === "image" && item.image
                     );
                     const mid = Math.ceil(icons.length / 2);
                     const firstColumn = icons.slice(0, mid);
                     const secondColumn = icons.slice(mid);
                     return [firstColumn, secondColumn].map((column, idx) => (
                        <ul key={idx} className="flex flex-col xl:gap-5 gap-3">
                           {column.map((item) =>
                              item.type === "image" && item.image ? (
                                 <li
                                    key={item.text}
                                    className="flex justify-center items-center h-12 w-18"
                                 >
                                    <div className="relative w-full h-full">
                                       <Image
                                          src={item.image}
                                          alt={item.text}
                                          fill
                                          className="object-contain"
                                       />
                                    </div>
                                 </li>
                              ) : (
                                 <li key={item.text} className="py-2">
                                    {item.text}
                                 </li>
                              )
                           )}
                        </ul>
                     ));
                  })()}
               </div>
            </div>

            <div className="footer-section">
               <div className="text-left">
                  <h4>{FooterContactsLinks.title}</h4>
                  <ul>
                     {FooterContactsLinks.items.map((item) => (
                        <li key={item.text}>{item.text}</li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
         <hr className="border-white/50 my-4" />
         <ul className="justify-center space-x-6 text-sm flex">
            {FooterLegalLinks.items.map((item) => (
               <li key={item.text}>
                  {item.link ? (
                     <Link href={item.link}>{item.text}</Link>
                  ) : (
                     <span>{item.text}</span>
                  )}
               </li>
            ))}
         </ul>
      </footer>
   );
};

const FooterSection = ({
   section,
   openSection,
   setOpenSection,
}: {
   section: FooterSectionType;
   openSection: string | null;
   setOpenSection: (section: string | null) => void;
}) => {
   const handleOpenSection = () => {
      setOpenSection(openSection === section.title ? null : section.title);
   };

   return (
      <div className="flex flex-col gap-2 w-full">
         <h4
            onClick={handleOpenSection}
            className="flex w-full items-center justify-between cursor-pointer text-base font-bold"
         >
            {section.title}
            <ChevronDownIcon
               className={`${
                  openSection === section.title ? "rotate-180" : ""
               } w-4 h-4 stroke-3 transition-all duration-300`}
            />
         </h4>
         <ul
            className={`transition-all text-base text-start duration-300 ${
               openSection === section.title ? "block" : "hidden"
            }`}
         >
            {section.items.map((item) => (
               <li key={item.text}>
                  {item.link ? (
                     <Link href={item.link}>{item.text}</Link>
                  ) : (
                     <span>{item.text}</span>
                  )}
               </li>
            ))}
         </ul>
         <hr className="border-white/50 my-2" />
      </div>
   );
};

const MobileFooter = () => {
   const [openSection, setOpenSection] = useState<string | null>(null);
   useEffect(() => {
      console.log(openSection);
   }, [openSection]);
   return (
      <footer className="md:hidden block w-full bg-main-green text-white pt-10 pb-5 px-5">
         <div>
            <FooterSection
               section={FooterSiteLinks}
               openSection={openSection}
               setOpenSection={setOpenSection}
            />
            <FooterSection
               section={FooterCustomerLinks}
               openSection={openSection}
               setOpenSection={setOpenSection}
            />
            <FooterSection
               section={FooterContactsLinks}
               openSection={openSection}
               setOpenSection={setOpenSection}
            />
            <FooterSection
               section={FooterLegalLinks}
               openSection={openSection}
               setOpenSection={setOpenSection}
            />
         </div>
         <div className="flex justify-between">
            <ul className="flex flex-col items-start gap-y-3 text-sm text-white">
               <li>{FooterContactsLinks.items[0].text}</li>
               <li>{FooterContactsLinks.items[1].text}</li>
            </ul>
            <ul className="flex flex-col items-start gap-y-3 text-sm text-white">
               {/* <div className="flex gap-3">
                  {(() => {
                     const icons = FooterPaymentLinks.items.filter(
                        (item) => item.type === "icon" && item.icon
                     );
                     const mid = Math.ceil(icons.length / 2);
                     const firstColumn = icons.slice(0, mid);
                     const secondColumn = icons.slice(mid);

                     return [firstColumn, secondColumn].map((column, idx) => (
                        <ul key={idx} className="flex flex-col gap-1">
                           {column.map((item) =>
                              item.type === "icon" && item.icon ? (
                                 <li
                                    key={item.text}
                                    className="flex justify-center w-8"
                                 >
                                    <item.icon />
                                 </li>
                              ) : (
                                 <li key={item.text}>{item.text}</li>
                              )
                           )}
                        </ul>
                     ));
                  })()}
               </div> */}

               <div className="footer-section">
                  <div className="flex gap-4">
                     {(() => {
                        const icons = FooterPaymentLinks.items.filter(
                           (item) => item.type === "image" && item.image
                        );
                        const mid = Math.ceil(icons.length / 2);
                        const firstColumn = icons.slice(0, mid);
                        const secondColumn = icons.slice(mid);
                        return [firstColumn, secondColumn].map(
                           (column, idx) => (
                              <ul
                                 key={idx}
                                 className="flex flex-col xl:gap-5 gap-3"
                              >
                                 {column.map((item) =>
                                    item.type === "image" && item.image ? (
                                       <li
                                          key={item.text}
                                          className="flex justify-center items-center h-8 w-10"
                                       >
                                          <div className="relative w-full h-full">
                                             <Image
                                                src={item.image}
                                                alt={item.text}
                                                fill
                                                className="object-contain"
                                             />
                                          </div>
                                       </li>
                                    ) : (
                                       <li key={item.text} className="py-2">
                                          {item.text}
                                       </li>
                                    )
                                 )}
                              </ul>
                           )
                        );
                     })()}
                  </div>
               </div>
            </ul>
         </div>
      </footer>
   );
};

const Footer = () => {
   return (
      <>
         <DesktopFooter />
         <MobileFooter />
      </>
   );
};

export default Footer;
