import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

interface PrivateLayoutProps {
  children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(nextAuthOptions)

  if (session?.user.UserRole[0].role.name != "INVESTOR") {
    redirect('/admin/designer/dashboard')
  }

  return <>{children}</>
}