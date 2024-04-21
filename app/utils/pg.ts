import { Client } from "pg";

/* The following is for demo purpose. Of course NEVER write the credentials in the code. */

export const getPgClient = async () => {
  const client = new Client({
    host: "postgres",
    user: "aUser",
    password: "aSecret",
    // database: "pentestme",
  });

  await client.connect();

  return client;
};
