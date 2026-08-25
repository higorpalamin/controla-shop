"use client";

import * as React from "react";

import { NavMain } from "@/app/_components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/app/_components/ui/sidebar";
import NavFooter from "./nav-footer";
import NavHeader from "./nav-header";
import { data } from "@/app/_constants/data-menu-sidebar";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: {
    name: string | null;
    email: string | null;
  };
};

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
