import { readConfig } from "./config";
import { getFeedFollowsForUser } from "./lib/db/queries/feed_follow";
import { getUserByName } from "./lib/db/queries/user";

export async function handlerFollowing(cmdName: string, ...args: string[]) {
    const currentUser = readConfig().currentUserName;
        if (!currentUser) {
            throw new Error("No current user set yet");
        };
    const user = await getUserByName(currentUser);
    const follows = await getFeedFollowsForUser(user.id);
    for (let follow of follows) {
        console.log(follow.feedName);
    };

}