import { sql } from '@vercel/postgres';

export async function getUserByEmail(email: string) {
  try {
    const { rows } = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;
    return rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user.');
  }
} 