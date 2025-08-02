import { cn } from "@/lib/utils";

export function Divider({
  className,
  orientation = "horizontal",
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <div
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px my-4 w-full" : "w-px mx-4 h-full",
        className
      )}
    />
  );
}
