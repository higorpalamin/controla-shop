"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/_components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/app/_components/ui/sidebar";
import Link from "next/link";
import { useSidebar } from "./ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    items?: {
      title: string;
      icon2?: LucideIcon;
      url: string;
    }[];
  }[];
}) {
  const { setOpen } = useSidebar();
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="font-semibold text-lg flex items-center justify-center pb-10">
        <span className="text-controla-medium">Menu</span>
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const hasSubItems = item.items && item.items.length > 0;

          if (!hasSubItems) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  className="ml-2.5 cursor-pointer w-full"
                  render={
                    <Link
                      href={item.url}
                      className="flex w-full items-center gap-2"
                    />
                  }
                >
                  {item.icon && <item.icon className="w-6! h-6!" />}
                  <span className="group-data-[collapsible=icon]:hidden font-medium">
                    {item.title}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          return (
            <Collapsible key={item.title} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger
                  className="w-full"
                  onClick={() => setOpen(true)}
                  render={
                    <SidebarMenuButton
                      tooltip={item.title}
                      className="ml-2.5 cursor-pointer w-full"
                    />
                  }
                >
                  {item.icon && <item.icon className="w-6! h-6!" />}
                  <span className="group-data-[collapsible=icon]:hidden font-medium">
                    {item.title}
                  </span>
                  <ChevronRight className="ml-auto group-data-[collapsible=icon]:hidden transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          href={subItem.url}
                          className="flex gap-2 items-center"
                        >
                          {subItem.icon2 && <subItem.icon2 size={20} />}
                          <span>{subItem.title}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
