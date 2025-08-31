import { Wrapper } from "@/components/LayoutWidgets";
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

interface CustomBreadcrumbProps {
  items: {
    label: string;
    href?: string;
    icon?: ReactNode;
  }[];
  className?: string;
}

export default function CustomBreadcrumb({
  items,
  className,
}: CustomBreadcrumbProps) {
  return (
    <Breadcrumb className={cn("text-sm border-b py-2 min-h-[37px]", className)}>
      <Wrapper>
        <BreadcrumbList className="!gap-1">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const Icon = item.icon;

            return (
              <div key={item.label} className="flex items-center gap-1">
                <BreadcrumbItem>
                  {isLast || !item.href ? (
                    <BreadcrumbPage>
                      {Icon && <span className="mr-1">{Icon}</span>}
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href} className="cursor-pointer">
                      {Icon && <span className="mr-1">{Icon}</span>}
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
      </Wrapper>
    </Breadcrumb>
  );
}
