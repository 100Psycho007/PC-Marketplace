import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminDashboard() {
  let session = null;
  
  try {
    session = await auth();
  } catch (error) {
    console.error('Error fetching session:', error);
    redirect('/auth/signin');
  }

  if (!session || !session.user || session.user.role !== 'admin') {
    redirect('/auth/signin');
  }

  return <AdminDashboardClient />;
} 