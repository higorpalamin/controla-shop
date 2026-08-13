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
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="font-semibold text-lg flex items-center justify-center pb-10">
        <span className="text-controla-medium">Menu</span>
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} >
            <SidebarMenuItem >
              <CollapsibleTrigger className="w-full">
                <SidebarMenuButton tooltip={item.title} className="ml-2.5 cursor-pointer" >
                  {item.icon && <item.icon className="w-6! h-6!" />}
                  <Link href={item.url} className="group-data-[collapsible=icon]:hidden">
                    {item.title}
                  </Link>
                  <ChevronRight className="ml-auto group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton>
                        <a href={subItem.url}>
                          <Link href={subItem.url} className="flex gap-2 items-center">
                            {subItem.icon2 && <subItem.icon2 size={20} />}
                            {subItem.title}
                          </Link>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
