import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Link from "next/link";
import { ChevronRight, LogOut, Settings, User } from "lucide-react";

function NavFooter() {
  return (
    <SidebarFooter className="border-t">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Link href={"#"} className="flex items-center gap-2 rounded-lg w-full">
              <User className="size-4 shrink-0 w-6! h-6!" />
              <span className="group-data-[collapsible=icon]:hidden">
                Usuario
              </span>
              <ChevronRight className="ml-auto group-data-[collapsible=icon]:hidden" />
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton>
            <Link href={"#"} className="flex items-center gap-2 rounded-lg w-full">
              <Settings className="size-4 shrink-0 w-6! h-6!" />
              <span className="group-data-[collapsible=icon]:hidden">
                Configurações
              </span>
              <ChevronRight className="ml-auto group-data-[collapsible=icon]:hidden" />
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton>
            <Link href={"#"} className="flex items-center gap-2 rounded-lg w-full">
              <LogOut className="size-4 shrink-0 w-6! h-6!" />
              <span className="group-data-[collapsible=icon]:hidden">Sair</span>
              <ChevronRight className="ml-auto group-data-[collapsible=icon]:hidden" />
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}

export default NavFooter;
