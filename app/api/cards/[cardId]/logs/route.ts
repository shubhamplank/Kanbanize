import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const auditLogs = await db.auditLog.findMany({
      where: {
        orgId,
        entityId: params.cardId,
        entityType: "CARD",
      },
      orderBy: { createdAt: "desc" },
      take: 4,
    });
    return NextResponse.json(auditLogs);
  } catch (err) {
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
