import { db  } from "..";
import { feeds } from "../schema";
import { eq, sql } from 'drizzle-orm';


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

export async function getFeedById(id: string) {
    const [result] = await db.select(
        { 
            id: feeds.id,
            createdAt: feeds.createdAt,
            updatedAt: feeds.updatedAt,
            name: feeds.name,
            url: feeds.url,
            user_id: feeds.user_id
         }
    ).from(feeds).where(eq(feeds.id, id));
    return result;
}

export async function getFeedByURL(url: string) {
    const [result] = await db.select(
        { 
            id: feeds.id,
            createdAt: feeds.createdAt,
            updatedAt: feeds.updatedAt,
            name: feeds.name,
            url: feeds.url,
            user_id: feeds.user_id
         }
    ).from(feeds).where(eq(feeds.url, url));
    return result;
}

export async function markFeedFetched (feedId: string) {
    const now: Date = new Date();
    const [result] = await db.update(feeds).set({
        lastFetchedAt: now,
        updatedAt: now,
    }).where(eq(feeds.id, feedId));
    return result;
}

export async function getNextFeedToFetch () {
  const [result] = await db
    .select()
    .from(feeds)
    .orderBy(sql`${feeds.lastFetchedAt} asc nulls first`)
    .limit(1);
    return result;
}