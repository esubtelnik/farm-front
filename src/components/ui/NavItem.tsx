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
            className={`text-white text-sm font-semibold uppercase transition-all ${
               isActive
                  ? "underline decoration-[1.5px] underline-offset-4"
                  : "hover:p-2 hover:border-2 hover:border-white hover:rounded-full hover:scale-100"
            }`}
         >
            {link.title}
         </span>
      </Link>
   );
};

export default NavItem;
