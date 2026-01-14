import { eq } from "drizzle-orm";
import { db } from "..";
import { feed_follows, feeds, users } from "../schema";


export async function createFeedFollow(userId: string, feedId: string) {
    const [newFeedFollow] = await db.insert(feed_follows).values({ user_id: userId, feed_id: feedId}).returning();
    const [result] = await db.select({
        id: feed_follows.id,
        createdAt: feed_follows.createdAt,
        updatedAt: feed_follows.updatedAt,
        user_id: feed_follows.user_id,
        feed_id: feed_follows.feed_id,
        feedName: feeds.name,
        userName: users.name,
        })
        .from(feed_follows)
        .innerJoin(users, eq(feed_follows.user_id, users.id))
        .innerJoin(feeds, eq(feed_follows.feed_id, feeds.id))
        .where(eq(feed_follows.id, newFeedFollow.id))
    return result
}

export async function getFeedFollowsForUser(userId: string) {
    const result = await db.select({
        id: feed_follows.id,
        createdAt: feed_follows.createdAt,
        updatedAt: feed_follows.updatedAt,
        user_id: feed_follows.user_id,
        feed_id: feed_follows.feed_id,
        feedName: feeds.name,
        userName: users.name,
        })
        .from(feed_follows)
        .innerJoin(users, eq(feed_follows.user_id, users.id))
        .innerJoin(feeds, eq(feed_follows.feed_id, feeds.id))
        .where(eq(feed_follows.user_id, userId));
    return result;
}

export async function truncateFeedFollows() {
    return db.delete(feed_follows);
}