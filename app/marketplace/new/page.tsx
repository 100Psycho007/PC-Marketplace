import { redirect } from "next/navigation";
import NewListingClient from "./NewListingClient";

export default async function NewListingPage() {
  // TODO: Add Neon Auth session check if needed

  return <NewListingClient />;
} 