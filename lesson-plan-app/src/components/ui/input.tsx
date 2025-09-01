import { FC, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => (
  <input
    {...props}
    className={cn(
      "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
      className
    )}
  />
);

