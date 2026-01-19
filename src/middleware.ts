import { CommandHandler, UserCommandHandler } from "./commands/commands";
import { readConfig } from "./config";
import { getUserByName } from "./lib/db/queries/users";



export function middlewareLoggedIn(handler: UserCommandHandler): CommandHandler {
    return async (cmdName, ...args) => {
        const currentUser = readConfig().currentUserName;
        if (!currentUser) {
            throw new Error("User not logged in");
        };
        const user = await getUserByName(currentUser);
        if (!user) {
            throw new Error(`User ${currentUser} not found`);
        }
        await handler(cmdName, user, ...args)
    };
}