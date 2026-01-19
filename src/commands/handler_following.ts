import { User } from "src/lib/db/schema";
import { getFeedFollowsForUser } from "../lib/db/queries/feed_follow";


export async function handlerFollowing(cmdName: string, user:User, ...args: string[]) {
    // const currentUser = readConfig().currentUserName;
    //     if (!currentUser) {
    //         throw new Error("No current user set yet");
    //     };
    // const user = await getUserByName(currentUser);
    const follows = await getFeedFollowsForUser(user.id);
    for (let follow of follows) {
        console.log(follow.feedName);
    };
}