import fs from "fs";
import os from "os";
import path from "path";


export type Config = {
    dbUrl: string,
    currentUserName?: string,
}

export function setUser(username: string): void {
    const configData = readConfig();
    configData.currentUserName = username;
    writeConfig(configData)
}

export function readConfig(): Config {
    const filePath = getConfigFilePath();
    const fileContent = fs.readFileSync(filePath,{encoding: "utf-8"});
    const configObject = JSON.parse(fileContent);
    const validConfigObject = validateConfig(configObject);
    return validConfigObject;
}

function getConfigFilePath(): string {
    const filePath = path.join(os.homedir(), ".gatorconfig.json");
    return filePath;
}

function writeConfig(cfg: Config): void {
    const snakeCaseObject = {
        db_url: cfg.dbUrl,
        current_user_name: cfg.currentUserName ?? undefined
    };
    const configContent = JSON.stringify(snakeCaseObject)
    const filePath = getConfigFilePath()
    fs.writeFileSync(filePath, configContent, {encoding: "utf-8"});
}

function validateConfig(rawConfig: any): Config {
    if ("db_url" in rawConfig) {
        const configObject: Config = {
            dbUrl: rawConfig.db_url, 
            currentUserName: rawConfig.current_user_name ?? undefined
        };
        return configObject;
    }
    throw new Error("Invalid config file.")
}