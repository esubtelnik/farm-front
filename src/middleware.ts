import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserType } from "./constants/UserTypeEnum";
import { getAccountApi } from "./api/userApi";
import { fetchApi } from "./lib/fetchApi";
import { UserTypeValue } from "./types/entities/User";
import routes from "./constants/routes";

const findByValue = (value: string) =>
   Object.values(UserType).find((u) => u.value === value);

const accessRules: Record<string, string[]> = {
   [UserType.PRODUCER.value]: [routes.users.profile, "/product"],
   [UserType.CUSTOMER.value]: [],
   [UserType.ADMIN.value]: [
      routes.admin.root,
      routes.admin.lists.producers,
      routes.admin.lists.couriers,
      "/admin/lists/products",
      routes.auth.login,
      routes.auth.register,
      routes.auth.admin.login,
      routes.auth.admin.register,
   ],
   [UserType.COURIER.value]: [routes.users.profile],
   [UserType.GUEST.value]: [],
};

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const pathname = req.nextUrl.pathname;
  
    let userType: UserTypeValue = UserType.GUEST;
    if (token) {
      const res = await fetchApi(getAccountApi(token));
      if (res.success) {
        userType = findByValue(res.data.account_type) || UserType.GUEST;
      }
    }
  
  //  console.log("🔥 Middleware сработал для:", pathname, "Тип:", userType.value);
  
    const allowedPaths = accessRules[userType.value] ?? [];
  
    if (allowedPaths.length > 0) {
      const isAllowed = allowedPaths.some((prefix) =>
        pathname.startsWith(prefix)
      );
  
      if (!isAllowed) {
        const fallback = allowedPaths[0] || "/";
        return NextResponse.redirect(new URL(fallback, req.url));
      }
    }
  
    return NextResponse.next();
  }
  
  export const config = {
    matcher: [
      "/((?!_next|api|.*\\.(?:png|jpg|jpeg|svg|ico|gif|webp|css|js|map)).*)",
    ],
  };
