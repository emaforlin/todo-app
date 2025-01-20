import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET! });

  if (!token) {
    return NextResponse.redirect(new URL("/auth/unauthorized", req.url));
  }

  // Verificar si el usuario tiene algun role para acceder a /tasks
  if (req.nextUrl.pathname.startsWith("/tasks") && !token.role) {
    return NextResponse.redirect(new URL("/auth/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tasks/:path*"], // Aplica el middleware solo a rutas específicas
};
