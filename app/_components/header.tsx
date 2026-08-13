import { BellIcon, Settings } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";
import Link from "next/link";

function Header() {
  return (
    <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-2xl border border-sidebar-border ">
      <div>
        <SidebarTrigger className="bg-white hover:bg-white cursor-pointer" />
      </div>

      <div className="text-center">
        <span className="text-controla-primary font-bold text-2xl">
          Controla 
        </span>
        <span className="text-controla-green text-2xl"> Shop</span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <Link href={"#"} className="bg-white p-2 rounded-lg">
          <Settings size={24} />
        </Link>
        <Link href={"#"} className="bg-white p-2 rounded-lg">
          <BellIcon size={24} />
        </Link>
      </div>
    </div>
  );
}

export default Header;
