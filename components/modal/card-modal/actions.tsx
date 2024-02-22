"use client";
import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Copy, Trash } from "lucide-react";
import { useAction } from "@/hooks/use-action";
import { deleteCard } from "@/actions/delete-card";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useCardModal } from "@/hooks/use-card-modal";
import { copyCard } from "@/actions/copy-card";

interface ActionsProps {
  id: string;
  listId: string;
  title: string;
}

export const Actions: FC<ActionsProps> = ({
  id,
  listId,
  title,
}) => {
  const params = useParams();
  const { onClose } = useCardModal();

  const { execute: executeCopy, isLoading: isLoadingCopy } =
    useAction(copyCard, {
      onSuccess: () => {
        onClose();
        toast.success("card copied");
      },
      onError: (err) => toast.error(err),
    });

  const { execute, isLoading } = useAction(deleteCard, {
    onSuccess: () => {
      onClose();
      toast.success("card deleted");
    },
    onError: (err) => toast.error(err),
  });

  const onCopy = () => {
    const boardId = params.boardId as string;
    executeCopy({ title, listId, boardId });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;
    execute({ id, boardId });
  };
  return (
    <div className="space-y-2">
      <p className="text-semibold text-neutral-700 mb-2">
        Actions
      </p>
      <Button
        variant={"secondary"}
        className="bg-neutral-200 flex gap-x-2 w-full"
        size="sm"
        onClick={onCopy}
        disabled={isLoadingCopy}
      >
        <Copy size={20} />
        Copy
      </Button>
      <Button
        variant={"secondary"}
        className="bg-neutral-200 flex gap-x-2 w-full"
        size="sm"
        onClick={onDelete}
        disabled={isLoading}
      >
        <Trash size={20} />
        Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeletion() {
  return (
    <div className="gap-x-3 w-full">
      <Skeleton className="bg-neutral-200 w-full h-6 mb-2" />
      <Skeleton className="bg-neutral-200 w-full h-6 " />
    </div>
  );
};
