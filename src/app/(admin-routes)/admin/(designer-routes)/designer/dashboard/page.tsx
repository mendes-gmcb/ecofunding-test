import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import ButtonLogout from "@/components/ButtonLogout";
import { getServerSession } from "next-auth";
import React from "react";

export default async function DashboardPage() {
  const session = await getServerSession(nextAuthOptions);

  return (
    <>
      <h1>bem vindo Projetista {session?.name} !</h1>
      <ButtonLogout />
    </>
  )
}