import { readConfig } from "./config";
import { getUsers } from "./lib/db/queries/user";

export async function handlerUsers(cmdName: string) {
    try {
        const users = await getUsers();
        const currentUser = readConfig().currentUserName;
        for (let user of users) {
            if (user.name === currentUser) {
                console.log(`${user.name} (current)`)
            }
            console.log(`${user.name}`)
        }
    } catch (err) {
        console.error("Error while retrieving user list");
        process.exit(1);
    }

}