"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FC } from "react";
import Link from "next/link";
import { SideBarItem } from "@/types/navigation";
import { sideBarItems } from "@/constants/sideBarItems";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type MenuItemsListProps = {
  items: SideBarItem[];
};

const MenuItemsList: FC<MenuItemsListProps> = ({ items }) => {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url;

            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.url}
                    className={cn(
                      "flex flex-col items-center gap-1 group hover:text-blue-600",
                      isActive && "text-blue-600"
                    )}
                  >
                    <item.icon className="h-6 w-6" />
                    <span className="text-xs font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <MenuItemsList items={sideBarItems.filter((item) => item.id !== "user")} />
      </SidebarContent>
      <SidebarFooter>
        <MenuItemsList items={sideBarItems.filter((item) => item.id === "user")} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
