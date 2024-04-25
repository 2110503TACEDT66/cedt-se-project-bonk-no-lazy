import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "./getUserProfile";
import { current } from "@reduxjs/toolkit";

export async function getSession() {
  return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user.email) {
      return null;
    }
    const currentUser = getUserProfile(session.user.token);

    if (!currentUser) {
      return null;
    }

    return currentUser ;
    // {
    //   ...currentUser,
    //   createdAt: currentUser.crea.toISOString(),
    //   updatedAt: currentUser.updatedAt.toISOString(),
    //   emailVerified: 
    //     currentUser.emailVerified?.toISOString() || null,
    // };
  } catch (error: any) {
    return null;
  }
}

