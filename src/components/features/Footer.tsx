import React from "react";
import {
   FooterContactsLinks,
   FooterCustomerLinks,
   FooterLegalLinks,
   FooterPaymentLinks,
   FooterSiteLinks,
} from "@/content/FooterContent";

const Footer = () => {
   return (
      <footer className="bg-main-green text-white pt-10 pb-5 px-10">
         <div className="grid-cols-4 hidden md:grid ">
            <div className="footer-section">
               <div className="text-left">
                  <h4>{FooterSiteLinks.title}</h4>
                  <ul>
                     {FooterSiteLinks.items.map((item) => (
                        <li key={item.text}>{item.text}</li>
                     ))}
                  </ul>
               </div>
            </div>
            <div className="footer-section">
               <div className="text-left">
                  <h4>{FooterCustomerLinks.title}</h4>
                  <ul>
                     {FooterCustomerLinks.items.map((item) => (
                        <li key={item.text}>{item.text}</li>
                     ))}
                  </ul>
               </div>
            </div>
            <div className="footer-section">
               {/* <h4>{FooterPaymentLinks.title}</h4> */}
               <div className="flex gap-4">
                  {(() => {
                     const icons = FooterPaymentLinks.items.filter(
                        (item) => item.type === "icon" && item.icon
                     );
                     const mid = Math.ceil(icons.length / 2);
                     const firstColumn = icons.slice(0, mid);
                     const secondColumn = icons.slice(mid);

                     return [firstColumn, secondColumn].map((column, idx) => (
                        <ul key={idx} className="flex flex-col gap-5">
                           {column.map((item) =>
                              item.type === "icon" && item.icon ? (
                                 <li
                                    key={item.text}
                                    className="flex justify-center"
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
         <hr className="border-white/50 my-4 hidden md:block" />
         <div className="justify-center space-x-6 text-sm hidden md:flex">
            {FooterLegalLinks.items.map((item) => (
               <span key={item.text}>{item.text}</span>
            ))}
         </div>
      </footer>
   );
};

export default Footer;
