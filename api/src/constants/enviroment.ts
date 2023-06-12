import dotenv from "dotenv";
dotenv.config();

//server
export const SERVER_HOST = process.env.SERVER_HOST ?? "localhost";
export const SERVER_PORT = process.env.SERVER_PORT ?? 3000;
export const SERVER_PREFIX = process.env.SERVER_PREFIX ?? "api/v1";
