import { CommandHandler } from "./commands/commands"

export type CommandsRegistry = Record<string, CommandHandler>;

export async function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
    registry[cmdName] = handler
}

export async function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
    const cmd = registry[cmdName]
    if (cmd) {
        await cmd(cmdName, ...args);
        return;
    }
    throw new Error("Unknown command!")
}