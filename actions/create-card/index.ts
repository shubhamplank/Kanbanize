"use server";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateCard } from "./schema";
import createAuditLog from "@/lib/create-audit-log";

const handler = async (
  data: InputType
): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    console.log("Unauthorized");
    return { error: "Unauthorized" };
  }

  const { title, boardId, listId, isParent, parentId } =
    data;
  console.log({
    title,
    boardId,
    listId,
    parentId,
  });

  try {
    const list = await db.list.findUnique({
      where: { id: listId, board: { orgId } },
    });

    if (!list) {
      console.log("List not found");
      return { error: "List not found" };
    }

    const lastCard = await db.card.findFirst({
      where: { listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;
    let card;
    if (isParent) {
      card = await db.card.create({
        data: {
          title,
          listId,
          order: newOrder,
          isParent: true,
        },
      });
    } else {
      card = await db.card.create({
        data: {
          title,
          listId,
          order: newOrder,
          parentId: parentId, // Set parentId to undefined if it's an independent card
          isParent: false,
        },
      });
    }

    await createAuditLog({
      entityId: card.id,
      entityTitle: card.title,
      entityType: "CARD",
      action: "CREATE",
    });

    revalidatePath(`/board/${boardId}`);

    return { data: card };
  } catch (error) {
    console.error("create_board", error);
    return { error: "Failed to create." };
  }
};

export const createCard = createSafeAction(
  CreateCard,
  handler
);
