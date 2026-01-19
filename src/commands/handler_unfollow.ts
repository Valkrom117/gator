import { getFeedByURL } from "src/lib/db/queries/feed";
import { unfollowFeed } from "src/lib/db/queries/feed_follow";
import { User } from "src/lib/db/schema";

export async function handlerUnfollow(cmdName: string, user:User, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("No URL given");
    }
    const feed = await getFeedByURL(args[0])
    const result = await unfollowFeed(user.id, feed.id);

    console.log(`Unfollowed ${feed.name}`)
}