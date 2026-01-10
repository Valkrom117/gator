import { setUser } from "./config";
import { createUser, getUserByName } from "./lib/db/queries/user";

export async function handlerRegister(cmdName: string, ...args: string[]) {
    if (args.length === 0) {
        throw new Error("Username not provided");
    };
    const userName = args[0];
    const userData = await getUserByName(userName)
    if (userData) {
        throw new Error("Username already exists");
    }
    const newUser = await createUser(userName);
    setUser(userName);
    console.log(`User ${userName} created:`);
    console.log("Data", newUser);


}