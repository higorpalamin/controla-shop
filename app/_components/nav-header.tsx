import Link from "next/link";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";

function NavHeader() {
  const { state } = useSidebar();
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size={"lg"}>
            <Link href={"#"}>
            {state === 'collapsed' ? (
              <>
                <span className="text-controla-primary font-bold text-2xl">
                  C
                </span>
                <span className="text-controla-green text-2xl">S</span>
              </>
            ) : (
              <div className="text-center">
                <span className="text-controla-primary font-bold text-2xl">
                  Controla
                </span>
                <span className="text-controla-green text-2xl">Shop</span>
              </div>
            )}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}

export default NavHeader;
