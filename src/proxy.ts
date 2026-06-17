import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "development_fallback_jwt_secret_value_not_used_in_prod";
const KEY = new TextEncoder().encode(JWT_SECRET);

const ROLE_PERMISSIONS: Record<string, string[]> = {
  "Super Admin": [
    "dashboard", "students", "teachers", "attendance", "classes",
    "exams", "results", "fees", "library", "inventory", "homework",
    "notices", "notifications", "reports", "settings"
  ],
  Admin: [
    "dashboard", "students", "teachers", "attendance", "classes",
    "exams", "results", "fees", "library", "inventory", "homework",
    "notices", "notifications", "reports", "settings"
  ],
  Teacher: [
    "dashboard", "students", "attendance", "classes", "exams",
    "results", "homework", "notices", "notifications"
  ],
  Student: [
    "dashboard", "attendance", "exams", "results", "homework",
    "library", "notices", "notifications"
  ],
  Parent: [
    "dashboard", "attendance", "exams", "results", "fees",
    "notices", "notifications"
  ],
  Accountant: [
    "dashboard", "fees", "inventory", "notices", "notifications", "reports"
  ],
  Librarian: [
    "dashboard", "library", "notices", "notifications"
  ],
};

const MODULE_ROUTES: Record<string, string> = {
  "dashboard": "dashboard",
  "students": "students",
  "teachers": "teachers",
  "attendance": "attendance",
  "classes": "classes",
  "timetable": "classes",
  "exams": "exams",
  "results": "results",
  "fees": "fees",
  "library": "library",
  "inventory": "inventory",
  "homework": "homework",
  "transport": "fees",
  "notices": "notices",
  "notifications": "notifications",
  "reports": "reports",
  "settings": "settings",
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === "/login" || pathname === "/forgot-password";
  const token = request.cookies.get("auth_token")?.value;

  let user: { userId: string; username: string; email: string; role: string } | null = null;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, KEY);
      user = payload as unknown as { userId: string; username: string; email: string; role: string };
    } catch {
      // Token expired or invalid
    }
  }

  // If visiting login and already authenticated, redirect to dashboard
  if (isAuthPage && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If not authenticated and visiting protected pages, redirect to login
  if (!isAuthPage && !user) {
    if (pathname === "/students") {
      return NextResponse.redirect(new URL("/for-students", request.url));
    }
    if (pathname === "/teachers") {
      return NextResponse.redirect(new URL("/for-teachers", request.url));
    }

    // Exclude static assets, public paths, and API routes (APIs handle their own checks)
    const publicPaths = [
      "/", "/pricing", "/features", "/about", "/contact", "/demo", "/faq", 
      "/privacy-policy", "/terms", "/blog", "/schools", "/parents", 
      "/for-students", "/for-teachers", "/privacy"
    ];
    const isPublicPath = publicPaths.includes(pathname) || pathname.startsWith("/blog/");
    const isStatic = pathname.includes(".") || pathname.startsWith("/_next") || pathname.startsWith("/api");
    
    if (!isPublicPath && !isStatic) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // Enforce RBAC permission checks
  if (user) {
    // Find matching route segment
    const segment = pathname.split("/")[1];
    const moduleName = MODULE_ROUTES[segment];

    if (moduleName) {
      const allowedModules = ROLE_PERMISSIONS[user.role] || [];
      if (!allowedModules.includes(moduleName)) {
        // Forbidden: Redirect to dashboard or access denied
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth/login|api/auth/logout).*)",
  ],
};
