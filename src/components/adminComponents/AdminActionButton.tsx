import { FC } from "react";
import { useRouter } from "next/navigation";

interface AdminActionButtonProps {
   label: string;
   path?: string;
   onClick?: () => void;
}

const AdminActionButton: FC<AdminActionButtonProps> = ({
   label,
   path,
   onClick,
}) => {
   const router = useRouter();
   return (
      <div>
         <button
            onClick={() => {
               if (path) {
                  router.push(path);
               }
               if (onClick) {
                  onClick();
               }
            }}
            className="border-2 md:text-base text-sm w-full border-main-green cursor-pointer hover:scale-102 hover:border-dark-green hover:text-dark-green transition-all duration-300 text-main-green px-4 py-2 rounded-md"
         >
            {label}
         </button>
      </div>
   );
};

export default AdminActionButton;