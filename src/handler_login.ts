import { setUser } from "./config";
import { getUserByName } from "./lib/db/queries/user";

export async function handlerLogin(cmdName: string, ...args: string[]) {
    if (args.length === 0) {
        throw new Error("Username not provided");
    }
    const userName = args[0];
    const userData = await getUserByName(userName);
    if (!userData) {
        throw new Error("Username does not exist in the database");
    }
    setUser(userName);
    console.log(`User ${userName} has been set`);
}