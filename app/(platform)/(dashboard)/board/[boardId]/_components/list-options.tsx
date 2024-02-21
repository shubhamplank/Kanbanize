import { useRef, type FC, ElementRef } from "react";

import { toast } from "sonner";
import { MoreHorizontal, X } from "lucide-react";

import { List } from "@prisma/client";
import { useAction } from "@/hooks/use-action";
import { deleteList } from "@/actions/delete-list";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormSubmit } from "@/components/form/form-submit";
import { copyList } from "@/actions/copy-list";

interface ListOptionsProps {
  onAddCard: () => void;
  data: List;
}

const ListOptions: FC<ListOptionsProps> = ({
  onAddCard,
  data,
}) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`${data.title} deleted`);
      closeRef.current?.click();
    },
    onError: (err) => {
      toast.error(err);
    },
  });
  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`${data.title} copied`);
      closeRef.current?.click();
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeCopy({ id, boardId });
  };

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeDelete({ id, boardId });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="h-auto w-auto p-2"
          variant={"ghost"}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="px-0 pt-3 pb-3"
        side="bottom"
        align="start"
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          action
        </div>
        <PopoverClose
          ref={closeRef}
          asChild
        >
          <Button
            className="h-auto w-auto p-2 absolute right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant={"ghost"}
        >
          Add Card...
        </Button>
        <form action={onCopy}>
          <input
            hidden
            name="id"
            id="id"
            value={data.id}
          />
          <input
            hidden
            name="boardId"
            id="boardId"
            value={data.boardId}
          />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Copy list...
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input
            hidden
            name="id"
            id="id"
            value={data.id}
          />
          <input
            hidden
            name="boardId"
            id="boardId"
            value={data.boardId}
          />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Delete this list...
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
