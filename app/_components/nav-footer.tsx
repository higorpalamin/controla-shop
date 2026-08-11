import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Link from "next/link";
import { ChevronRight, Settings, User } from "lucide-react";
import { LogoutButton } from "./logout-button";

type NavFooterProps = {
  user: {
    name: string | null
    email: string | null
  }
}

function NavFooter({ user }: NavFooterProps) {
  return (
    <SidebarFooter className="border-t">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Link
              href={"#"}
              className="flex items-center gap-2 rounded-lg w-full"
            >
              <User className="size-4 shrink-0 w-6! h-6!" />
              <span className="group-data-[collapsible=icon]:hidden">
                {user.name}
              </span>
              <ChevronRight className="ml-auto group-data-[collapsible=icon]:hidden" />
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton>
            <Link
              href={"#"}
              className="flex items-center gap-2 rounded-lg w-full"
            >
              <Settings className="size-4 shrink-0 w-6! h-6!" />
              <span className="group-data-[collapsible=icon]:hidden">
                Configurações
              </span>
              <ChevronRight className="ml-auto group-data-[collapsible=icon]:hidden" />
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem className="px-2.5">
          <LogoutButton />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}

export default NavFooter;
