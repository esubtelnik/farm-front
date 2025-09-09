"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLinkItem } from "@/content/Navigation";

type Props = {
   link: NavLinkItem;
   onClick?: () => void;
};

const NavItem: FC<Props> = ({ link, onClick }) => {
   const pathname = usePathname();
   const isActive = pathname === link.path;

   return (
      <Link href={link.path} onClick={onClick}>
         <span
            className={`text-white text-sm font-semibold uppercase 
               transition-colors duration-300
               px-2 py-1 
               border-2 rounded-full
               ${isActive
                  ? "border-white"
                  : "border-transparent hover:border-white"}
            `}
         >
            {link.title}
         </span>
      </Link>
   );
};

export default NavItem;
