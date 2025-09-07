import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";

type BreadcrumbItemType = {
  label: string;
  href?: string;
  icon?: ReactNode;
};

interface BreadcrumbProps {
  items: BreadcrumbItemType[];
  className?: string;
  wrapperClassName?: string;
}

export default function AppBreadcrumb({
  items,
  className,
  wrapperClassName,
}: BreadcrumbProps) {
  if (!items || items.length === 0) return null;

  return (
    <Breadcrumb className={cn("text-sm border-b py-2", className)}>
      <div className={cn("w-full mx-auto", wrapperClassName)}>
        <BreadcrumbList className="!gap-1 px-4">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const Icon = item.icon;

            return (
              <div key={item.label} className="flex items-center gap-1">
                <BreadcrumbItem>
                  {isLast || !item.href ? (
                    <BreadcrumbPage>
                      {Icon && <span className="mr-1 mb-1">{Icon}</span>}
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href}>
                      {Icon && <span className="mr-1 mb-1">{Icon}</span>}
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && (
                  <BreadcrumbSeparator>
                    <ChevronRight className="size-4" />
                  </BreadcrumbSeparator>
                )}
              </div>
            );
          })}
        </BreadcrumbList>
      </div>
    </Breadcrumb>
  );
}
