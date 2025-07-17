// TODO: Add Neon Auth session check if needed
import { redirect } from "next/navigation";
import AdminListingsClient from "./AdminListingsClient";

export default async function AdminListings() {
  // TODO: Add Neon Auth session check if needed
  return <AdminListingsClient />;
} 