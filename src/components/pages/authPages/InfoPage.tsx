"use client";
import { FC, useState } from "react";
import WelcomeInfo from "@/components/authComponents/WelcomeInfo";
import UserTypeForm from "@/components/authComponents/UserTypeForm";

const InfoPage: FC = () => {
   const [isWelcomeInfoOpen, setIsWelcomeInfoOpen] = useState<boolean>(true);
   return (
      <div className=" h-[400px] 2xl:h-[600px]">
         {isWelcomeInfoOpen ? (
            <WelcomeInfo changeForm={setIsWelcomeInfoOpen} />
         ) : (
            <UserTypeForm  />
         )}
      </div>
   );
};

export default InfoPage;
