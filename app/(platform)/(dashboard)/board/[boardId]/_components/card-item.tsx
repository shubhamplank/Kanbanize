"use client";

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";
import { useCardModal } from "@/hooks/use-card-modal";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface CardItemProps {
  data: Card;
  index: number;
  onAddCard: (id: string) => void;
}

export const CardItem = ({
  data,
  index,
  onAddCard,
}: CardItemProps) => {
  const { isOpen, onOpen } = useCardModal();
  return (
    <Draggable
      draggableId={data.id}
      index={index}
    >
      {(provided) => (
        <div className="group flex justify-between items-center">
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            role="button"
            onClick={() => onOpen(data.id)}
            className={cn(
              "truncate border-2 font-semibold border-transparent hover:border-black py-2 px-3 text-sm rounded-md shadow-sm w-full",
              `bg-[${data.backgroundColor || "#FFFFFF"}]`,
              !data.isParent && "w-4/5 ml-auto"
            )}
          >
            {data.title}
          </div>
          {data.isParent && (
            <Plus
              role="button"
              size={20}
              className="opacity-0 group-hover:opacity-100"
              onClick={() => onAddCard(data.id)}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};
