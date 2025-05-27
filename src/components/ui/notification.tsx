import { cn } from "@/lib/utils";

type NotificationBubbleProps = {
  count?: number;
  className?: string;
  size?: "sm" | "md";
};

export const NotificationBubble = ({
  count,
  className,
  size = "md",
}: NotificationBubbleProps) => {
  if (count === undefined || count <= 0) return null;

  const baseSize =
    size === "sm" ? "h-3 w-3 text-[10px]" : "h-5 min-w-[1.25rem] text-xs";
  const padding = size === "sm" ? "px-0.5" : "px-1";

  return (
    <span
      className={cn(
        "bg-red-500 text-white rounded-full flex items-center justify-center font-bold",
        baseSize,
        padding,
        "absolute -top-2 -right-2",
        className
      )}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
};
