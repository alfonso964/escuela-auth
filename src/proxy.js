import NextAuth from "next-auth"
import authConfig from "./auth.config"

const { auth: proxy } = NextAuth(authConfig)

export default proxy((req) => {
  const isLogged = !!req.auth
  const { nextUrl } = req

  const isAuthPage = nextUrl.pathname.startsWith("/auth")
  const isHomePage = nextUrl.pathname === "/"

  if (!isLogged && !isAuthPage && !isHomePage) {
    
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
        callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(new URL(
        `/auth/signin?callbackUrl=${encodedCallbackUrl}`, 
        nextUrl
    ))
  }

  if (isLogged && isAuthPage) {
    return Response.redirect(new URL("/dashboard", nextUrl))
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}