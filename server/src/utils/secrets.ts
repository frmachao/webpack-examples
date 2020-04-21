
import dotenv from "dotenv";
import fs from "fs";
console.log('process.env.SESSION_SECRET',process.env.SESSION_SECRET)
if (fs.existsSync(".env")) {
    // 为 node.js 项目从. env 中加载环境变量
    dotenv.config({ path: ".env" });
} else {
    console.error("no .env");
}
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'

export const SESSION_SECRET = process.env.SESSION_SECRET as string;
export const MONGODB_URI = prod ? process.env["MONGODB_URI"] as string : process.env["MONGODB_URI_LOCAL"] as string;

if (!SESSION_SECRET) {
    console.error("No client secret. Set SESSION_SECRET environment variable.");
    process.exit(1);
}

if (!MONGODB_URI) {
    if (prod) {
        console.error("No mongo connection string. Set MONGODB_URI environment variable.");
    } else {
        console.error("No mongo connection string. Set MONGODB_URI_LOCAL environment variable.");
    }
    process.exit(1);
}
