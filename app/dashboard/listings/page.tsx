import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminListingsClient from "./AdminListingsClient";

export default async function AdminListings() {
  const session = await auth();

  if (!session || session.user.role !== 'admin') {
    redirect('/auth/signin');
  }

  return <AdminListingsClient />;
} 