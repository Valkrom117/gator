import { getFeeds } from "./lib/db/queries/feed";
import { getUserById } from "./lib/db/queries/user";

export async function handlerFeeds(cmdName: string) { 
    const feeds = await getFeeds();
    for (let feed of feeds) {
        let user = await getUserById(feed.user_id);
        console.log(feed.name, feed.url, user.name)
    }
}