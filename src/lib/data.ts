import { sql } from '@vercel/postgres';

export async function getUserByEmail(email: string) {
  try {
    const { rows } = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;
    return rows[0] || null;
  } catch (error) {
    console.error('Database Error:', error);
    return null;
  }
} 