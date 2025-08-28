"use client";
import { FC, useRef, useState } from "react";
import { useFloating, offset, flip, shift, arrow } from "@floating-ui/react";

interface TooltipItemProps {
  children: React.ReactNode;
  tooltipsText: string;
  position?: "right" | "top" | "left" | "bottom";
}

const TooltipItem: FC<TooltipItemProps> = ({
  children,
  tooltipsText,
  position = "top",
}) => {
  const [open, setOpen] = useState(false);
  const arrowRef = useRef<HTMLDivElement | null>(null);

  const { refs, floatingStyles, middlewareData, placement } = useFloating({
    placement: position,
    middleware: [offset(10), flip(), shift(), arrow({ element: arrowRef })],
  });

  const staticSide: Record<string, string> = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
  };

  return (
    <div
      ref={refs.setReference}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="inline-block"
    >
      {children}
      {open && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="z-30 rounded bg-dark-green px-3 py-2 text-sm font-medium text-white shadow-lg max-w-[200px] break-words relative"
        >
          {tooltipsText}
          <div
            ref={arrowRef}
            className="absolute h-2 w-2 rotate-45 bg-dark-green"
            style={{
              left: middlewareData.arrow?.x ?? "",
              top: middlewareData.arrow?.y ?? "",
              [staticSide[placement.split("-")[0]]]: "-4px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TooltipItem;
