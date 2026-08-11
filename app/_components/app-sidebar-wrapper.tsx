import { auth } from "@/auth"
import { AppSidebar } from "./app-sidebar"

export default async function AppSidebarWrapper() {
  const session = await auth()

  return (
    <AppSidebar
      user={{
        name: session?.user?.name ?? null,
        email: session?.user?.email ?? null,
      }}
    />
  )
}