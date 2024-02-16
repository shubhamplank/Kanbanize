import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { startCase } from "lodash";
import { notFound, redirect } from "next/navigation";
import type { FC } from "react";

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const { orgId } = auth();

  if (!orgId) {
    return {
      title: "Board",
    };
  }

  const board = await db.board.findUnique({
    where: { id: params.boardId, orgId },
  });

  return {
    title: board?.title || "Board",
  };
}

interface BoardIdLayoutProps {
  children: React.ReactNode;
  params: { boardId: string };
}

const BoardIdLayout: FC<BoardIdLayoutProps> = async ({
  children,
  params,
}) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const board = await db.board.findUnique({
    where: { id: params.boardId, orgId },
  });

  if (!board) {
    notFound();
  }

  return (
    <div
      className="relative h-full bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `url(${board.imageFullUrl})`,
      }}
    >
      <div className="relative pt-28 h-full">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default BoardIdLayout;
