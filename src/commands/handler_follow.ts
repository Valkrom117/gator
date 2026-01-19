import { User } from "src/lib/db/schema";
import { getFeedByURL } from "../lib/db/queries/feed";
import { createFeedFollow } from "../lib/db/queries/feed_follow";

export async function handlerFollow(cmdName: string, user:User, ...args: string[]) {
    // const currentUser = readConfig().currentUserName;
    // if (!currentUser) {
    //     throw new Error("No current user set yet");
    // };
    
    if (args.length !== 1) {
        throw new Error("No URL given");
    }
    const url = args[0];
    // const user = await getUserByName(currentUser);
    const feed = await getFeedByURL(url);
    const result = await createFeedFollow(user.id, feed.id);
    console.log(`${result.feedName} ${result.userName}`)
}