import { argv } from "node:process";
import { CommandsRegistry, registerCommand, runCommand } from "./command_registry";
import { handlerLogin } from "./commands/handler_login";
import { handlerRegister } from "./commands/handler_register";
import { handlerReset } from "./commands/handler_reset";
import { handlerUsers } from "./commands/handler_users";
import { handlerAgg } from "./commands/handler_agg";
import { handlerAddFeed } from "./commands/handler_addFeed";
import { handlerFeeds } from "./commands/handler_feeds";
import { handlerFollow } from "./commands/handler_follow";
import { handlerFollowing } from "./commands/handler_following";
import { middlewareLoggedIn } from "./middleware";
import { handlerUnfollow } from "./commands/handler_unfollow";
import { handlerBrowse } from "./commands/handler_browse";


async function  main() {
  const registry: CommandsRegistry = {};
  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);
  registerCommand(registry, "reset", handlerReset);
  registerCommand(registry, "users", handlerUsers);
  registerCommand(registry, "agg", handlerAgg);
  registerCommand(registry, "addfeed", middlewareLoggedIn(handlerAddFeed));
  registerCommand(registry, "feeds", handlerFeeds);
  registerCommand(registry, "follow", middlewareLoggedIn(handlerFollow));
  registerCommand(registry, "following", middlewareLoggedIn(handlerFollowing));
  registerCommand(registry, "unfollow", middlewareLoggedIn(handlerUnfollow));
  registerCommand(registry, "browse", middlewareLoggedIn(handlerBrowse));
  const args = argv.slice(2);
  if (args.length === 0) {
    console.error("Not enough arguments");
    process.exit(1);
  };
  const cmdName = args[0];
  const parameters = args.slice(1);
  try {
    await runCommand(registry, cmdName, ...parameters)
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error(message);
    process.exit(1);
  }
  process.exit(0)
}

main();