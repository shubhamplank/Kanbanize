"use client";

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";
import { useCardModal } from "@/hooks/use-card-modal";
import { cn } from "@/lib/utils";

interface CardItemProps {
  data: Card;
  index: number;
}

export const CardItem = ({
  data,
  index,
}: CardItemProps) => {
  const { isOpen, onOpen } = useCardModal();
  return (
    <Draggable
      draggableId={data.id}
      index={index}
    >
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => onOpen(data.id)}
          className={cn(
            "truncate border-2 font-semibold border-transparent hover:border-black py-2 px-3 text-sm rounded-md shadow-sm",
            `bg-[${data.backgroundColor || "#FFFFFF"}]`
          )}
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};
