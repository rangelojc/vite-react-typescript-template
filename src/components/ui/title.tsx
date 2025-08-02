import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Title({
  title,
  children,
  className,
}: {
  title?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("text-2xl font-semibold mb-4", className)}>
      {title || children}
    </h2>
  );
}
