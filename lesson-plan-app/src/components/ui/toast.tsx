import { FC, ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

interface ToastProps {
  message: string | ReactNode;
  type?: "success" | "error" | "info";
}

export const Toast: FC<ToastProps> = ({ message, type = "info" }) => {
  const [show, setShow] = useState(true);
  const bgColor =
    type === "success" ? "bg-green-100 text-green-800" :
    type === "error" ? "bg-red-100 text-red-800" :
    "bg-blue-100 text-blue-800";

  if (!show) return null;

  return (
    <div className={cn("fixed bottom-4 right-4 px-4 py-2 rounded shadow", bgColor)}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={() => setShow(false)} className="ml-4 font-bold">X</button>
      </div>
    </div>
  );
};
