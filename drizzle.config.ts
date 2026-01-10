import { defineConfig } from "drizzle-kit";
import { readConfig } from "./src/config";

export default defineConfig({
  schema: "src/schema.ts",
  out: "dist/",
  dialect: "postgresql",
  dbCredentials: {
    url: readConfig().dbUrl,
  },
});