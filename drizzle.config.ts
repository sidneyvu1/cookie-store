import { defineConfig } from "drizzle-kit"
import * as dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

export default defineConfig({
    dialect: "postgresql",
    schema: "./drizzle/schema.ts",
    out: "./drizzle/migrations",
    schemaFilter: ["public"], 
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
})
