import type { FC } from "react";

import { Hint } from "@/components/hint";
import { HelpCircle, User2 } from "lucide-react";
import { FormPopover } from "@/components/form/form-popover";

interface BoardListProps {}

const BoardList: FC<BoardListProps> = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your board
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <FormPopover
          sideOffset={10}
          side="right"
        >
          <div
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
            role="button"
          >
            <p className="text-sm">Create new board</p>{" "}
            <span className="text-sm"> 5 remanaing</span>
            <Hint
              sideOffset={40}
              description="Free Workspace upto 5 board"
            >
              <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

export default BoardList;
