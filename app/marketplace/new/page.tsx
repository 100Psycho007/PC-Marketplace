import { auth } from "@/auth";
import { redirect } from "next/navigation";
import NewListingClient from "./NewListingClient";

export default async function NewListingPage() {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }

  return <NewListingClient />;
} 