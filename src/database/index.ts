// import { drizzle } from 'drizzle-orm/vercel-postgres'
// import { sql } from '@vercel/postgres'
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

let DB_URL = process.env.DATABASE_URL;
if (DB_URL && !DB_URL.includes("sslmode=require")) {
	DB_URL = `${DB_URL}?sslmode=require`;
}

const client = new Client({
	connectionString: DB_URL,
});

await client.connect();

const db = drizzle(client);

// const db = drizzle(sql)
export default db;
