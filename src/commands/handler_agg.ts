import { XMLParser } from "fast-xml-parser";
import { scrapeFeeds } from "src/scrape_feeds";

export async function fetchFeed(feedURL: string) {
    const response = await fetch(feedURL, { headers: {"User-Agent": "gator"}})
    const data = await response.text();
    const parser = new XMLParser();
    const obj = parser.parse(data);
    const channel = obj.rss?.channel;
    if (!channel) {
        throw new Error("Channel property not in XML object")
    };
    const title = channel.title;
    const link = channel.link;
    const description = channel.description
    if (!title || !link || !description ) {
        throw new Error("Missing title, link or description property in XML object");
    };
    let items: any[] = [];
    const channelItem = channel.item;
    if (Array.isArray(channelItem)) {
        items = channelItem;
    } else {
        items.push(channelItem)
    };
    const rssItems: RSSItem[] = [];
    for (let item of items) {
        if (!item.title || !item.link || !item.description || !item.pubDate) {
            continue;
        };
        const rssItem: RSSItem = {
            title: item.title,
            link: item.link,
            description: item.description,
            pubDate: item.pubDate
        };
        rssItems.push(rssItem);
    };
    const result: RSSFeed = {
        channel: {
            title: title,
            link: link,
            description: description,
            item: rssItems
        }
    };
    return result;
}

export async function handlerAgg(cmdName: string, ...args: string[]) {
    const timeInput = args[0];
    const duration = parseDuration(timeInput);

    console.log(`Collecting feeds every ${timeInput}`);

    scrapeFeeds().catch(handleError);
    const interval = setInterval(() => {
        scrapeFeeds().catch(handleError);
    }, duration);

    await new Promise<void>((resolve) => {
        process.on("SIGINT", () => {
            console.log("Shutting down feed aggregator...");
            clearInterval(interval);
            resolve();
        });
    });
}

function handleError (err: Error) {
    console.log(`Error while scraping feeds: ${err.message}`)
}

function parseDuration(durationString: string) {
    const regex = /^(\d+)(ms|s|m|h)$/;
    const match = durationString.match(regex);
    if (!match) {
        throw new Error(`Invalid duration: ${durationString}`);
    }
    
    const value = Number(match[1]);
    const unit = match[2];

    switch (unit) {
        case "ms":
        return value;
        case "s":
        return value * 1000;
        case "m":
        return value * 60 * 1000;
        case "h":
        return value * 60 * 60 * 1000;
        default:
        throw new Error(`Unsupported unit: ${unit}`);
  }
}

type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};
