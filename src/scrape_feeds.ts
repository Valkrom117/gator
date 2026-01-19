import { fetchFeed } from "./commands/handler_agg";
import { getNextFeedToFetch, markFeedFetched } from "./lib/db/queries/feed";
import { createPost } from "./lib/db/queries/post";
import { NewPost } from "./lib/db/schema";

export async function scrapeFeeds() {
    const nextFeed = await getNextFeedToFetch();
    if (!nextFeed) {
        console.log("No feeds to fetch.");
        return;
    };
    console.log(`Scraping feed: ${nextFeed.url}`);
    await markFeedFetched(nextFeed.id);

    try {
        const result = await fetchFeed(nextFeed.url);
        console.log("Fetched feed result:", JSON.stringify(result, null, 2)); // Add this line

        if (!result || !result.channel || !result.channel.item) {
            console.warn(`No channel or items found for feed: ${nextFeed.url}`); // Add this line
            return;
        }

        for (let item of result.channel.item) {
            console.log(`Found post: %s`, item.title);

            const now = new Date();

            await createPost({
            url: item.link,
            feedId: nextFeed.id,
            title: item.title,
            createdAt: now,
            updatedAt: now,
            description: item.description,
            publishedAt: new Date(item.pubDate),
            } satisfies NewPost)
        };
    } catch (error) {
        console.error(`Error scraping feed ${nextFeed.url}:`, error); // Add this line
    }
}
