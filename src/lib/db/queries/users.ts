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

export async function getUserById(id: string) {
    const [result] = await db.select(
        { 
            id: users.id,
            createdAt: users.createdAt,
            updatedAt: users.updatedAt,
            name: users.name
         }
    ).from(users).where(eq(users.id, id));
    return result;
}

export async function truncateUsers() {
    return db.delete(users);
}

export async function getUsers() {
    const results = await db.select({name: users.name}).from(users);
    return results;
}

