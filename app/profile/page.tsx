import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  let session = null;
  
  try {
    session = await auth();
  } catch (error) {
    console.error('Error fetching session:', error);
    redirect('/auth/signin');
  }

  if (!session || !session.user) {
    redirect('/auth/signin');
  }

  return <ProfileClient user={session.user} />;
} 