import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }

  return <ProfileClient user={session.user} />;
} 