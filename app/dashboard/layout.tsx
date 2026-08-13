import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Header from "../_components/header";
import { SidebarProvider } from "../_components/ui/sidebar";
import AppSidebarWrapper from "../_components/app-sidebar-wrapper";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex p-2 bg-[white]">
      <SidebarProvider defaultOpen={false}>
        <AppSidebarWrapper />

        <div className="w-full">
          <div className="sticky top-2 z-10">
            <Header />
          </div>
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
}
