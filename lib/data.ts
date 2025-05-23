import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function getUserByEmail(email: string) {
  noStore();
  try {
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
} 