import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const Table: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
  <div className="overflow-x-auto">
    <table className={cn("min-w-full divide-y divide-gray-200", className)}>{children}</table>
  </div>
);

export const TableHeader: FC<{ children: ReactNode }> = ({ children }) => <thead className="bg-gray-50">{children}</thead>;
export const TableBody: FC<{ children: ReactNode }> = ({ children }) => <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>;
export const TableRow: FC<{ children: ReactNode }> = ({ children }) => <tr>{children}</tr>;
export const TableHead: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
  <th className={cn("px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", className)}>{children}</th>
);
export const TableCell: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
  <td className={cn("px-6 py-4 whitespace-nowrap text-sm text-gray-900", className)}>{children}</td>
);

