import { truncatePosts } from "src/lib/db/queries/post";
import { truncateFeeds } from "../lib/db/queries/feed";
import { truncateFeedFollows } from "../lib/db/queries/feed_follow";
import { truncateUsers } from "../lib/db/queries/users";

export async function handlerReset(cmdName: string) {
    try {
        await truncateUsers();
        await truncateFeeds();
        await truncateFeedFollows();
        await truncatePosts();
        console.log("Database reset successful");
        process.exit(0);
    } catch (err) {
        console.error("Database reset failed");
        process.exit(1);
    }

}