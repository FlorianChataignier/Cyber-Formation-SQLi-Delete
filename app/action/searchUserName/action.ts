"use server";

import { revalidatePath } from "next/cache";

import { User } from "@/app/models/User";
import { getPgClient } from "@/app/utils/pg";

export async function getUsersByName(
  name: string
): Promise<{ users: User[]; rowCount: number }> {
  revalidatePath("/");

  const pgClient = await getPgClient();

  const { rows } = await pgClient.query<any>(
    `SELECT * FROM users WHERE name='${name}'`
  );

  const totalResult = await pgClient.query<any>("SELECT COUNT(*) FROM users");

  return { users: rows, rowCount: Number(totalResult.rows[0].count) };
}
