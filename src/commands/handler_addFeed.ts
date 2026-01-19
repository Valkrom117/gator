import { addFeed } from "../lib/db/queries/feed";
import { createFeedFollow } from "../lib/db/queries/feed_follow";
import { Feed, User } from "../lib/db/schema";

 
export async function handlerAddFeed (cmdName: string, userData:User, ...args: string[]) {
    // const currentUser = readConfig().currentUserName;
    // if (!currentUser) {
    //     throw new Error("No current user set yet");
    // };
    // const userData = await getUserByName(currentUser);
    // if (!userData) {
    //     throw new Error("Current user not found in database");
    // }
    const userId = userData.id;

    if (args.length !== 2) {
        throw new Error("Missing name/url from the feed");
    }
    const name = args[0];
    const url = args[1];
    const feed = await addFeed(name, url, userId);
    const feed_follow = await createFeedFollow(userData.id, feed.id)
    printFeed(feed, userData);
}

function printFeed(feed: Feed, user: User) {
    console.log(feed.id, feed.name, feed.url, feed.createdAt, feed.updatedAt, user.id, user.name, user.createdAt, user.updatedAt)
}