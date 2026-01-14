import { User } from "./lib/db/schema";

export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;

type UserCommandHandler = (
  cmdName: string,
  user: User,
  ...args: string[]
) => Promise<void>;

type middlewareLoggedIn = (handler: UserCommandHandler) => CommandHandler;