import { auth } from "@/auth";
import { redirect } from "next/navigation";
import TechniciansClient from "./TechniciansClient";

export default async function TechniciansPage() {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }

  return <TechniciansClient />;
} 