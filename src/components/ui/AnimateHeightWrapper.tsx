"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface AnimateHeightWrapperProps {
   children: React.ReactNode;
}

const AnimateHeightWrapper: React.FC<AnimateHeightWrapperProps> = ({ children }) => {
   const ref = useRef<HTMLDivElement>(null);
   const [height, setHeight] = useState<number>(0);

   useEffect(() => {
      const el = ref.current;
      if (!el) return;

      const updateHeight = () => {
         setHeight(el.scrollHeight);
      };

      updateHeight();

      const resizeObserver = new ResizeObserver(updateHeight);
      resizeObserver.observe(el);

      return () => resizeObserver.disconnect();
   }, [children]);

   return (
      <motion.div
         animate={{ height }}
         transition={{ duration: 0.4, ease: "easeInOut" }}
         style={{ overflow: "hidden" }}
      >
         <div ref={ref}>
            {children}
         </div>
      </motion.div>
   );
};

export default AnimateHeightWrapper;
