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

interface ActionsProps {
  id: string;
  onClose: () => void;
}

export const Actions: FC<ActionsProps> = ({ id }) => {
  const params = useParams();
  const { onClose } = useCardModal();

  const { execute, isLoading } = useAction(deleteCard, {
    onSuccess: () => {
      onClose();
      toast.success("card deleted");
    },
    onError: (err) => toast.error(err),
  });

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
