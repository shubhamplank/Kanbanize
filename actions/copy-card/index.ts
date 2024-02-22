"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CopyCard } from "./schema";

const handler = async (
  data: InputType
): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, boardId, listId } = data;

  let card;

  try {
    const list = await db.list.findUnique({
      where: { id: listId, board: { orgId } },
    });

    if (!list) {
      return { error: "list not found" };
    }

    const lastCard = await db.card.findFirst({
      where: { listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;
    card = await db.card.create({
      data: {
        listId,
        title: `${title}-Copy`,
        order: newOrder,
      },
    });
  } catch (error) {
    console.error("create_card", error);
    return {
      error: "Failed to copy card.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const copyCard = createSafeAction(CopyCard, handler);
