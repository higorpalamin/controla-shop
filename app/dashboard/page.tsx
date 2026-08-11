import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Header from "../_components/header";
import { SidebarProvider } from "../_components/ui/sidebar";
import AppSidebarWrapper from "@/app/_components/app-sidebar-wrapper"

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex p-2">
      <SidebarProvider defaultOpen={false}>
        <AppSidebarWrapper  />
        <div className="w-full">
            <Header />
        </div>
      </SidebarProvider>
    </div>
  );
}
