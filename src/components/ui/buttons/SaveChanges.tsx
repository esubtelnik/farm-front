import React, { FC } from "react";

interface SaveChangesProps {
   onClick: () => void;
}

const SaveChanges: FC<SaveChangesProps> = ({ onClick }) => {
   return (
      <button
         className="bg-main-green max-h-fit text-sm text-white py-1 px-3 rounded-full cursor-pointer"
         onClick={onClick}
      >
         Сохранить
      </button>
   );
};

export default SaveChanges;
