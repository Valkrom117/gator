import { db } from "..";
import { users } from "../schema";
import { eq } from 'drizzle-orm';

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUserByName(name: string) {
    const [result] = await db.select(
        { 
            id: users.id,
            createdAt: users.createdAt,
            updatedAt: users.updatedAt,
            name: users.name
         }
    ).from(users).where(eq(users.name, name));
    return result;
}

export async function truncateUsers() {
    try {
        await db.delete(users);
        console.log("Successful reset on users table");
    } catch (error) {
        console.log("Error reseting users table")
    }
}