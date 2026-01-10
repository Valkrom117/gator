import { truncateUsers } from "./lib/db/queries/user";

export async function handlerReset(cmdName: string) {
    await truncateUsers();

}