import { XMLParser } from "fast-xml-parser";

async function fetchFeed(feedURL: string) {
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
    const result = await fetchFeed("https://www.wagslane.dev/index.xml");
    console.log(JSON.stringify(result, null, 2));
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
