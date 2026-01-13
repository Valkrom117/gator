import { db } from "..";
import { feeds } from "../schema";


export async function addFeed(name: string, url: string, userId: string) {
    const [result] = await db.insert(feeds).values({ name: name, url: url, user_id: userId }).returning();
    return result;
}

export async function truncateFeeds() {
    return db.delete(feeds);
}

export async function getFeeds() {
    const results = await db.select().from(feeds);
    return results;
}
