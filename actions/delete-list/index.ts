"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { DeleteList } from "./schema";
import createAuditLog from "@/lib/create-audit-log";

const handler = async (
  data: InputType
): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;

  let list;

  try {
    list = await db.list.delete({
      where: { id, boardId, board: { orgId } },
    });
    await createAuditLog({
      entityId: list.id,
      entityTitle: list.title,
      entityType: "LIST",
      action: "DELETE",
    });
  } catch (error) {
    console.error("delete_list", error);
    return {
      error: "Failed to delete.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const deleteList = createSafeAction(
  DeleteList,
  handler
);
