/**
 * src/server/connection.ts
 *
 * pg-promise stuff that uses the .env
 */

import pgp from "pg-promise";

const connection = pgp()(process.env.DATABASE_URL!);

export default connection;
