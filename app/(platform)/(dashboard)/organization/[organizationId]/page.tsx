import type { FC } from "react";
import { createBoard } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Info } from "./_components/info";
import { Separator } from "@/components/ui/separator";
import BoardList from "./_components/board-list";

interface OrganizationIdPageProps {}

const OrganizationIdPage: FC<
  OrganizationIdPageProps
> = async () => {
  const boards = await db.board.findMany();
  return (
    <div className="w-full mb-20 space-y-2">
      <Info />
      <Separator />
      <div className="px-2 md:px-4">
        <BoardList />
      </div>
    </div>
  );
};

export default OrganizationIdPage;
