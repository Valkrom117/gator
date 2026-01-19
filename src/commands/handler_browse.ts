
import { getPostsForUsers } from "src/lib/db/queries/post";
import { User } from "src/lib/db/schema";

export async function handlerBrowse (cmdName: string, user:User, ...args: string[]) {
    let limit = 2;
    if (args.length === 1) {
        const inLimit = parseInt(args[0]);
        if (inLimit) {
            limit = inLimit;
        } else {
            throw new Error(`usage: ${cmdName} [limit]`);
        }
    }

    const posts = await getPostsForUsers(user.id, limit);
    console.log(`Found ${posts.length} posts for user ${user.name}`);
    for (let post of posts) {
        console.log(`${post.publishedAt}`);
        console.log(`${post.feedName}`);
        console.log(`${post.title}`);
        console.log(`${post.description}`);
        console.log(`Link: ${post.url}`);
        console.log(`=====================================`);
    }
}