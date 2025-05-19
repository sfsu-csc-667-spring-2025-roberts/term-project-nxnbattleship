/**
 * src/server/connection.ts
 *
 * pg-promise stuff that uses the .env
 */

import pgPromise from "pg-promise";

const pgp = pgPromise();

const db = pgp(process.env.DATABASE_URL!);

export default db;