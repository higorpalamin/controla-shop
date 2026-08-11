import { auth } from "@/auth"

export const proxy = auth((request) => {
  if (!request.auth) {
    return Response.redirect(
      new URL("/login", request.url)
    )
  }
})

export const config = {
  matcher: ["/dashboard/:path*"],
}