import dotenv from "dotenv";
dotenv.config();

//server
export const SERVER_HOST = process.env.SERVER_HOST ?? "localhost";
export const SERVER_PORT = process.env.SERVER_PORT ?? 3000;
export const SERVER_PREFIX = process.env.SERVER_PREFIX ?? "api/v1";

export const DATABASE_HOST = process.env.DATABASE_HOST ?? "localhost";
export const DATABASE_PORT = Number(process.env.DATABASE_PORT) ?? 3305;
export const DATABASE_USER = process.env.DATABASE_USER ?? "root";
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD ?? "password";
export const DATABASE_SCHEMAS = process.env.DATABASE_SCHEMAS ?? "result";
