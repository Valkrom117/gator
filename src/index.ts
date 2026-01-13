import { argv } from "node:process";
import { CommandsRegistry, registerCommand, runCommand } from "./command_registry";
import { handlerLogin } from "./handler_login";
import { handlerRegister } from "./handler_register";
import { handlerReset } from "./handler_reset";
import { handlerUsers } from "./handler_users";
import { handlerAgg } from "./handler_agg";
import { handlerAddFeed } from "./handler_addFeed";
import { handlerFeeds } from "./handler_feeds";


async function  main() {
  const registry: CommandsRegistry = {};
  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);
  registerCommand(registry, "reset", handlerReset);
  registerCommand(registry, "users", handlerUsers);
  registerCommand(registry, "agg", handlerAgg);
  registerCommand(registry, "addfeed", handlerAddFeed);
  registerCommand(registry, "feeds", handlerFeeds);
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