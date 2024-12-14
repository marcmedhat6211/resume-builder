import { SideBarItem } from "@/types/navigation";
import { LayoutGrid, Settings2, CircleUser } from "lucide-react";

export const sideBarItems: SideBarItem[] = [
  {
    id: "content",
    title: "Content",
    url: "/",
    icon: LayoutGrid,
  },
  {
    id: "settings",
    title: "Settings",
    url: "/settings",
    icon: Settings2,
  },
  {
    id: "user",
    title: "Profile",
    url: "/profile",
    icon: CircleUser,
  },
];
