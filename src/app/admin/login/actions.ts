"use server";

import { cookies } from "next/headers";

export async function login(username: string, password: string) {
  if (username === "admin" && password === "admin") {
    const cookieStore = await cookies();
    cookieStore.set({
      name: "admin_session",
      value: "authenticated",
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day session
    });
    return { success: true };
  }
  return { success: false, error: "Invalid username or password" };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}
