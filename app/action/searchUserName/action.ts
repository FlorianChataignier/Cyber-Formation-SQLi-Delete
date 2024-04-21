"use server";

import { revalidatePath } from "next/cache";

import { User } from "@/app/models/User";
import { getPgClient } from "@/app/utils/pg";

export async function getUsersByName(name: string): Promise<User[]> {
  revalidatePath("/");

  const pgClient = await getPgClient();

  const {rows} = await pgClient.query<any>(
    `SELECT * FROM users WHERE name='${name}'`
  );

  return rows as User[];
}
