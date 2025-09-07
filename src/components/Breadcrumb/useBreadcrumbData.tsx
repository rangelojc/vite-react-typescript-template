import { RouteDefinition } from "@/types/app";
import { HomeIcon, UserIcon } from "lucide-react";

const staticList = {
  home: {
    label: "메인",
    href: RouteDefinition.INDEX,
    icon: <HomeIcon size={12} />,
  },
  mypage: {
    label: "마이페이지",
    href: RouteDefinition.MYPAGE,
    icon: <UserIcon size={12} />,
  },
};

export default function useBreadcrumbData() {
  return {
    list: Object.values(staticList),
    dictionary: staticList,
  };
}
