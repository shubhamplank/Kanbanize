import { auth, currentUser } from "@clerk/nextjs";
import { db } from "./db";

interface createAuditLogProps {
  entityId: string;
  entityType: "BOARD" | "LIST" | "CARD";
  entityTitle: string;
  action: "CREATE" | "UPDATE" | "DELETE";
}

const createAuditLog = async ({
  entityId,
  entityType,
  entityTitle,
  action,
}: createAuditLogProps) => {
  try {
    const { orgId } = auth();
    const user = await currentUser();

    if (!user || !orgId) {
      throw new Error("user not found");
    }

    await db.auditLog.create({
      data: {
        orgId,
        entityId,
        entityType,
        entityTitle,
        action,
        userId: user?.id,
        userImage: user?.imageUrl,
        userName: user?.firstName + " " + user?.lastName,
      },
    });
  } catch (err) {
    console.error("[AUDIT_LOG_ERROR", err);
  }
};

export default createAuditLog;
